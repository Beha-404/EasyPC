import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
   { path: 'nav-bar', loadComponent: () => import('./nav-bar/nav-bar.component').then(m => m.NavBarComponent)},
   { path: 'edit-profile', loadComponent: () => import('./edit-profile/edit-profile.component'),},
   { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
