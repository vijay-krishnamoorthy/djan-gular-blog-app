from django.db import models
from blog.app.helpers.models import TimestampedModel

class Profile(TimestampedModel):
    user = models.OneToOneField('authentication.user',on_delete=models.CASCADE)
    status = models.TextField(blank = True)
    dp = models.URLField(blank = True)

    likes = models.ManyToManyField('posts.Post',related_name='liked_by',symmetrical=False)

    def __str__(self):
        return self.user.username
    
    def like(self, post):
        self.like.add(post)
    
    def dislike(self,article):
        self.like.remove(post)
    
    def has_liked(self, post):
        return self.likes.filter(pk=post.pk).exists()
