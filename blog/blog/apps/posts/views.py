from rest_framework import generics, mixins, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Post, Comment, Tag
from .renderers import PostJSONRenderer, CommentJSONRenderer
from .serializers import PostSerializer, CommentSerializer, TagSerializer


class PostViewSet(mixins.CreateModelMixin, 
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):

    lookup_field = 'slug'
    queryset = Post.objects.select_related('author', 'author__user')
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (PostJSONRenderer,)
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = self.queryset

        author = self.request.query_params.get('author', None)
        if author is not None:
            queryset = queryset.filter(author__user__username=author)

        tag = self.request.query_params.get('tag', None)
        if tag is not None:
            queryset = queryset.filter(tags__tag=tag)

        favorited_by = self.request.query_params.get('favorited', None)
        if favorited_by is not None:
            queryset = queryset.filter(
                favorited_by__user__username=favorited_by
            )

        return queryset

    def create(self, request):
        serializer_context = {
            'author': request.user.profile,
            'request': request
        }
        serializer_data = request.data.get('post', {})

        serializer = self.serializer_class(
        data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        serializer_context = {'request': request}
        page = self.paginate_queryset(self.get_queryset())

        serializer = self.serializer_class(
            page,
            context=serializer_context,
            many=True
        )

        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, slug):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Post.DoesNotExist:
            raise NotFound('Post with this slug does not exist.')

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


    def update(self, request, slug):
        serializer_context = {'request': request}

        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Post.DoesNotExist:
            raise NotFound('Post with this slug does not exist.')
            
        serializer_data = request.data.get('post', {})

        serializer = self.serializer_class(
            serializer_instance, 
            context=serializer_context,
            data=serializer_data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentsListCreateAPIView(generics.ListCreateAPIView):
    lookup_field = 'post__slug'
    lookup_url_kwarg = 'post_slug'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.select_related(
        'post', 'post__author', 'post__author__user',
        'author', 'author__user'
    )
    renderer_classes = (CommentJSONRenderer,)
    serializer_class = CommentSerializer

    def filter_queryset(self, queryset):
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}

        return queryset.filter(**filters)

    def create(self, request, post_slug=None):
        data = request.data.get('comment', {})
        context = {'author': request.user.profile}

        try:
            context['post'] = Post.objects.get(slug=post_slug)
        except Post.DoesNotExist:
            raise NotFound('Post with this slug does not exist.')

        serializer = self.serializer_class(data=data, context=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentsDestroyAPIView(generics.DestroyAPIView):
    lookup_url_kwarg = 'comment_pk'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()

    def destroy(self, request, post_slug=None, comment_pk=None):
        try:
            comment = Comment.objects.get(pk=comment_pk)
        except Comment.DoesNotExist:
            raise NotFound('A comment with this ID does not exist.')

        comment.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)


class PostsFavoriteAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (PostJSONRenderer,)
    serializer_class = PostSerializer

    def delete(self, request, post_slug=None):
        profile = self.request.user.profile
        serializer_context = {'request': request}

        try:
            post = Post.objects.get(slug=post_slug)
        except Post.DoesNotExist:
            raise NotFound('Post with this slug was not found.')

        profile.unfavorite(post)

        serializer = self.serializer_class(post, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, post_slug=None):
        profile = self.request.user.profile
        serializer_context = {'request': request}

        try:
            post = Post.objects.get(slug=post_slug)
        except Post.DoesNotExist:
            raise NotFound('Post with this slug was not found.')

        profile.favorite(post)

        serializer = self.serializer_class(post, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TagListAPIView(generics.ListAPIView):
    queryset = Tag.objects.all()
    pagination_class = None
    permission_classes = (AllowAny,)
    serializer_class = TagSerializer

    def list(self, request):
        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response({
            'tags': serializer.data
        }, status=status.HTTP_200_OK)


class PostsFeedAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    renderer_classes = (PostJSONRenderer,)
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(
            author__in=self.request.user.profile.follows.all()
        )

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        serializer_context = {'request': request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )

        return self.get_paginated_response(serializer.data)
