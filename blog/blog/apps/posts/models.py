from django.db import models

from blog.apps.core.models import TimestampedModel


class Post(TimestampedModel):
    slug = models.SlugField(db_index=True, max_length=255, unique=True)
    title = models.CharField(db_index=True, max_length=255)

    description = models.TextField()
    body = models.TextField()
    author = models.ForeignKey(
        'profiles.Profile', on_delete=models.CASCADE, related_name='posts'
    )
    tags = models.ManyToManyField(
        'posts.Tag', related_name='posts'
    )

    def __str__(self):
        return self.title


class Comment(TimestampedModel):
    body = models.TextField()
    post = models.ForeignKey('posts.Post', related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey('profiles.Profile', related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return self.body


class Tag(TimestampedModel):
    tag = models.CharField(max_length=255)
    slug = models.SlugField(db_index=True, unique=True)

    def __str__(self):
        return self.tag
