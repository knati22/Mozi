import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router,RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';


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
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.bejelentkezve = localStorage.getItem('bejelentkezve') === 'true';
  }

  kijelentkezes(): void {
    localStorage.setItem('bejelentkezve', 'false');
    this.bejelentkezve = false;
    window.location.href = '/home';
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
