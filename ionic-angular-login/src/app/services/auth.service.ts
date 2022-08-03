import { Injectable } from '@angular/core';
import {User, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, signOut, authState} from '@angular/fire/auth';
import { sendPasswordResetEmail } from '@firebase/auth';
import { from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth) {}
 //To delete
    getUser(): User {
      return this.auth.currentUser;
    }
  
    getUser$(): Observable<User> {
      return of(this.getUser());
    }
  //End delete

  signUp(email: string, password: string): Observable<UserCredential> {
      return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

// Function being executed on login page    
  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }
 // Reset function is executed on the forgot-password page
  async reset({email}) {
    try {
      const user = await sendPasswordResetEmail(this.auth, email);
      return user;
    } catch (e) {
      return null;
    }
  }

  
// Logout fuction  executed when the user click on the  logout icon 
  logout() {
    return signOut(this.auth);
  }

 }


