import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { PSU } from '../_models/PSU';

@Injectable({
  providedIn: 'root'
})
export class PSUService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<PSU[]>(this.baseURL + "psu/all");
  }
  getById(id: number) {
    return this.http.get<PSU>(this.baseURL + 'psu/id/' + id);
  }
  addItem(model: any) {
    return this.http.post<PSU>(this.baseURL + "psu/register", model);
  }
  deleteItem(name: string) {
    return this.http.delete<PSU>(this.baseURL + "psu/" + name)
  }
  updateItem(model: string, newModel: PSU) {
    return this.http.put<PSU>(this.baseURL + "psu/" + model, newModel)
  }
}
