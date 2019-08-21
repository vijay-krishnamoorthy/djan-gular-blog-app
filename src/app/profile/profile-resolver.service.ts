import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Profile, ProfileService } from '../core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable() 
export class ProfileResolver implements Resolve<Profile> {

    constructor(
        private profileService: ProfileService,
        private router: Router,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state : RouterStateSnapshot,
        ): Observable<any> {
            return this.profileService.get(route.params['username'])
            .pipe(catchError((err)=>this.router.navigateByUrl('/')));
        }
}