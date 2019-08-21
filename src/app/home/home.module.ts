import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeAuthResolver } from './home-auth-resolver.service';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  providers: [
    HomeAuthResolver,
  ]
})
export class HomeModule { }
