from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Profile


class ProfileSerializer(ModelSerializer):
    username=serializers.CharField(source='user.username')
    status=serializers.CharField(allow_blank=True,required=False)
    dp=serializers.SerializerMethodField()

    class Meta:
        model=Profile
        fields=('username','status','dp',)
        read_only_fields=('username',)

    def get_image(self,obj):
        if obj.dp:
            return obj.image
        
        return 'https://picsum.photos/200'