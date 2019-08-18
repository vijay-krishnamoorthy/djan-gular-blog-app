from django.conf.urls import include, url
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet,
    PostsLikedAPIView,
    PostsFeedAPIView,
    CommentsListCreateAPIView,
    CommentsDestroyAPIView,
    TagListAPIView
)
app_name='posts'
router = DefaultRouter(trailing_slash=False)
router.register('posts',PostViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),

    url(r'^posts/feed/?$', PostsFeedAPIView.as_view()),

    url(r'^posts/(?P<post_slug>[-\w]+)/like/?$',
        PostsLikedAPIView.as_view()),

    url(r'^posts/(?P<post_slug>[-\w]+)/comments/?$', 
        CommentsListCreateAPIView.as_view()),

    url(r'^posts/(?P<post_slug>[-\w]+)/comments/(?P<comment_pk>[\d]+)/?$',
        CommentsDestroyAPIView.as_view()),

    url(r'^tags/?$', TagListAPIView.as_view()),
]