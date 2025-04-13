import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'film',
        loadComponent: () => import('./film/film.component').then(m => m.FilmComponent)
    },
    {
        path: 'rolunk',
        loadComponent: () => import('./rolunk/rolunk.component').then(m => m.RolunkComponent)
    },
    {
        path: 'jegyvetel',
        loadComponent: () => import('./jegyvetel/jegyvetel.component').then(m => m.JegyvetelComponent)
    },
    {
        path: 'profil',
        loadComponent: () => import('./profil/profil.component').then(m => m.ProfilComponent)
    },
    {
        path: 'bejelentkezes',
        loadComponent: () => import('./bejelentkezes/bejelentkezes.component').then(m => m.BejelentkezesComponent)
    },
    {
        path: 'regisztracio',
        loadComponent: () => import('./regisztracio/regisztracio.component').then(m => m.RegisztracioComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];