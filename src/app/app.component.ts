import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router,RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink, 
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mozi';
  bejelentkezve = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

    ngOnInit(): void {  if (this.authService.currentUser) {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.bejelentkezve = !!user;
      localStorage.setItem('bejelentkezve', this.bejelentkezve ? 'true' : 'false');
    });
  } else {
    console.error('authService.currentUser nincs inicializálva');
  }
  }


  

  kijelentkezes(): void {
    this.authService.signOut();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
