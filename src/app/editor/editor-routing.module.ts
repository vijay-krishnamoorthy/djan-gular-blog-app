import { Routes, RouterModule } from "@angular/router";
import { EditorComponent } from './editor.component';
import { AuthGuard } from '../core';
import { EditablePostResolver } from './editable-post-resolver.service';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'slug',
        component: EditorComponent,
        canActivate : [AuthGuard],
        resolve : {
            post : EditablePostResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRoutingModule { }