import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Processor } from '../_models/Processor';
import { FocusNext } from '@angular/cdk/menu';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  private http = inject(HttpClient);
  baseURL = "http://localhost:5271/api/";

  getItems()
  {
    return this.http.get<Processor[]>(this.baseURL + "processor/all");
  }
}
