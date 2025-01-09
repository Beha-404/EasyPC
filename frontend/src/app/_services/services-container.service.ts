import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicesContainerService {

  constructor(
    public accountService:AccountService,
    public toastrService:ToastrService,
    public httpService:HttpClient,
    public routerService:Router
  ) { }
}
