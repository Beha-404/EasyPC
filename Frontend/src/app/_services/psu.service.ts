import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { PSU } from '../_models/PSU';

@Injectable({
  providedIn: 'root'
})
export class PSUService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";
  
  getItems(){
    return this.http.get<PSU[]>(this.baseURL + "psu/all");
  }
}
