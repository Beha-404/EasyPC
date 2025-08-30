import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../_models/User';
import { AuthHeaderService } from './auth-header.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getUserById(id: number) {
    return this.http.get<User>(this.baseURL + 'users/id/' + id, this.authHeaderService.getAuthHeaders());
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(this.baseURL + 'users/' + username, this.authHeaderService.getAuthHeaders());
  }

  deleteUser(name: any) {
    return this.http.delete<User>(this.baseURL + 'users/' + name, this.authHeaderService.getAuthHeaders());
  }

  updateUser(name: any, data: any) {
    return this.http.put<User>(this.baseURL + 'users/' + name, data, this.authHeaderService.getAuthHeaders());
  }



}
