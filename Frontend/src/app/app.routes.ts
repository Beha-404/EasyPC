import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component')},
    { path: 'orders', loadComponent: () => import('./orders/orders.component'), canActivate: [authGuard] },
    { path: 'support', loadComponent: () => import('./support/support.component'), canActivate: [authGuard] },
    { path: 'products', loadComponent: () => import('./products/products.component'), canActivate: [authGuard] },
    { path: 'nav-bar', loadComponent: () => import('./nav-bar/nav-bar.component').then(m => m.NavBarComponent)},
    { path: 'edit-profile', loadComponent: () => import('./edit-profile/edit-profile.component'), canActivate: [authGuard] },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
