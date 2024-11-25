import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  baseURL = 'https://localhost:5271/api/';

  login(model: any)
  {
    return this.http.post(this.baseURL + 'account/users',model);
  }

}