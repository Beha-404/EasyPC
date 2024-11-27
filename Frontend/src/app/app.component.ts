
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  http = inject(HttpClient);
  private accountService = inject(AccountService);
  title = 'EasyPC';
  users:any;

  ngOnInit(): void {
    this.getUsers()
    this.setCurrentUser();
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

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
