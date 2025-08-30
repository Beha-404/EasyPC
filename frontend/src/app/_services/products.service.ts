import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../_models/Products';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  url = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<Products>(`${this.url}products/all`, this.authHeaderService.getAuthHeaders());
  }
  deleteItem(type: string, id: number) {
    return this.http.delete(this.url + "products/" + type + "/" + id, this.authHeaderService.getAuthHeaders());
  }
  addItem(type: string, model: any) {
    return this.http.post(this.url + "products/" + type + "/add", model, this.authHeaderService.getAuthHeaders());
  }
  updateItem(type: string, name: string) {
    return this.http.put(this.url + type, name, this.authHeaderService.getAuthHeaders());
  }
}
