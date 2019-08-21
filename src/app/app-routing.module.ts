import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: 'settings',loadChildren: './settings/settings.module#SettingsModule'},
  { path: 'profile',loadChildren: './profile/profile.module#ProfileModule'},
  { path: 'editor',loadChildren: './editor/editor.module#EditorModule'},
  { path: 'post',loadChildren: './post/post.module#PostModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy : PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
