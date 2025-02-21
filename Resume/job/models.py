from django.db import models

class Job(models.Model):
    job_title = models.TextField(max_length=20, null=True, blank=True)
    job_description = models.TextField(null=True, blank=True)
    skill_required = models.JSONField(default=list, blank=True)  
    soft_skills_required = models.JSONField(default=list, blank=True)  
    education = models.JSONField(default=list, blank=True)  
    experience = models.TextField(max_length=1000, null=True, blank=True)
