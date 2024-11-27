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

  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.setCurrentUser();
  }
  
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
