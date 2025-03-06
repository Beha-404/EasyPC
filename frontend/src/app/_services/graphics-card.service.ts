import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GraphicsCard } from '../_models/GraphicsCard';

@Injectable({
  providedIn: 'root'
})
export class GraphicsCardService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<GraphicsCard[]>(this.baseURL + "graphicscard/all");
  }
  getById(id: number) {
    return this.http.get<GraphicsCard>(this.baseURL + 'graphicscard/id/' + id);
  }

  addItem(model: any) {
    return this.http.post<GraphicsCard>(this.baseURL + "graphicscard/register", model);
  }

  deleteItem(name: string) {
    return this.http.delete<GraphicsCard>(this.baseURL + "graphicscard/" + name);
  }
  updateItem(model: string, newModel: GraphicsCard) {
    return this.http.put<GraphicsCard>(this.baseURL + "graphicscard/" + model, newModel)
  }
}
