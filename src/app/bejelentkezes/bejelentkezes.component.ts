import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OnDestroy } from '@angular/core';

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
export class BejelentkezesComponent implements OnDestroy{
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  authSubscription?: Subscription;



  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.email.invalid) {
      this.loginError = 'Helytelen email';
      return;
    }
    
    if (this.password.invalid) {
      this.loginError = '6 karakter minimum';
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    
    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';

    this.authService.signIn(emailValue, passwordValue)
      .then(userCredential => {
        console.log('Login successful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Login error:', error);
        this.isLoading = false;
        this.showLoginForm = true;
        
        switch(error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nincs ilyen email-el regisztráció';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Helytelen email vag jelszó';
            break;
          default:
            this.loginError = 'Belépés sikertelen';
        }
      });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}