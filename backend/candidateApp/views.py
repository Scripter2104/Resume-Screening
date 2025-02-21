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

genai.configure(api_key="AIzaSyCm-MLtX9Z7JdSpuMUvekYGET4989hw7ek")
linkedin_pattern = r"(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?"
github_pattern = r"(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9-]+(?:\/[a-zA-Z0-9-_\.]+)?\/?"
github_profile_pattern = r"(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)\/?[a-zA-Z0-9-_\.]*\/?"
email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

# Create your views here.
@api_view(['POST'])
def upload(request,*args,**kwargs):
    uploaded_file = request.FILES.get["file"]

    if not uploaded_file:
        return Response('No file uploaded',status=400)
    
    if uploaded_file:
        pdf_data = uploaded_file.read()
        with pdfplumber.open(BytesIO(pdf_data)) as pdf:
            extracted_text = ''
            for page in pdf.pages:
                extracted_text += page.extract_text()+"\n"

    doc = fitz.open(stream=pdf_data, filetype="pdf")
    links = []
    lin={}
    for page in doc:
        for link in page.get_links():
            uri = link.get("uri")
            if uri:
                if re.findall(linkedin_pattern,uri):
                    lin['linkedin']=uri
                elif re.findall(github_pattern,uri):
                    match = re.match(github_profile_pattern, uri)
                    if match:
                        username = match.group(1)
                        links['github'] = f"https://github.com/{username}/"
                    else:
                        links['github'] = uri  
                elif re.findall(email_pattern,uri):
                    lin['email']=uri
    
    model = genai.GenerativeModel("gemini-pro")
    ans=model.generate_content("""Extract the candidate information from the following resume text. For each field, provide the most likely value based on the text:

        1. **full_name**: Candidate’s full name.
        2. **email**: Candidate’s email address.
        3. **linkedin**: URL to the candidate's LinkedIn profile.
        4. **github**: URL to the candidate's GitHub profile (if available).
        5. **resume**: Indicate that the resume text has been provided (the file field will be handled separately).
        6. **location**: Candidate’s current location.
        7. **education**: A list of education entries. Each entry should include the institution name, degree, field of study, and graduation year if available.
        8. **skills**: A list of technical skills.
        9. **soft_skills_required**: A list of soft skills mentioned.
        10. **experience**: A summary of work experience (including company names, job titles, and duration if mentioned).

        Resume Text:
        """
        +
        extracted_text
        +
        """
        Generate the output in dict format with the following keys: full_name, email, linkedin, github, location, education, skills, soft_skills_required, experience.""")

    new_ans=ans.text.strip("```")
    new_ans=new_ans.replace("'",'"')
    
    candidate(full_name=json.loads(new_ans)["full_name"],
                job=Job.objects.get(id=request.data["job_id"]),
                email=lin["email"],
                linkedin=lin["linkedin"],
                github = lin["github"],
                resume=uploaded_file,location=json.loads(uploaded_file)["location"],
                education=json.loads(new_ans)["education"],skills=json.loads(new_ans)["skills"],
                soft_skills_required=json.loads(new_ans)["soft_skills_required"],
                experience=json.loads(new_ans)["experience"]
                ).save()
    
    

    return Response(json.loads(new_ans),status=200)
