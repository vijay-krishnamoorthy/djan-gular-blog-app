import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Post, PostsService, UserService } from '../core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PostResolver implements Resolve<Post> {

    constructor(
        private postsService: PostsService,
        private router: Router,
        private userService: UserService,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.postsService.get(route.params['slug']).pipe(
            catchError(
                (err) => this.router.navigateByUrl('/')
            )
        );
    }
}