import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared';
import { SettingsRoutingModule } from './settings-routing.module';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ]
})
export class SettingsModule { }
