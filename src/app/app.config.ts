import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "mozi-80e82", appId: "1:963416024960:web:f2857fdff6f119a08b4365", storageBucket: "mozi-80e82.firebasestorage.app", apiKey: "AIzaSyDvcf4YM00LDJ7ISDUD3W5VZLD-9nMV-jI", authDomain: "mozi-80e82.firebaseapp.com", messagingSenderId: "963416024960" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
