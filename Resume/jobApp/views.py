from django.shortcuts import render
from django.http import HttpResponse
from job.models import Job
from candidate.models import S_candidate
from rest_framework.decorators import api_view
import json

GEMINI_API_KEY="AIzaSyDw8-6adGxA6ZWS51sszyPefbhEOA24LoY"
llm = Gemini(api_key = GEMINI_API_KEY)

def homeView(request,*args,**kwargs):
        

    return HttpResponse("<h1>Hello</h1>")

@api_view['POST']
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

@api_view['GET']
def display_top_candidate(request,*args, **kwargs):
    job_title= request.GET.get('job_title')

    candidates = S_candidate.objects.filter(job_title=job_title)
    candidates_name = [{s.id:s.full_name} for s in candidates]
    return render(request, '', {'candidates':candidates_name})


@api_view['GET']
def candidate_info(request,*args, **kwargs):
    candidate_id= request.GET.get('candidate_id')
    candidate = S_candidate.objects.get(id=candidate_id)
    return render(request, '', {'candidate':candidate})
     

    
    
