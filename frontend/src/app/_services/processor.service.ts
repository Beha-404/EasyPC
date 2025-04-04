import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import { Processor } from '../_models/Processor';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<Processor[]>(this.baseURL + "processor/all");
  }
  getById(id: number) {
    return this.http.get<Processor>(this.baseURL + 'processor/id/' + id);
  }
  addItem(model: any) {
    return this.http.post<Processor>(this.baseURL + "processor/register", model);
  }

  deleteItem(name: string) {
    return this.http.delete<Processor>(this.baseURL + "processor/" + name)
  }
  updateItem(model: string, newModel: Processor) {
    return this.http.put<Processor>(this.baseURL + "processor/" + model, newModel)
  }
}
