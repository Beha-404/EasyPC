import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MotherBoard } from '../_models/MotherBoard';

@Injectable({
  providedIn: 'root'
})
export class MotherBoardService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";

  getItems()
  {
    return this.http.get<MotherBoard[]>(this.baseURL + "motherboard/all");
  }
}
