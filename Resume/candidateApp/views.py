from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pdfplumber
from io import BytesIO
import google.generativeai as genai
import fitz
import json
from .models import candidate
import re
from jobApp.models import Job
import logging

# Set up logging
logger = logging.getLogger(__name__)

genai.configure(api_key="AIzaSyCm-MLtX9Z7JdSpuMUvekYGET4989hw7ek")
linkedin_pattern = r"(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?"
github_pattern = r"(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9-]+(?:\/[a-zA-Z0-9-_\.]+)?\/?"
github_profile_pattern = r"(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)\/?[a-zA-Z0-9-_\.]*\/?"
email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

@api_view(['POST'])
def upload(request, *args, **kwargs):
    try:
        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            return Response({'error': 'No file uploaded'}, status=400)
        
        # Extract text from PDF
        pdf_data = uploaded_file.read()
        
        try:
            with pdfplumber.open(BytesIO(pdf_data)) as pdf:
                extracted_text = '\n'.join(page.extract_text() for page in pdf.pages)
                logger.info(f"Extracted text length: {len(extracted_text)}")

        except Exception as e:
            logger.error(f"PDF text extraction failed: {str(e)}")
            return Response({'error': f'PDF text extraction failed: {str(e)}'}, status=500)
        try:
            doc = fitz.open(stream=pdf_data, filetype="pdf")
            lin = {}
            for page in doc:
                for link in page.get_links():
                    uri = link.get("uri")
                    if uri:
                        if re.findall(linkedin_pattern, uri):
                            lin['linkedin'] = uri
                        elif re.findall(github_pattern, uri):
                            match = re.match(github_profile_pattern, uri)
                            if match:
                                username = match.group(1)
                                lin['github'] = f"https://github.com/{username}/"
                            else:
                                lin['github'] = uri
                        elif re.findall(email_pattern, uri):
                            lin['email'] = uri
            logger.info(f"Extracted links: {lin}")
        except Exception as e:
            logger.error(f"PDF link extraction failed: {str(e)}")
            return Response({'error': f'PDF link extraction failed: {str(e)}'}, status=500)
        
        try:
            model = genai.GenerativeModel("gemini-pro")
            prompt = """Extract the candidate information from the following resume text. For each field, provide the most likely value based on the text:

            1. **full_name**: Candidate's full name.
            2. **email**: Candidate's email address.
            3. **linkedin**: URL to the candidate's LinkedIn profile.
            4. **github**: URL to the candidate's GitHub profile (if available).
            5. **resume**: Indicate that the resume text has been provided (the file field will be handled separately).
            6. **location**: Candidate's current location.
            7. **education**: A list of education entries. Each entry should include the institution name, degree, field of study, and graduation year if available.
            8. **skills**: A list of technical skills.
            9. **soft_skills_required**: A list of soft skills mentioned.
            10. **experience**: A summary of work experience (including company names, job titles, and duration if mentioned).

            Resume Text:
            """ + extracted_text + """
            Generate the output in valid JSON format with the following keys: full_name, email, linkedin, github, location, education, skills, soft_skills_required, experience."""

            ans = model.generate_content(prompt)
            response_text = ans.text.strip()
            logger.info(f"AI response length: {len(response_text)}")
            
            if "```" in response_text:
                response_text = response_text.split("```")[1]
                if response_text.startswith("json"):
                    response_text = response_text[4:].strip()
            
            parsed_data = json.loads(response_text)
            
        except Exception as e:
            logger.error(f"AI processing failed: {str(e)}")
            return Response({
                'error': 'AI processing failed',
                'details': str(e),
                'raw_response': response_text if 'response_text' in locals() else None
            }, status=500)

        parsed_data.update({
            'email': lin.get('email', parsed_data.get('email')),
            'linkedin': lin.get('linkedin', parsed_data.get('linkedin')),
            'github': lin.get('github', parsed_data.get('github')),
        })

        return Response({
            'success': True,
            'data': parsed_data
        }, status=200)

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({
            'error': str(e),
            'type': type(e).__name__
        }, status=500)
    

