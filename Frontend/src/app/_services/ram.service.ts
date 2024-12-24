import { inject, Injectable } from '@angular/core';
import { RAM } from '../_models/RAM';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RAMService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";

  getItems() {
    return this.http.get<RAM[]>(this.baseURL + "ram/all");
  }
  addItem(model: any) {
    return this.http.post<RAM>(this.baseURL + "ram/register", model);
  }
  deleteItem(name: string) {
    return this.http.delete<RAM>(this.baseURL + "ram/" + name)
  }
  updateItem(model:string,newModel:RAM){
        return this.http.put<RAM>(this.baseURL + "ram/"+ model,newModel)
      }
}
