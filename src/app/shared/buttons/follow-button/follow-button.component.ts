import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService, UserService } from 'src/app/core';
import { Router } from '@angular/router';
import { Profile } from '../../../core';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
  ) { }


  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        if(!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        if(!this.profile.following) {
          return this.profileService.follow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));
        } else {
          return this.profileService.unfollow(this.profile.username)
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
