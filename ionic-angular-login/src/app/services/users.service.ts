import { Injectable } from '@angular/core';
import { doc,addDoc, docData, collection, CollectionReference, Firestore, setDoc, updateDoc, DocumentReference} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../user';
import { AuthService } from './auth.service';
import { UserValues } from 'src/app/values';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // This function gets the user's personal info and displays it in tab 1 
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  // This function is executted during registration 
  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  addValues(values: Partial<UserValues>): Promise<DocumentReference<Partial<UserValues>>> {
    const userId: string = this.authService.getUser().uid;
    const valuesCollection = collection(this.firestore, `users/${userId}/values/`) as CollectionReference<Partial<UserValues>>;
    return addDoc<Partial<UserValues>>(valuesCollection, values);
  }
  

}
