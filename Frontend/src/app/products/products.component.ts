import { Component, inject, OnInit, output } from '@angular/core';
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
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [RouterModule, NavBarComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  Output: any[] = [];
  model: any = {};
  selectedAction: string = "";

  processorService = inject(ProcessorService);
  processors: any[] = [];


  selectChanged(event: Event) {
    switch ((event.target as HTMLSelectElement).value) {
      case "GET":
        this.getProcessors();
        this.selectedAction = "GET";
        break;
      case "ADD":
        this.selectedAction = "ADD";
        break;
      case "DELETE":
        this.selectedAction = "DELETE";
        break;
      case "UPDATE":
        this.selectedAction = "UPDATE";
        break;
    }
  }

  getProcessors() {
    this.processorService.getItems().subscribe({
      next: (output) => {
        this.Output = output;
      }
    });
  }

  addProcessor() {
    this.processorService.postItem(this.model).subscribe({
      next: _ => {
        this.getProcessors();
        this.selectedAction = "GET";
      },
      error: err =>{
        alert(err.error)
      }
    })
  }

  deleteProcessor() {
    this.processorService.deleteItem(this.model.name).subscribe({
      next: _ => {
          this.getProcessors();
        this.selectedAction = "GET";
      },
      error: (err) => {
        alert(err.error)
      }
    })

  }

  ngOnInit(): void {
    this.getProcessors();
  }
}
