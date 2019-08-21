from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import AdminSite


class MyAdminSite(AdminSite):
    site_header = 'My RESTful API Server for Blog application'
    site_title = 'Blog RESTful API Server'

admin_site = MyAdminSite(name='myadmin')
admin.site.register(User, UserAdmin)

