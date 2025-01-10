import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    { path: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent)},
    { path: 'support', loadComponent: () => import('./support/support.component').then(m => m.SupportComponent)},
    { path: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent)},
    { path: 'nav-bar', loadComponent: () => import('./nav-bar/nav-bar.component').then(m => m.NavBarComponent)},
    { path: 'edit-profile', loadComponent: () => import('./edit-profile/edit-profile.component')},
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
