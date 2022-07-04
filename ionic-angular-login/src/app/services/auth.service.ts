import { Injectable } from '@angular/core';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import {Auth, signInWithEmailAndPassword, authState, createUserWithEmailAndPassword,
  updateProfile, UserInfo, UserCredential, signOut} from '@angular/fire/auth';
import { sendPasswordResetEmail } from '@firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);
  constructor(
    private auth: Auth) {}
 
  async register({ email, password, fname, lname, gender, dob }) { //fname added
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
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


