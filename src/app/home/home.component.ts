import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagsService, UserService, PostListConfig } from '../core';
import { all } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
  ) { }
    isAuthenticated: boolean;
    listConfig: PostListConfig = {
      type: 'all',
      filters: { }
    };
    tags: Array<string> = [];
    tagsLoaded = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if(authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );
    this.tagsService.getAll().subscribe(
      tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      }
    );
  }

  setListTo(type: string = '',filters: Object = {}) {
    if(type ==='feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listConfig = { type: type,filters: filters };
  }
}
