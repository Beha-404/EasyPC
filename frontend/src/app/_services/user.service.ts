import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private http = inject(HttpClient);
    baseURL = "http://localhost:5132/api/";
    currentUser = signal<User | null>(null);
  
    deleteUser(name:any){
      this.http.delete<User>(this.baseURL+'users/'+name)
    }
}
