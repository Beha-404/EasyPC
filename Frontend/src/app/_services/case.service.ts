import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Case } from '../_models/Case';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";

  getItems()
  {
    return this.http.get<Case[]>(this.baseURL + "case/all");
  }
}
