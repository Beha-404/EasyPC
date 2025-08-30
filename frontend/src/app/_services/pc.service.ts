import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PC } from '../_models/Pc';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class PcService {

  private authHeaderService = inject(AuthHeaderService);
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  constructor() { }

  getAll() {
    return this.http.get<PC[]>(this.baseURL + "pc/all", this.authHeaderService.getAuthHeaders());
  }
  getById(id: number) {
    return this.http.get<PC>(this.baseURL + "pc/id/" + id, this.authHeaderService.getAuthHeaders());
  }
  addItem(model: any) {
    return this.http.post<PC>(this.baseURL + "pc/register", model, this.authHeaderService.getAuthHeaders());
  }
  deleteItem(id: number) {
    return this.http.delete<PC>(this.baseURL + "pc/" + id, this.authHeaderService.getAuthHeaders());
  }  
  
  updateItem(model: string, newModel: PC) {
    return this.http.put<PC>(this.baseURL + "pc/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }
}
