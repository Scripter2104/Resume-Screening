"""
URL configuration for Resume project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path
from jobApp.views import signup, jobDescView, display_top_candidate, candidate_info,login,post_job,extract_jobs,chatbot
from candidateApp.views import upload

from . import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/',login),
    path('api/signup/',signup),
    path('api/post-job/',post_job),
    path('api/upload/',upload),
    path('api/extract/',extract_jobs),
    path('api/chatbot/',chatbot)

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)



