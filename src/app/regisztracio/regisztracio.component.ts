import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Felhasznalo } from '../models/felhasznalo';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],   
  templateUrl: './regisztracio.component.html',
  styleUrl: './regisztracio.component.scss'
})
export class RegisztracioComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    nev: new FormGroup({
      vezeteknev: new FormControl('', [Validators.required, Validators.minLength(2)]),
      keresztnev: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });

  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Hiba';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;
    
    if (password !== rePassword) {
      this.signupError = 'A két jelszó nem egyezik';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<Felhasznalo> = {
      nev: {
        vezeteknev: this.signUpForm.value.nev?.vezeteknev || '',
        keresztnev: this.signUpForm.value.nev?.keresztnev || ''
      },
      email: this.signUpForm.value.email || '',
      jegyei: [],
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService.signUp(email, pw, userData)
      .then(userCredential => {
        console.log('Regisztáció sikerült:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
        this.isLoading = false;
        this.showForm = true;
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email already in use.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Rossz email.';
            break;
          case 'auth/weak-password':
            this.signupError = 'Minimum hat kerekteres legyen a jelszó.';
            break;
          default:
            this.signupError = 'Hiba';
        }
      });
  }
}

