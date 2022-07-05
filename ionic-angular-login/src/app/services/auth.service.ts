import { Injectable } from '@angular/core';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, signOut, authState} from '@angular/fire/auth';
import { sendPasswordResetEmail } from '@firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth) {}
 
  signUp(email: string, password: string): Observable<UserCredential> {
      return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

  async login({ email, password }) {
    try {
      //const user = await signInWithEmailAndPassword(this.auth, email, password);
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }
 //Reset - begining 
  async reset({email}) {
    try {
      const user = await sendPasswordResetEmail(this.auth, email);
      return user;
    } catch (e) {
      return null;
    }
  }
  //Reset end
  

  logout() {
    return signOut(this.auth);
  }

 }


