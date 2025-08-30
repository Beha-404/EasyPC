import { inject, Injectable } from '@angular/core';
import { RAM } from '../_models/RAM';
import { HttpClient } from '@angular/common/http';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class RAMService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<RAM[]>(this.baseURL + "ram/all", this.authHeaderService.getAuthHeaders());
  }
  
  getById(id: number) {
    return this.http.get<RAM>(this.baseURL + 'ram/id/' + id, this.authHeaderService.getAuthHeaders());
  }

  addItem(model: any) {
    return this.http.post<RAM>(this.baseURL + "ram/register", model, this.authHeaderService.getAuthHeaders());
  }

  deleteItem(name: string) {
    return this.http.delete<RAM>(this.baseURL + "ram/" + name, this.authHeaderService.getAuthHeaders());
  }

  updateItem(model: string, newModel: RAM) {
    return this.http.put<RAM>(this.baseURL + "ram/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }

}
