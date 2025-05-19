import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Felhasznalo } from '../../models/felhasznalo';
import { Jegy } from '../../models/jegy';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    felhasznalo: Felhasznalo | null,
    jegyei: Jegy[]
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            felhasznalo: null,
            jegyei: []
          });
        }

        return from(this.fetchUserWithJegy(authUser.uid));
      })
    );
  }

  private async fetchUserWithJegy(userId: string): Promise<{
    felhasznalo: Felhasznalo | null,
    jegyei: Jegy[],
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Felhasznalo', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          felhasznalo: null,
          jegyei: []
          
        };
      }

      const userData = userSnapshot.data() as Felhasznalo;
      const felhasznalo = { ...userData, id: userId };
      
      if (!felhasznalo.jegyei || felhasznalo.jegyei.length === 0) {
        return {   
          felhasznalo,
          jegyei: []
        };
      }


      const jegyeiCollection = collection(this.firestore, 'Jegyek');
      const q = query(jegyeiCollection, where('id', 'in', felhasznalo.jegyei));
      const jegyeiSnapshot = await getDocs(q);
      
      const jegyei: Jegy[] = [];

  

      return {
        felhasznalo,
        jegyei
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        felhasznalo: null,
        jegyei: []
      };
    }
  }
}