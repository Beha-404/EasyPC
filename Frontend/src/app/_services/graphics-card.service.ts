import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GraphicsCard } from '../_models/GraphicsCard';

@Injectable({
  providedIn: 'root'
})
export class GraphicsCardService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";

  getItems() {
    return this.http.get<GraphicsCard[]>(this.baseURL + "graphicscard/all");
  }
  addItem(model: any) {
    return this.http.post<GraphicsCard>(this.baseURL + "graphicscard/register", model);
  }
}
