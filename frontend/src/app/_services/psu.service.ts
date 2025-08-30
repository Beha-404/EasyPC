import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { PSU } from '../_models/PSU';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class PSUService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<PSU[]>(this.baseURL + "psu/all", this.authHeaderService.getAuthHeaders());
  }
  
  getById(id: number) {
    return this.http.get<PSU>(this.baseURL + 'psu/id/' + id, this.authHeaderService.getAuthHeaders());
  }

  addItem(model: any) {
    return this.http.post<PSU>(this.baseURL + "psu/register", model, this.authHeaderService.getAuthHeaders());
  }

  deleteItem(name: string) {
    return this.http.delete<PSU>(this.baseURL + "psu/" + name, this.authHeaderService.getAuthHeaders());
  }
  
  updateItem(model: string, newModel: PSU) {
    return this.http.put<PSU>(this.baseURL + "psu/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }
}
