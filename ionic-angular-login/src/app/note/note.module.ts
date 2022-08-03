import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';
import { CreateNoteComponent } from './create-note/create-note.component';

import { DetailNoteComponent } from './detail-note/detail-note.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotePageRoutingModule],
  declarations: [NotePage, CreateNoteComponent, DetailNoteComponent],
})
export class NotePageModule {}
