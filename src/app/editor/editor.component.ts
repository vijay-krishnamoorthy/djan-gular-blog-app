import { Component, OnInit } from '@angular/core';
import { Post, PostsService } from '../core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  post: Post = {} as Post;
  postForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });
    this.post.tagList = [];
   }


  ngOnInit() {
    this.route.data.subscribe((data : {post: Post}) => {
      if(data.post) {
        this.post = data.post;
        this.postForm.patchValue(data.post);
      }
    });
  }
  addTag() {
    const tag = this.tagField.value;

    if(this.post.tagList.indexOf(tag) < 0) {
      this.post.tagList.push(tag);
    }
    this.tagField.reset('');
  }
  removeTag(tagName: string){
    this.post.tagList = this.post.tagList.filter(tag => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    this.updatePost(this.postForm.value);
    this.postsService.save(this.post).subscribe(
      post => this.router.navigateByUrl('/post/'+ post.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updatePost(values: Object) {
    Object.assign(this.post, values);
  }
}
