import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, MatIconModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  loggedIn = false;
  private accountService = inject(AccountService);
  body: any = {};
  isLoginFormVisible: boolean = false;
  errorMessage: string = "";




  openForm(): void {
    console.log("Opening login form...");
    this.isLoginFormVisible = true;
  }
  // Close the login form
  closeForm(): void {
    console.log("Closing login form...");
    this.isLoginFormVisible = false;
  }
  login() {
    this.accountService.login(this.body).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
        this.errorMessage = "";
        this.closeForm();
      },
      error: error => {console.log(error);
      this.errorMessage = "Login failed. Please check your inputs";
      }
    });
  };
}
/*
const loginFormContainer = document.querySelector(".loginForm-container"),
loginFormLogin = document.getElementById("loginButton"),
login = document.getElementById("login"),
loginForm = document.querySelector(".login");

function closeLoginFormContainer(){
  loginFormContainer?.classList.remove("open");
}*/