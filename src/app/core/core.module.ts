import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';  
import { HttpTokenInterceptor } from './interceptors';
import { ApiService, PostsService, AuthGuard, CommentService, JwtService, ProfileService, TagsService, UserService } from './services';
 

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    PostsService,
    AuthGuard,
    CommentService,
    JwtService,
    ProfileService,
    TagsService,
    UserService
  ],
})
export class CoreModule { }
