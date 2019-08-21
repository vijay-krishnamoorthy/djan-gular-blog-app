from blog.apps.core.renderers import MyJSONRenderer


class ProfileJSONRenderer(MyJSONRenderer):
    object_label = 'profile'
    pagination_object_label = 'profiles'
    pagination_count_label = 'profilesCount'
