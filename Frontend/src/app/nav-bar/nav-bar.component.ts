import { Component, inject, input, output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, MatIconModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  cancelRegister = output<boolean>();
  usersFromHomeComponent = input.required<any>()
  accountService = inject(AccountService);

  model: any = {};
  errorMessage: string = "";
  isLoginFormVisible: boolean = false;
  isRegisterFormVisible: boolean = false;

  cancel(){
    this.cancelRegister.emit(false);
  }

  register() {
    this.accountService.register(this.model).subscribe(
      {
        next: response=> {
          console.log(response);
          this.closeRegisterForm();
        },
        error:error => {
          console.log(error);
          
        }
      }
    )
  }

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
    this.accountService.login(this.model).subscribe({
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

}
