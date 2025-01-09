import { Component,inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../_models/User';
import { ServicesContainerService } from '../_services/services-container.service';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterModule, FormsModule, MatButtonModule, MatFormFieldModule, CommonModule, MatInputModule, NavBarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export default class EditProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editForm?:NgForm;
  services = inject(ServicesContainerService);

  user: User = {
    username: '',
    password:'',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    address: '',
    profilePicture: ''
  };


  originalUser: User = { ...this.user };
  model: any[] = [];
  URL = "http://localhost:5132/api/users/";


  ngOnInit() {
    this.setParameters();
    this.setCurrentUser();
  }

  getCurrentUser() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      return userObject;
    }
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.services.accountService.currentUser.set(user);
  }

  setParameters() {
    return this.services.httpService.get(this.URL + this.getCurrentUser().username).subscribe({
      next: (newUser) => {
        this.user = newUser as User;
        this.originalUser = { ...this.user };
        console.log(this.user);
      }
    });
  }

  submitChanges() {
    if (this.user) {
      this.services.httpService.put(this.URL + this.getCurrentUser().username, this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.services.toastrService.success("Changes saved successfully");
          this.editForm?.reset(this.user);
        },
        error: err => {
          console.error('Eror updating user', err);
          this.services.toastrService.error('Failed to save changes. Please try again.' + this.services.toastrService.error);
        }
      })
    }
  }

  resetChanges() {
    this.setParameters();
  }


  deleteProfile() {
    const username:string = this.getCurrentUser().username;
    
    this.services.httpService.delete('http://localhost:5132/api/users/'+username).subscribe({
      next: ()=> {
        this.services.accountService.logout();
        this.services.toastrService.success('User deleted');
        this.services.routerService.navigate(['/home']);
      }
    })
    }
}

