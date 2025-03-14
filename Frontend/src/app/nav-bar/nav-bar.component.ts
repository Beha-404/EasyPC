import { Component, inject, input, output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, MatIconModule, MatButtonModule, FormsModule, CommonModule,RouterLinkActive,RouterLink],
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
  isDropDownVisible:boolean = false;

  cancel(){
    this.cancelRegister.emit(false);
  }

  toggleDropDown() {
    this.isDropDownVisible = !this.isDropDownVisible;
  }

  register() {
    this.accountService.register(this.model).subscribe(
      {
        next: ()=> {
          this.closeRegisterForm();
        },
        error:error => {
          console.log(error);
          this.errorMessage = error.error
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
    this.isLoginFormVisible = true;
  }
  closeLoginForm(): void {
    this.isLoginFormVisible = false;
  }
  login() {
    this.accountService.login(this.model).subscribe({
      next: _ =>{
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
