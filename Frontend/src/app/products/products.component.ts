import { Component, inject, OnInit, output } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { ProcessorService } from '../_services/processor.service';
import { CommonModule } from '@angular/common';
import { FormsModule, PristineChangeEvent } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [RouterModule, NavBarComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
closeForm() {
  this.selectedAction = "GET";
}

  items: any[] = [];
  model: any = {};
  newModel: any = {};

  selectedAction: string = "";
  selectedComponent: string = "";

  processorService = inject(ProcessorService);

  selectChanged(event: Event) {
    const selectedValue = ((event.target as HTMLSelectElement).value);

    switch (selectedValue) {
      case "GET":
        this.getProcessors();
        this.selectedAction = "GET";
        break;
      case "ADD":
        this.resetNewModel()
        this.selectedAction = "ADD";
        break;
      case "UPDATE":
        this.selectedAction = "UPDATE";
        break;
    }
  }

  resetNewModel() {
    this.newModel = {
      name: "",
      price: "",
      socket: "",
      threadCount: "",
      coreCount: ""
    }
  }

  onComponentTypeChange(event: Event) {
    switch ((event.target as HTMLSelectElement).value) {
      case "CPU":
        this.getProcessors();
        this.selectedComponent = "CPU";
        break;
      case "GPU":
        this.selectedComponent = "GPU";
        break;
      case "Power supply":
        this.selectedComponent = "Power supply";
        break;
      case "Case":
        this.selectedComponent = "Case";
        break;
      case "RAM":
        this.selectedComponent = "RAM";
        break;
      case "Motherboard":
        this.selectedComponent = "Motherboard";
        break;
      case "Storage":
        this.selectedComponent = "Storage";
        break;

    }
  }

  getProcessors() {
    this.processorService.getItems().subscribe({
      next: (output) => {
        this.items = output;
      }
    });
  }

  addProcessor() {
    this.processorService.addItem(this.newModel).subscribe({
      next: _ => {
        this.getProcessors();
        this.selectedAction = "GET";
        this.selectedAction = "ADD";
      },
      error: err => {
        alert(JSON.stringify(err.error))
      }
    })
  }

  deleteProcessor(name: string) {
    this.processorService.deleteItem(name).subscribe({
      next: _ => {
        this.getProcessors();
        this.selectedAction = "DELETE";
      },
      error: (err) => {
        alert(JSON.stringify(err.error))
      }
    })
  }

  updateProcessor(name: string) {
    this.selectedAction = "UPDATE"
    this.processorService.updateItem(name, this.newModel).subscribe({
      next: _ => {
        this.getProcessors();
        this.model.name = this.newModel.name;
      },
      error: (err) => {
        alert(JSON.stringify(err.error))
      }
    })
  }

  ngOnInit(): void {
    this.getProcessors();
  }
}
