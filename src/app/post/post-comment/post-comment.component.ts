import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService, User } from 'src/app/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit,OnDestroy {

  constructor(
    private userService: UserService
  ) { }

  private subscription: Subscription;
  @Input() comment : Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  
  canModify: boolean;

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
      }
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
