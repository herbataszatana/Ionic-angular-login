import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.component.html',
  styleUrls: ['./detail-note.component.scss'],
})
export class DetailNoteComponent implements OnInit {
  currentNote: Note;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly noteService: NoteService,
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const noteId: string = this.route.snapshot.paramMap.get('noteId');
    this.initializeNote(noteId);
  }

  initializeNote(noteId: string): void {
    this.noteService.getNoteDetail(noteId).subscribe((note) => {
      this.currentNote = note;
      if (this.currentNote) {
        this.currentNote.id = noteId;
      }
    });
  }


  async removeNote() {
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();

      await this.noteService.deleteNote(this.currentNote.id);

      await loading.dismiss();

      this.router.navigateByUrl('note');
    } catch (error) {
      await loading.dismiss();
      console.log(error);
    }
  }

  async removeNoteAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to delete ${this.currentNote.name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete Note',
          handler: () => this.removeNote(),
        },
      ],
    });
    await alert.present();

    await alert.onDidDismiss();
  }
}
