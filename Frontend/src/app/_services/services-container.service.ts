import { Injectable } from '@angular/core';
import { ProcessorService } from './processor.service';
import { MotherBoardService } from './mother-board.service';
import { CaseService } from './case.service';
import { GraphicsCard } from '../_models/GraphicsCard';
import { GraphicsCardService } from './graphics-card.service';
import { RAMService } from './ram.service';
import { PSUService } from './psu.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './pruducts.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesContainerService {

  constructor(
    public processorService:ProcessorService,
    public psuService:PSUService,
    public ramService:RAMService,
    public graphicsCardService:GraphicsCardService,
    public caseService:CaseService,
    public motherBoardService:MotherBoardService,
    public toastrService:ToastrService,
    public productsService:ProductsService
  ) {}
}
