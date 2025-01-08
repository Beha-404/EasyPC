import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 http = inject(HttpClient);
  accountService = inject(AccountService);
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get('http://localhost:5132/api/users').subscribe(
      {
        next: respoonse => this.users = respoonse
      }
    )
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
