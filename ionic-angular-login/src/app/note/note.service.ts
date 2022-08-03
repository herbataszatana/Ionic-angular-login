import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  deleteDoc,
  addDoc,
} from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Note } from './note.model';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private readonly auth: AuthService, private readonly firestore: Firestore) {}

  getNoteList(): Observable<Note[]> {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: User) => collection(this.firestore, `users/${userId}/note`)),
      switchMap((noteCollection: CollectionReference<Note>) =>
        collectionData<Note>(noteCollection, { idField: 'id' })
      )
    );
  }

  getNoteDetail(noteId: string): Observable<Note> {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: User) => doc(this.firestore, `users/${userId}/note/${noteId}`)),
      switchMap((noteDocument: DocumentReference<Note>) => docData<Note>(noteDocument))
    );
  }

  createNote(note: Partial<Note>): Promise<DocumentReference<Partial<Note>>> {
    const userId: string = this.auth.getUser().uid;
    const noteCollection = collection(this.firestore, `users/${userId}/note/`) as CollectionReference<Partial<Note>>;
    return addDoc<Partial<Note>>(noteCollection, note);
  }

  deleteNote(noteId: string): Promise<void> {
    const userId: string = this.auth.getUser().uid;
    const documentReference = doc(this.firestore, `users/${userId}/note/${noteId}`);
    return deleteDoc(documentReference);
  }

}
