from django.shortcuts import render
from django.http import HttpResponse
from job.models import Job
from candidate.models import S_candidate
# Create your views here.

def homeView(request,*args,**kwargs):
        
    job_dict = {
    "job_title": "Software Engineer",
    "job_description": "Develop and maintain software applications.",
    "skill_required": ["Python", "Django", "REST API"],
    "soft_skills_required": ["Communication", "Problem-solving", "Teamwork"],
    "education": ["Bachelor's in Computer Science", "Master's in Information Technology"],
    "experience": "2+ years of experience in software development"
    }
    j1=Job(**job_dict)
    j1.save()

    s_candidate_dict = {
    "full_name": "John Doe",
    "email_sent": False,
    "job": None,
    "email": "johndoe@example.com",
    "linkedin": "https://www.linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "resume": "resume/johndoe.pdf",
    "location": "New York, USA",
    "education": ["Bachelor's in Computer Science", "Master's in AI"],
    "skills": ["Python", "Django", "Machine Learning"],
    "soft_skills_required": ["Communication", "Adaptability", "Problem-solving"],
    "experience": "3+ years of experience in software development"
    }

    s1=S_candidate(**s_candidate_dict)

    s1.save()



    return HttpResponse("<h1>Hello</h1>")