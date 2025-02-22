from django.db import models
from jobApp.models import Job
from django.contrib.postgres.fields import JSONField

class S_candidate(models.Model):
    full_name = models.TextField(max_length=30, null=True, blank=True)
    email_sent = models.BooleanField(default=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True)
    email = models.TextField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    github = models.URLField(null=True, blank=True)
    resume = models.FileField(upload_to='resume', null=True, blank=True)
    location = models.TextField(max_length=50, null=True, blank=True)
    education = models.JSONField(default=list, blank=True)  
    skills = models.JSONField(default=list, blank=True)
    soft_skills_required = models.JSONField(default=list, blank=True)
    experience = models.TextField(max_length=1000, null=True, blank=True)

class candidate(models.Model):
    full_name = models.TextField(max_length=30, null=True, blank=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True, blank=True)
    email = models.TextField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    github = models.URLField(null=True, blank=True)
    resume = models.FileField(upload_to='resume/', null=True, blank=True)
    location = models.TextField(max_length=50, null=True, blank=True)
    education = models.JSONField(default=list, blank=True)  
    skills = models.JSONField(default=list, blank=True)
    soft_skills_required = models.JSONField(default=list, blank=True)
    experience = models.TextField(max_length=1000, null=True, blank=True)
