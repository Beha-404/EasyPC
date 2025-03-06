import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesContainerService } from '../_services/services-container.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, NavBarComponent,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string = "";
  model: any = {};

  constructor(
    private router:Router,
    private services:ServicesContainerService
  ) {

  }

  RegisterForm(): void {
    this.router.navigateByUrl("/register");
  }
  closeRegisterForm(): void {
    this.router.navigateByUrl("/home");
  }
  LoginForm(): void {
    this.router.navigateByUrl("/login");
  }
  closeLoginForm(): void {
    this.router.navigateByUrl("/home");
  }
  login() {
    this.services.accountService.login(this.model).subscribe({
      next: () => {
        this.errorMessage = "";
        this.closeLoginForm();
      },
      error: error => {
        console.log(error);
        this.services.toastrService.error("Check your inputs");
      }
    });
  };
}
