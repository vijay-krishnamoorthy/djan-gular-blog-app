import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { PostListConfig, Post } from '../models';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
    constructor(
        private apiService: ApiService
    ) { }
    query(config: PostListConfig): Observable<{posts: Post[], postsCount: number} >{
    const params ={ };

    Object.keys(config.filters).forEach((key) =>{
        params[key] = config.filters[key];
    });
    return this.apiService.get('/articles'+((config.type == 'feed')? '/feed': ''),
    new HttpParams({ fromObject: params})
    );
    }

    get(slug): Observable<Post> {
        return this.apiService.get('/articles/'+slug)
        .pipe(map(data=>data.post));
    }
    destroy(slug) {
        return this.apiService.delete('/articles/'+slug);
    }
    save(post): Observable<Post> {
        if(post.slug) {
            return this.apiService.put('/articles/'+post.slug, {post: post})
            .pipe(map(data=>data.post));


        } else {
            return this.apiService.post('/articles',{post:post})
            .pipe(map(data => data.post));
        }
    }
    favorite(slug): Observable<Post> {
        return this.apiService.post('/articles/'+slug+'/favorite');
    }

    unfavorite(slug): Observable<Post> {
        return this.apiService.delete('/articles/'+slug + '/favorite');
    }
}