from blog.app.helpers.renderers import MyJSONRenderer

class UserJSONRenderer(MyJSONRenderer):
    charset = 'utf-8'
    object_label = 'user'
    pagination_object_label = 'users'
    pagination_count_label = 'usersCount'

    def render(self,data,meia_type=None,renderer_context=None):
        token = data.get('token',None)
        if token is not None and isinstance(token, bytes):
            data['token'] = token.decode('utf-8')
        
        return super(UserJSONRenderer,self).render(data)
