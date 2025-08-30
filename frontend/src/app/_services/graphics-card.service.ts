import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GraphicsCard } from '../_models/GraphicsCard';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class GraphicsCardService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<GraphicsCard[]>(this.baseURL + "graphicscard/all", this.authHeaderService.getAuthHeaders());
  }
  getById(id: number) {
    return this.http.get<GraphicsCard>(this.baseURL + 'graphicscard/id/' + id, this.authHeaderService.getAuthHeaders());
  }

  addItem(model: any) {
    return this.http.post<GraphicsCard>(this.baseURL + "graphicscard/register", model, this.authHeaderService.getAuthHeaders());
  }

  deleteItem(name: string) {
    return this.http.delete<GraphicsCard>(this.baseURL + "graphicscard/" + name, this.authHeaderService.getAuthHeaders());
  }
  updateItem(model: string, newModel: GraphicsCard) {
    return this.http.put<GraphicsCard>(this.baseURL + "graphicscard/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }
}
