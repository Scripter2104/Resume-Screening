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
from .models import Login

@api_view(['POST'])
def signup(request, *args, **kwargs):
    data = request.data
    l1 = Login.objects.create(user_name=data.get('email'), password=data.get('password'))
    return Response({"message": "User created successfully", "user_id": l1.id}, status=status.HTTP_200_OK)


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


    
    
