import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { ProcessorService } from '../_services/processor.service';
import { Processor } from '../_models/Processor';
import { PSUService } from '../_services/psu.service';
import { RAMService } from '../_services/ram.service';
import { GraphicsCardService } from '../_services/graphics-card.service';
import { CaseService } from '../_services/case.service';
import { MotherBoardService } from '../_services/mother-board.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products',
  imports: [RouterModule, NavBarComponent,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  psuService = inject(PSUService);
  PSUs:any[]=[];

  processorService = inject(ProcessorService);
  processors:any[]=[];

  caseService = inject(CaseService);
  cases:any[]=[];

  ramService = inject(RAMService);
  RAMs:any[]=[];

  graphicsCardService = inject(GraphicsCardService);
  graphicsCards:any[]=[];

  motherBoardService = inject(MotherBoardService);
  motherBoards:any[]=[];

  getProcessors(){
    this.processorService.getItems().subscribe({
      next: (processors) =>{
        this.processors = processors;    
      }
    });
  }

  getCase(){
    this.caseService.getItems().subscribe({
      next: (cases) =>{
        this.cases = cases;    
      }
    });
  }

  getRAM(){
    this.ramService.getItems().subscribe({
      next: (RAMs) =>{
        this.RAMs = RAMs;    
      }
    });
  }

  getGraphicsCard(){
    this.graphicsCardService.getItems().subscribe({
      next: (graphics) =>{
        this.graphicsCards = graphics;    
      }
    });
  }
  
  getPSUs(){
    this.psuService.getItems().subscribe({
      next: (PSUs) =>{
        this.PSUs = PSUs;  
      }
    });
  }

  getMotherBoard() {
    this.motherBoardService.getItems().subscribe({
      next: (motherBoards) =>{
        this.motherBoards = motherBoards;  
      }
    });
  }

  ngOnInit(): void {
    this.getProcessors();
    this.getCase();
    this.getGraphicsCard();
    this.getMotherBoard();
    this.getPSUs();
  }
}
