from django.db import models
import jwt

from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.db import models
from blog.app.helpers.models import TimestampedModel
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,username,email,password=None):
        if username is None:
            raise TypeError("Username is required")
        if email is None:
            raise TypeError('User must have an email address')

        user=self.model(username=username,email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,username,email,password):
        if password is None:
            raise TypeError('super user must have a password')
        
        user=self.create_user(username,email,password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):
    username=models.CharField(db_index=True,max_length=255,unique=True)
    email=models.EmailField(db_index=True,unique=True)
    first_name=models.CharField(max_length=50,default='user')
    last_name=models.CharField(max_length=50,default='name')
    mobile=models.CharField(max_length=10)
    nickname=models.CharField(max_length=50)
    date_joined=models.DateField()
    date_of_birth=models.DateField('date_of_birth',blank=True,null=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    objects =UserManager()

    def __str__(self):
        return self.email
    
    @property
    def token(self):
        return self._generate_jwt_token()
    
    def get_full_name(self):
        return self.username
    
    def get_short_name(self):
        return self.username
    
    def _generate_jwt_token(self):
        date=datetime.now()+timedelta(days=60)
        token=jwt.encode({
            'id': self.pk,
            'exp': int(date.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')
