import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note.model';
import { NoteService } from './note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage {
  readonly NoteList$: Observable<Note[]> = this.noteService.getNoteList();
  constructor(private readonly noteService: NoteService) {}
}
