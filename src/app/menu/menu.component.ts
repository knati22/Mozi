import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() sidenav!: MatSidenav;
  @Input() bejelentkezve: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {
    console.log("constructor called");
  }

  

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  kijelentkezes() {
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }


}