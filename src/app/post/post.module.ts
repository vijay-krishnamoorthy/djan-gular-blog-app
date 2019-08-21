import { NgModule } from '@angular/core';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared';
import { PostRoutingModule } from './post-routing.module';
import { ProfileResolver } from '../profile/profile-resolver.service';
import { PostResolver } from './post-resolver.service';



@NgModule({
  declarations: [
    PostCommentComponent,
    PostComponent,
  ],
  imports: [
    SharedModule,
    PostRoutingModule,
  ],
  providers: [
    PostResolver,
  ]
})
export class PostModule { }
