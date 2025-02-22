from django.shortcuts import render
from jobApp.models import Job
from candidateApp.models import S_candidate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Login
import google.generativeai as genai


genai.configure(api_key="AIzaSyC5WgFTnMKSFwL47izyc6Bbm9605x1pR2Y")

@api_view(['POST'])
def signup(request, *args, **kwargs):
    data = request.data
    l1 = Login.objects.create(user_name=data.get('email'), password=data.get('password'))
    return Response({"message": "User created successfully", "user": l1.id}, status=status.HTTP_200_OK)


@api_view(['POST'])
def login(request, *args, **kwargs):
    data = request.data
    try:
        l1 = Login.objects.get(user_name=data.get('email'))
        if l1.password == data.get('password'):
            return Response(
                {
                    "message": "Login success",
                    "user": l1.id
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response({"message": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
    except Login.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def jobDescView(request,*args, **kwargs):
    data = json.loads(request.data)
    job_title = data['job_title']
    job_desc = data['job_desc']
    skills_required = data['skills_required']
    soft_skills = data['soft_skills']  
    education = data['education'] 
    experience = data['experience']
    Job.objects.create(job_title=job_title, job_desc=job_desc, skills_required=skills_required, soft_skills=soft_skills, education=education, experience=experience)

    return render(request, '', {})

@api_view(['GET'])
def display_top_candidate(request,*args, **kwargs):
    job_title= request.GET.get('job_title')

    candidates = S_candidate.objects.filter(job_title=job_title)
    candidates_name = [{s.id:s.full_name} for s in candidates]
    return render(request, '', {'candidates':candidates_name})


@api_view(['GET'])
def candidate_info(request,*args, **kwargs):
    candidate_id= request.GET.get('candidate_id')
    candidate = S_candidate.objects.get(id=candidate_id)
    return render(request, '', {'candidate':candidate})


@api_view(['POST'])
def post_job(request):
    print("Hello")
    if request.method == "POST":
        try:
            data = request.data
            print(data.get('userId'))
            job_title = data.get("jobTitle", "")
            job_description = data.get("jobDescription", "")
            skills = data.get("skills", {})
            weights = data.get("weights", {})
            education_weights = data.get("educationWeights", {})
            work_history_weights = data.get("workHistoryWeights", {})
            
            skill_required = [
                {"name": skill["name"], "weight": skill["weight"]}
                for skill in skills.get("technical", [])
            ]
            soft_skills_required = [
                {"name": skill["name"], "weight": skill["weight"]}
                for skill in skills.get("soft", [])
            ]
            education = [
                {"type": "GPA", "weight": education_weights.get("gpa", 0)},
                {"type": "University Rank", "weight": education_weights.get("universityRank", 0)},
            ]
            experience = [
                {"type": "Job Roles", "weight": work_history_weights.get("jobRoles", 0)},
                {"type": "Projects", "weight": work_history_weights.get("projects", 0)},
            ]
            
            job = Job.objects.create(
                job_title=job_title,
                user=Login.objects.get(id=request.data.get('userId')),
                job_description=job_description,
                skill_required=skill_required,
                soft_skills_required=soft_skills_required,
                education=education,
                experience=json.dumps(experience)
            )
            print(job.id)
            return Response({"message": "Job posted successfully", "job_id": job.id}, status=200)

        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"}, status=400)

    return Response({"error": "Invalid request method"}, status=405)

def extract_jobs(request):
    jobs=Job.objects.all()
    data=[]
    print(jobs+"hello")
    # for job in jobs : 
    #     data.append({"id":job.id,"tilte":job.job_title,"company":job.company})
    # print(data)
    return Response({"data":data},status=200)


def chatbot(request,*args,**kwargs):
    model = genai.GenerativeModel("gemini-pro")
    responce = model.generate_content(request.message)
    return Response({"answer":responce},status=200)

    
