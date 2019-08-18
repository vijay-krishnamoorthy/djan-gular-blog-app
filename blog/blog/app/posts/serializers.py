from rest_framework import serializers
from blog.app.profiles.serializers import ProfileSerializer
from .models import Post,Comment,Tag
from .relations import TagRelatedField

class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    description = serializers.CharField(required=True)
    slug=serializers.SlugField(required=False)
    liked=serializers.SerializerMethodField()
    likesCount = serializers.SerializerMethodField(method_name='get_likes_count')
    tagList = TagRelatedField(many=True,required=False,source='tags')
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model = Post
        fields = (
            'author',
            'body',
            'createdAt',
            'description',
            'liked',
            'likesCount',
            'slug',
            'tagList',
            'title',
            'updatedAt',
        )

    def create(self,validated_data):
        author = self.context.get('author',None)
        tags=validated_data.pop('tags',[])
        post = Post.objects.create(author=author,**validated_data)
        for tag in tags:
            post.tags.add(tag)
        return post
    
    def get_created_at(self,instance):
        return instance.created_at.isoformat()
    
    def get_liked(self,instance):
        request = self.context.get('request',None)
        if request is None:
            return False
        if not request.user.is_authenticated():
            return False
        return request.user.profile.has_liked(instance)
    
    def get_likes_count(self, instance):
        return instance.liked_by.count()
    
    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(required=False)
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    updatedAt = serializers.SerializerMethodField(method_name='get_updated_at')

    class Meta:
        model= Comment
        fields=(
            'id',
            'author',
            'body',
            'createdAt',
            'updatedAt',
        )
    def create(self,validated_data):
        post = self.context['post']
        author = self.context['author']
        return Comment.objects.create(author=author,post=post,**validated_data)

    def get_created_at(self,instance):
        return instance.create_at.isoformat()
    
    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tag
        fields=('tag',)
    def to_representation(self,obj):
        return obj.tag
        