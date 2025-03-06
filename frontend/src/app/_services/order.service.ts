import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Orders } from '../_models/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  constructor() { }

  getAll() {
    return this.http.get<Orders[]>(this.baseURL + "order/all");
  }

  getByUserId(id: number) {
    return this.http.get<Orders[]>(this.baseURL + "order/user/id/" + id);
  }

  getByOrderId(id: number) {
    return this.http.get<Orders[]>(this.baseURL + "order/id/" + id);
  }

  addItem(model: any) {
    return this.http.post<Orders>(this.baseURL + "order/register", model);
  }
  requestOrder(id:number) {
    return this.http.put<Orders>(this.baseURL + "order/request/"+ id,id);
  }
  acceptOrder(id:number) {
    return this.http.put<Orders>(this.baseURL + "order/accept/"+ id,id);
  }
}
