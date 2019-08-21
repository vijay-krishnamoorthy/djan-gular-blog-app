import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, PostListConfig } from 'src/app/core';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router: Router,
  ) { }

  profile: Profile;
  postsConfig: PostListConfig = {
    type: 'all',
    filters: {}
  };

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data : { profile: Profile }) => {
        this.profile = data.profile;
        this.postsConfig = {
          type: 'all',
          filters: {}
        };
        this.postsConfig.filters.author = this.profile.username;
      }
    );
  }

}
