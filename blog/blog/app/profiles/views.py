from django.shortcuts import render

# Create your views here.
from rest_framework import serializers,status
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer

class ProfileRetrieveAPIView(RetrieveAPIView):
    queryset=Profile.objects.select_related('user')
    renderer_classes = (ProfileJSONRenderer,)
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny,)

    def retrieve(self,request,username,*args,**kwargs):
        try:
            profile=self.queryset.get(user__username=username)
        except Profile.DoesNotExist:
            raise NotFound('Profile with this username is not found')
        
        serializer = self.serializer_class(profile,context={
            'request': request
        })
        return Response(serializer.data,status=status.HTTP_200_OK)