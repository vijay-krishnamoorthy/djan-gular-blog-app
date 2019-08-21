import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';
import { EditablePostResolver } from './editable-post-resolver.service';



@NgModule({
  declarations: [EditorComponent],
  imports: [
    SharedModule,
    EditorRoutingModule,
  ],
  providers: [
    EditablePostResolver
  ]
})
export class EditorModule { }
