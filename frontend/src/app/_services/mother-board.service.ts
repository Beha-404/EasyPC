import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MotherBoard } from '../_models/MotherBoard';
import { AuthHeaderService } from './auth-header.service';

@Injectable({
  providedIn: 'root'
})
export class MotherBoardService {
  private http = inject(HttpClient);
  private authHeaderService = inject(AuthHeaderService);
  baseURL = "http://localhost:5132/api/";

  getItems() {
    return this.http.get<MotherBoard[]>(this.baseURL + "motherboard/all", this.authHeaderService.getAuthHeaders());
  }
  getById(id: number) {
    return this.http.get<MotherBoard>(this.baseURL + 'motherboard/id/' + id, this.authHeaderService.getAuthHeaders());
  }
  addItem(model: any) {
    return this.http.post<MotherBoard>(this.baseURL + "motherboard/register", model, this.authHeaderService.getAuthHeaders());
  }

  deleteItem(name: string) {
    return this.http.delete<MotherBoard>(this.baseURL + "motherboard/" + name, this.authHeaderService.getAuthHeaders());
  }
  updateItem(model: string, newModel: MotherBoard) {
    return this.http.put<MotherBoard>(this.baseURL + "motherboard/" + model, newModel, this.authHeaderService.getAuthHeaders());
  }
}
