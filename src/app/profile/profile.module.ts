import { NgModule } from '@angular/core';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileResolver } from './profile-resolver.service';



@NgModule({
  declarations: [
    ProfilePostsComponent,
    ProfileFavoritesComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule { }
