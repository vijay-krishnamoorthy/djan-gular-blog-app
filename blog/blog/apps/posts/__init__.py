from django.apps import AppConfig


class PostsAppConfig(AppConfig):
    name = 'blog.apps.posts'
    label = 'posts'
    verbose_name = 'Posts'

    def ready(self):
        import blog.apps.posts.signals

default_app_config = 'blog.apps.posts.PostsAppConfig'
