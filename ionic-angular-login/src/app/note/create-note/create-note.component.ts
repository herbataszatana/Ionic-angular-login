import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  name: string;
  content: string;

  constructor(
    private readonly noteService: NoteService,
    private readonly router: Router,
    private readonly loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async createEvent(note: Partial<Note>): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();


    await this.noteService.createNote(note);

    await loading.dismiss();

    await this.router.navigateByUrl('note');
  }


}
