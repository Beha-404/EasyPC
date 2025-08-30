import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServicesContainerService } from '../_services/services-container.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [NavBarComponent,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

errorMessage: any;
model: any = {};

constructor(
  private router:Router,
  private services:ServicesContainerService
) {}

closeRegisterForm() {
  this.router.navigateByUrl("/home");
}

register() {
  
  this.services.accountService.register(this.model).subscribe(
    {
      next: () => {
        this.closeRegisterForm();
      },
      error: error => {
        console.log(error);
        this.services.toastrService.error("Check your inputs");
      }
    }
  )
}

}
