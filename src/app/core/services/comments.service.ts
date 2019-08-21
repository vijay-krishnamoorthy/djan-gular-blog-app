import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()
export class CommentService {
    constructor( private apiService:ApiService) { }
    add(slug,payload): Observable<Comment> {
        return this.apiService.post(`/posts/${slug}/comments`,{comment: {body: payload}}).pipe(map(data=>data.comment));
    }
    
    getAll(slug): Observable<Comment[]> {
        return this.apiService.get(`/posts/${slug}/comments`).pipe(map(data => data.comments));
    }

    destroy(commentId, postSlug) {
        return this.apiService.delete(`/posts/${postSlug}/comments/${commentId}`);
    }
}