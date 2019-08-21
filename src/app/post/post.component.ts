import { Component, OnInit } from '@angular/core';

import { 
  Post,
  User,
  PostsService,
  CommentService,
  UserService ,
} from '../core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResolver } from './post-resolver.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostResolver]
})
export class PostComponent implements OnInit {

  post: Post;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data : { post: Post}) => {
        this.post = data.post;

        this.populateComments();
      }
    );

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === this.post.author.username);
    
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.post.favorited = favorited;

    if(favorited) {
      this.post.favoritesCount++;
    }
    else {
      this.post.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.post.author.following = following;
  }

  deletePost() {
    this.isDeleting = true;

    this.postsService.destroy(this.post.slug).subscribe(
      success =>{
        this.router.navigateByUrl('/');
      }
    );
  }
 
  populateComments() {
    this.commentsService.getAll(this.post.slug)
    .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentsService.add(this.post.slug, commentBody).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
      },
      errors => {
        this.isSubmitting =false;
        this.commentFormErrors = errors;
      }
    );
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.post.slug).subscribe(
      success => {
        this.comments = this.comments.filter((item)=>item !== comment);
      }
    );
  }
}
