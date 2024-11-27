import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatSlideToggleModule, MatButtonModule, MatIconModule, NavBarComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  users:any;


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.http.get("http://localhost:5271/api/users")
    .subscribe(
      {
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log("Request has completed")
      }
    );
}
}
