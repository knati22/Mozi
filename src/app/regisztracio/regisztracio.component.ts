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
    jelszo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ujbol: new FormControl('', [Validators.required]),
    nev: new FormGroup({
      vezeteknev: new FormControl('', [Validators.required, Validators.minLength(3)]),
      keresztnev: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  });
  
  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Hibásan adta meg az adatait, kérem javítsa!';
      return;
    }

    const jelszo = this.signUpForm.get('jelszo');
    const ujbol = this.signUpForm.get('ujbol');

    if (jelszo?.value !== ujbol?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: Felhasznalo = {
      nev: {
        vezeteknev: this.signUpForm.value.nev?.vezeteknev || '',
        keresztnev: this.signUpForm.value.nev?.keresztnev || ''
      },
      email: this.signUpForm.value.email || '',
      jelszo: this.signUpForm.value.jelszo || '',
      jegyei: []
    };

    console.log('New user:', newUser);
    console.log('Form value:', this.signUpForm.value);
    this.router.navigateByUrl('/home');
  }
}