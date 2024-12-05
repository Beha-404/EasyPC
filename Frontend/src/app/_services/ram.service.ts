import { inject, Injectable } from '@angular/core';
import { RAM } from '../_models/RAM';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RAMService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";
  
  getItems(){
    return this.http.get<RAM[]>(this.baseURL + "ram/all");
  }
}
