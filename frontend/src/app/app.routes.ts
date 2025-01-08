import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const routes: Routes = [
   {path: '',redirectTo:'/home',pathMatch:'full'},
   {path:'home',component:HomeComponent},
   { path: 'nav-bar', component: NavBarComponent },
   { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
