import { Component, OnInit } from '@angular/core';
import { FilmObject } from '../filmeink';
import { TeremObject } from '../teremek';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 
import { StarPipe } from '../pipes/star.pipe';

@Component({
  selector: 'app-film',
  imports: [MatCardModule, CommonModule, 
    MatButtonModule, StarPipe],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent implements OnInit{
  textColor = '#C23327';
  film: any;
  ngOnInit() {
    const storedFilm = localStorage.getItem('selectedFilm');
    if (storedFilm) {
      this.film = JSON.parse(storedFilm);
    } 
  }
}
