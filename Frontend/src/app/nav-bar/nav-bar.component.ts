import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, MatIconModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() usersFromHomeComponent: any;
  accountService = inject(AccountService);
  body: any = {};
  errorMessage: string = "";
  isLoginFormVisible: boolean = false;
  isRegisterFormVisible: boolean = false;
  model: any = {};

  openRegisterForm(): void {
    this.isRegisterFormVisible = true;
  }
  closeRegisterForm(): void {
    this.isRegisterFormVisible = false;
  }

  openLoginForm(): void {
    console.log("Opening login form...");
    this.isLoginFormVisible = true;
  }
  // Close the login form
  closeLoginForm(): void {
    console.log("Closing login form...");
    this.isLoginFormVisible = false;
  }
  login() {
    this.accountService.login(this.body).subscribe({
      next: response => {
        console.log(response);
        this.errorMessage = "";
        this.closeLoginForm();
      },
      error: error => {
        console.log(error);
        this.errorMessage = "Login failed. Please check your inputs";
      }
    });
  };

  logout(){
    this.accountService.logout();
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');

  }
}
