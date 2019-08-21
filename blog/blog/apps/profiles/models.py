from django.db import models

from blog.apps.core.models import TimestampedModel


class Profile(TimestampedModel):
    user = models.OneToOneField('authentication.User', on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.URLField(blank=True)
    follows = models.ManyToManyField('self',related_name='followed_by',symmetrical=False)
    favorites = models.ManyToManyField('posts.Post',related_name='favorited_by')

    def __str__(self):
        return self.user.username

    def follow(self, profile):
        self.follows.add(profile)

    def unfollow(self, profile):
        self.follows.remove(profile)

    def is_following(self, profile):
        return self.follows.filter(pk=profile.pk).exists()

    def is_followed_by(self, profile):
        return self.followed_by.filter(pk=profile.pk).exists()

    def favorite(self, post):
        self.favorites.add(post)

    def unfavorite(self, post):
        self.favorites.remove(post)

    def has_favorited(self, post):
        return self.favorites.filter(pk=post.pk).exists()
