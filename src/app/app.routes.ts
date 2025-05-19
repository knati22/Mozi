import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'film',
        loadComponent: () => import('./film/film.component').then(m => m.FilmComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'rolunk',
        loadComponent: () => import('./rolunk/rolunk.component').then(m => m.RolunkComponent)
    },
    {
        path: 'jegyvetel',
        loadComponent: () => import('./jegyvetel/jegyvetel.component').then(m => m.JegyvetelComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profil',
        loadComponent: () => import('./profil/profil.component').then(m => m.ProfilComponent),
        canActivate: [authGuard]
    },
    {
        path: 'bejelentkezes',
        loadComponent: () => import('./bejelentkezes/bejelentkezes.component').then(m => m.BejelentkezesComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'regisztracio',
        loadComponent: () => import('./regisztracio/regisztracio.component').then(m => m.RegisztracioComponent),
        canActivate: [publicGuard]
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