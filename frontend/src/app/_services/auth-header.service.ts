import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderService {
  getAuthHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  }
}
