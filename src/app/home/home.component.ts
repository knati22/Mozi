import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FilmObject } from '../filmeink';
import { TeremObject } from '../teremek';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  imports: [MatCardModule, CommonModule, 
    MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {
  FilmObject = FilmObject;
  selectedFilm: any = null;
  constructor(private router: Router) {}
  tovabb(film:any){
    this.router.navigate(['/film']);
    localStorage.setItem('selectedFilm', JSON.stringify(film));
  } 

}
