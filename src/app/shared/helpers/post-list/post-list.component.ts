import { Component, OnInit, Input } from '@angular/core';
import { PostsService, PostListConfig, Post } from 'src/app/core';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(
    private postService:PostsService
  ) { }

  @Input() limit: number;
  @Input()
  set config(config: PostListConfig) {
    if(config) {
    this.query = config;
    this.currentPage =1;
    this.runQuery();
  }
}

query: PostListConfig;
results: Post[];
loading = false;
currentPage = 1;
totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    if(this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = ( this.limit * (this.currentPage - 1));
    }
    this.postService.query(this.query).subscribe( data => {
      this.loading=true;
      this.results = data.posts;
      this.totalPages = Array.from(new Array(Math.ceil(data.postsCount / this.limit)), (val, index) => index+1);
      });
  }

  ngOnInit() {
  }

}
