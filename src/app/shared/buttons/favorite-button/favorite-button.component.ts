import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService, UserService, Post } from 'src/app/core';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {

  constructor(
    private postService: PostsService,
    private router: Router,
    private userService: UserService,
  ) { }
  
  @Input() post: Post;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
      if(!authenticated) {
        this.router.navigateByUrl('/login');
        return of(null)
      }

      if(!this.post.favorited) {
        return this.postService.favorite(this.post.slug)
        .pipe(tap(
          data => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          err => this.isSubmitting = false
        ));
      } else {
        return this.postService.unfavorite(this.post.slug)
        .pipe(tap(
          data => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          err => this.isSubmitting = false
        ));
      }
    }
    )).subscribe();
}
}
