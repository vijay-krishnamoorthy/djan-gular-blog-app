from blog.app.helpers.renderers import MyJSONRenderer

class ProfileJSONRenderer(MyJSONRenderer):
    object_label='profile'
    pagination_object_label='profiles'
    pagimation_count_label = 'profilesCount'