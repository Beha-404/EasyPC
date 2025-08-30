import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'support', loadComponent: () => import('./support/support.component').then(m => m.SupportComponent) },
  { path: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'nav-bar', loadComponent: () => import('./nav-bar/nav-bar.component').then(m => m.NavBarComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)},
  { path: 'order-details/:id', loadComponent: () => import('./order-details/order-details.component').then(m => m.OrderDetailsComponent)},
  { path: 'edit-profile', loadComponent: () => import('./edit-profile/edit-profile.component').then(m => m.EditProfileComponent) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
