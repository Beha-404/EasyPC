import { Component, inject, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, MatIconModule, MatButtonModule, FormsModule, CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  cancelRegister = output<boolean>();
  usersFromHomeComponent = input<any>()
  accountService = inject(AccountService);

  model: any = {};
  errorMessage: string = "";
  isLoginFormVisible: boolean = false;
  isRegisterFormVisible: boolean = false;
  isDropDownVisible: boolean = false;

  constructor(
    private router:Router
  ) {

  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  toggleDropDown() {
    this.isDropDownVisible = !this.isDropDownVisible;
  }

  register() {
    this.accountService.register(this.model).subscribe(
      {
        next: () => {
          this.closeRegisterForm();
        },
        error: error => {
          console.log(error);
          this.errorMessage = error.error
        }
      }
    )
  }

  checkLoginStatus() {
    if (!this.accountService.currentUser()) {
      this.router.navigateByUrl("/login");
    }
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
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.errorMessage = "";
        this.closeLoginForm();
      },
      error: error => {
        console.log(error);
        this.errorMessage = "Login failed. Please check your inputs";
      }
    });
  };

  logout() {
    this.accountService.logout();
  }
}
