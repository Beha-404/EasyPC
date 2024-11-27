import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { SupportComponent } from './support/support.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home',pathMatch:'full'},
    { path: 'home',component: HomeComponent },
    { path: 'orders', component: OrdersComponent ,canActivate:[authGuard]},
    { path: 'support', component: SupportComponent,canActivate:[authGuard] },
    { path: 'products', component: ProductsComponent,canActivate:[authGuard] },
    { path: 'nav-bar', component: NavBarComponent },
    { path: 'edit-profile', component: EditProfileComponent,canActivate:[authGuard] },
    { path: '**',redirectTo: '/home', pathMatch: 'full' },
];
