import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import { Processor } from '../_models/Processor';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<Processor[]>(this.baseURL + "processor/all", this.authHeaderService.getAuthHeaders());
  }
  getById(id: number) {
    return this.http.get<Processor>(this.baseURL + 'processor/id/' + id, this.authHeaderService.getAuthHeaders());
  }
  addItem(model: any) {
    return this.http.post<Processor>(this.baseURL + "processor/register", model, this.authHeaderService.getAuthHeaders());
  }

  deleteItem(name: string) {
    return this.http.delete<Processor>(this.baseURL + "processor/" + name, this.authHeaderService.getAuthHeaders());
  }
  updateItem(model: string, newModel: Processor) {
    return this.http.put<Processor>(this.baseURL + "processor/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }
}
