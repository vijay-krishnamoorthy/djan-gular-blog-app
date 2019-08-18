from django.conf.urls import url
from django.urls import path
from .views import ProfileRetrieveAPIView
app_name='profiles'

urlpatterns = [
    path('profile/',ProfileRetrieveAPIView.as_view()),
]