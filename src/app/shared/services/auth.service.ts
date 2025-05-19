import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Felhasznalo } from '../../models/felhasznalo';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    currentUser: Observable<FirebaseUser | null>;


  constructor(private auth: Auth, private router: Router,
  private firestore: Firestore) {this.currentUser = authState(this.auth);
   }

   signIn(email:string, password: string): Promise<UserCredential>{
      return signInWithEmailAndPassword(this.auth, email, password)
   }
async signUp(email: string, password: string, userData: Partial<Felhasznalo>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        jegyei: [],
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<Felhasznalo>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Felhasznalo'), userId);
    
    return setDoc(userRef, userData);
  }
   signOut(): Promise<void>{
      localStorage.setItem('isLoggedIn', 'false');
      return signOut(this.auth).then(() => {
        this.router.navigateByUrl('/home');
      });
   }

   isLoggedIn():Observable<FirebaseUser | null>{
      return this.currentUser;
   }

   updateLoginStatus(isLoggedIn: boolean):void{
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
   }
}
