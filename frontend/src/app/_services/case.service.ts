import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import { Case } from '../_models/Case';
import { UrlCodec } from '@angular/common/upgrade';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<Case[]>(this.baseURL + "case/all");
  }
  getById(id: number) {
    return this.http.get<Case>(this.baseURL + 'case/id/' + id);
  }

  addItem(model: Case) {
    return this.http.post<Case>(this.baseURL + "case/register", model);
  }
  deleteItem(name: string) {
    return this.http.delete<Case>(this.baseURL + "case/" + name);
  }
  updateItem(model: string, newModel: Case) {
    return this.http.put<Case>(this.baseURL + "case/" + model, newModel)
  }
}
