import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Orders } from '../_models/Orders';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private authHeaderService = inject(AuthHeaderService);
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  constructor() { }

  getAll() {
    return this.http.get<Orders[]>(this.baseURL + "order/all", this.authHeaderService.getAuthHeaders());
  }

  getByUserId(id: number) {
    return this.http.get<Orders[]>(this.baseURL + "order/user/id/" + id, this.authHeaderService.getAuthHeaders());
  }

  getByOrderId(id: number) {
    return this.http.get<Orders[]>(this.baseURL + "order/id/" + id, this.authHeaderService.getAuthHeaders());
  }

  addItem(model: any) {
    return this.http.post<Orders>(this.baseURL + "order/register", model, this.authHeaderService.getAuthHeaders());
  }
  requestOrder(id:number) {
    return this.http.put<Orders>(this.baseURL + "order/request/"+ id,id, this.authHeaderService.getAuthHeaders());
  }
  acceptOrder(id:number) {
    return this.http.put<Orders>(this.baseURL + "order/accept/"+ id,id, this.authHeaderService.getAuthHeaders());
  }
}
