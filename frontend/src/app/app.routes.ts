import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import EditProfileComponent from './edit-profile/edit-profile.component';

export const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
   { path: 'nav-bar', component: NavBarComponent },
   { path: 'edit-profile', component: EditProfileComponent },
   { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
