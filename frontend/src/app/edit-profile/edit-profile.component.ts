import { Component,inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterModule, FormsModule, MatButtonModule, MatFormFieldModule, CommonModule, MatInputModule, NavBarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export default class EditProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editForm?:NgForm;
  http = inject(HttpClient);
  accountService = inject(AccountService);
  toastrService = inject(ToastrService);

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
  }

  getCurrentUser() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      return userObject;
    }
  }

  setParameters() {
    return this.http.get(this.URL + this.getCurrentUser().username).subscribe({
      next: (newUser) => {
        this.user = newUser as User;
        this.originalUser = { ...this.user };
        console.log(this.user);
      }
    });
  }

  submitChanges() {
    if (this.user) {
      this.http.put(this.URL + this.getCurrentUser().username, this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.toastrService.success("Changes saved successfully");
          this.editForm?.reset(this.user);
        },
        error: err => {
          console.error('Eror updating user', err);
          this.toastrService.error('Failed to save changes. Please try again.' + this.toastrService.error);
        }
      })
    }
  }

  resetChanges() {
    this.setParameters();
  }

}

