from django.db.models.signals import post_save
from django.dispath import receiver

from blog.app.profiles.models import Profile
from .models import User

@receiver(post_save, sender=User)
def create_related_profile(sender,insance,created,*args,**kwargs):
    if instance and created:
        instance.profile=Profile.objects.create(user=instance)