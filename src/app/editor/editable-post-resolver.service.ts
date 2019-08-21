import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post, PostsService, UserService } from '../core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';









@Injectable()
export class EditablePostResolver implements Resolve<Post>{
    constructor(
        private PostService: PostsService,
        private router: Router,
        private userService: UserService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any> {
        return this.PostService.get(route.params['slug']).pipe(map(
            post => {
                if(this.userService.getCurrentUser().username === post.author.username) {
                    return post;
                } else {
                    this.router.navigateByUrl('/');
                }
            }
        ),
        catchError((err)=>this.router.navigateByUrl('/'))
        );
    }
}