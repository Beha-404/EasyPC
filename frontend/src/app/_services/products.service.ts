import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../_models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  url = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<Products>(`${this.url}products/all`);
  }
  deleteItem(type: string, id: number) {
    return this.http.delete(this.url + "products/" + type + "/" + id);
  }
  addItem(type: string, model: any) {
    return this.http.post(this.url + "products/" + type + "/add", model);
  }
  updateItem(type: string, name: string) {
    return this.http.put(this.url + type, name);
  }
}
