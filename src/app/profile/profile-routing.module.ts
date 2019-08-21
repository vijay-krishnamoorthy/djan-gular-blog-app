import { Routes, RouterModule } from "@angular/router";
import { ProfileResolver } from './profile-resolver.service';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: ':username',
        component: ProfileComponent,
        resolve: { 
            profile: ProfileResolver
         },
         children: [
             {
                 path:'',
                 component: ProfilePostsComponent
                },
                {
                path: 'favorites',
                component : ProfileFavoritesComponent
            }
            ]
        }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }