import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../_models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  url = "http://localhost:5271/api/";

  getItems(){
    return this.http.get<Products>(`${this.url}products/all`);
  }
  deleteItem(type:string,name:string){
   return this.http.delete(`${this.url}${type}/${name}`);
  }
  // addItem(type:string,model:any){
  //   return this.http.add(`${this.url}${type}/add`,model);
  // }
  // updateItem(type:string,model:any){
  //   return this.http.update(`${this.url}${type}/add`,model);
  // }
}
