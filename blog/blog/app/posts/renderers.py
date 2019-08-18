from blog.app.helpers.renderers import MyJSONRenderer

class PostJSONRenderer(MyJSONRenderer):
    object_label = 'post'
    pagination_object_label='posts'
    pagination_count_label = 'postsCount'

class CommentJSONRenderer(MyJSONRenderer):
    object_label='comment'
    pagination_object_label= 'comments'
    pagination_count_label ='commetsCount'

    