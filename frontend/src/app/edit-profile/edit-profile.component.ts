import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../_models/User';
import { ServicesContainerService } from '../_services/services-container.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterModule, FormsModule, MatButtonModule, MatFormFieldModule, CommonModule, MatInputModule, NavBarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export default class EditProfileComponent implements OnInit {

  services = inject(ServicesContainerService);
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    address: '',
    profilePicture: ''
  };

  userData:any;
  openDeleteForm = false;
  isDragging = false;
  file: File | null = null;
  originalUser: User = { ...this.user };
  model: any[] = [];
  previewURL: string | ArrayBuffer | null = null;
  URL = "http://localhost:5132/api/users/";

  constructor(private imageCompress: NgxImageCompressService) {
  }

  ngOnInit() {
    this.setCurrentUser();
    this.getUserData();
    this.setParameters();
  }
  getUserData() {
    const username = this.services.accountService.currentUser()?.username;
   // this.services.userService.getUserByUsername(username)
  }

  getCurrentUser() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      return userObject;
    }
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.services.accountService.currentUser.set(user);
  }

  setParameters() {
    return this.services.httpService.get(this.URL + this.getCurrentUser().username).subscribe({
      next: (newUser) => {
        this.user = newUser as User;
        this.originalUser = { ...this.user };
      }
    });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileHandler(files[0]);
    }
  }
  onDragLeave() {
    this.isDragging = false;
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  fileHandler(file: File) {
    if (file.type.startsWith('image/')) {
      this.file = file;

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.imageCompress.compressFile(base64Image, -1, 50, 50).then((compressedImage) => {
          this.previewURL = compressedImage;
          this.user.profilePicture = compressedImage;
        });
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  }


  onSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.previewURL = null;

      this.fileHandler(input.files[0]);
    }
  }


  triggerFileInput() {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    fileInput.click();
  }

  submitChanges() {
    if (this.user) {
      const formData = new FormData();
      formData.append('firstName', this.user.firstName || '');
      formData.append('lastName', this.user.lastName || '');
      formData.append('city', this.user.city || '');
      formData.append('state', this.user.state || '');
      formData.append('postalCode', this.user.postalCode || '');
      formData.append('country', this.user.country || '');
      formData.append('address', this.user.address || '');

      if (this.file) {
        formData.append('profilePicture', this.file, this.file.name);
      }


      this.services.httpService.put(this.URL + this.getCurrentUser().username, formData).subscribe({
        next: () => {
          this.services.toastrService.success("Changes saved successfully");
          this.setParameters();
          this.previewURL = null;
        },
        error: err => {
          console.error('Error updating user', err);
          this.services.toastrService.error('Failed to save changes. Please try again.');
        }
      });
    }
  }

  resetChanges() {
    this.setParameters();
    this.previewURL = null;
  }

  toggleDeleteForm() {
    this.openDeleteForm = !this.openDeleteForm;
  }

  deleteProfile() {
    const username: string = this.getCurrentUser().username;

    this.services.httpService.delete('http://localhost:5132/api/users/' + username).subscribe({
      next: () => {
        this.services.accountService.logout();
        this.services.toastrService.success('User deleted');
        this.services.routerService.navigate(['/home']);
      }
    })
  }
}

