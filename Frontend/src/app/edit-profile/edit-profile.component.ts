import { Component,inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { setOriginalNode } from 'typescript';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterModule, FormsModule, MatButtonModule, MatFormFieldModule, CommonModule, MatInputModule, NavBarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  http = inject(HttpClient);
  accountService = inject(AccountService);
  toastrService = inject(ToastrService);

  user: User = {
    username: '',
    token: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    address: '',
    profilePicture: ''
  };

  model: any[] = [];
  file: any;
  isDragging = false;
  previewURL: string | ArrayBuffer | null = null;
  URL = "http://localhost:5271/api/users/";


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
        console.log(this.user);
      }
    });
  }

  getFile(event: any) {
    this.file = event.target.files[0];
    console.log("file", this.file);
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    fileInput.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }
  onDragLeave() {
    this.isDragging = false;
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileHandler(files[0]);
    }
  }

  onSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileHandler(input.files[0]);
    }
  }

  fileHandler(file: File) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result !== undefined) {
          this.previewURL = result;
          this.user.profilePicture = result as string; 
        }
      };
      reader.readAsDataURL(file);
    }
    else {
      alert('Please upload an image file');
    }
  }

  submitChanges() {
    if (this.user) {
      this.http.put(this.URL + this.getCurrentUser().username, this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.toastrService.success("Changes saved successfully");
        },
        error: err => {
          console.error('Eror updating user', err);
          this.toastrService.error('Failed to save changes. Please try again.' + this.toastrService.error);
        }
      })
    }
  }

}

