import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/core';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {

  constructor() { }
  @Input() post: Post;
  ngOnInit() {
  }

  onToggleFavorite(favorited: boolean) {
    this.post['favorited'] = favorited;

    if(favorited) {
      this.post['favoritesCount']++;
    } else {
      this.post['favoritesCount']--;
    }
  }

}
