import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MotherBoard } from '../_models/MotherBoard';

@Injectable({
  providedIn: 'root'
})
export class MotherBoardService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<MotherBoard[]>(this.baseURL + "motherboard/all");
  }
  getById(id: number) {
    return this.http.get<MotherBoard>(this.baseURL + 'motherboard/id/' + id);
  }
  addItem(model: any) {
    return this.http.post<MotherBoard>(this.baseURL + "motherboard/register", model);
  }

  deleteItem(name: string) {
    return this.http.delete<MotherBoard>(this.baseURL + "motherboard/" + name);
  }
  updateItem(model: string, newModel: MotherBoard) {
    return this.http.put<MotherBoard>(this.baseURL + "motherboard/" + model, newModel)
  }
}
