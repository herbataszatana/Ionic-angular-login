import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { DetailNoteComponent } from './detail-note/detail-note.component';

import { NotePage } from './note.page';

const routes: Routes = [
  {
    path: '',
    component: NotePage,
  },
  {
    path: 'new',
    component: CreateNoteComponent,
  },
  {
    path: ':noteId',
    component: DetailNoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotePageRoutingModule {}
