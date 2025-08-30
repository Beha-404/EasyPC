import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import { Case } from '../_models/Case';
import { UrlCodec } from '@angular/common/upgrade';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<Case[]>(this.baseURL + "case/all", this.authHeaderService.getAuthHeaders());
  }
  getById(id: number) {
    return this.http.get<Case>(this.baseURL + 'case/id/' + id, this.authHeaderService.getAuthHeaders());
  }

  addItem(model: Case) {
    return this.http.post<Case>(this.baseURL + "case/register", model, this.authHeaderService.getAuthHeaders());
  }
  deleteItem(name: string) {
    return this.http.delete<Case>(this.baseURL + "case/" + name, this.authHeaderService.getAuthHeaders());
  }
  updateItem(model: string, newModel: Case) {
    return this.http.put<Case>(this.baseURL + "case/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }
}
