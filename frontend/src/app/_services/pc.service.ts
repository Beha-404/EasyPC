import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PC } from '../_models/Pc';

@Injectable({
  providedIn: 'root'
})
export class PcService {

  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  constructor() { }

  getAll() {
    return this.http.get<PC[]>(this.baseURL + "pc/all");
  }
  getById(id: number) {
    return this.http.get<PC>(this.baseURL + "pc/id/" + id);
  }
  addItem(model: any) {
    return this.http.post<PC>(this.baseURL + "pc/register", model);
  }
  deleteItem(id: number) {
    return this.http.delete<PC>(this.baseURL + "pc/" + id);
  }  
  
  updateItem(model: string, newModel: PC) {
    return this.http.put<PC>(this.baseURL + "pc/" + model, newModel)
  }
}
