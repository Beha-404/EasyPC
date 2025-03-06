import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProcessorService } from './processor.service';
import { GraphicsCardService } from './graphics-card.service';
import { RAMService } from './ram.service';
import { PSUService } from './psu.service';
import { CaseService } from './case.service';
import { MotherBoardService } from './mother-board.service';
import { ProductsService } from './products.service';
import { PcService } from './pc.service';
import { OrderService } from './order.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesContainerService {

  constructor(
    public accountService:AccountService,
    public toastrService:ToastrService,
    public httpService:HttpClient,
    public routerService:Router,
    public processorService:ProcessorService,
    public graphicsCardService:GraphicsCardService,
    public ramService:RAMService,
    public psuService:PSUService,
    public caseService:CaseService,
    public motherBoardService:MotherBoardService,
    public productsService:ProductsService,
    public pcService:PcService,
    public orderService:OrderService,
    public userService:UserService
  ) { }
}
