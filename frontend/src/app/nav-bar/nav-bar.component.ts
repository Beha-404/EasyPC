import { Component, inject} from '@angular/core';
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

  accountService = inject(AccountService);

  model: any = {};
  errorMessage: string = "";
  isLoginFormVisible: boolean = false;
  isDropDownVisible:boolean = false;

  toggleDropDown() {
    this.isDropDownVisible = !this.isDropDownVisible;
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
