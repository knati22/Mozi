import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.scss'
})
export class BejelentkezesComponent {
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;

  constructor() {}

  login() {
    this.loginError = '';
    
    if (this.email.value === 'user1@gmail.com' && this.password.value === 'jelszo') {
      this.isLoading = true;
      this.showLoginForm = false;
      
      localStorage.setItem('bejelentkezve', 'true');
      window.location.href = '/home';

    } else {
      this.loginError = 'Rossz jeszó vagy felhasználónév!';
    }
  }
}