import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SignatureKind } from 'typescript';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  URL = "http://localhost:5271/api/";

  

}
