import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/core';

@Component({
  selector: 'app-post-meta',
  templateUrl: './post-meta.component.html',
  styleUrls: ['./post-meta.component.css']
})
export class PostMetaComponent {

  constructor() { }
  @Input() post: Post;

}
