import { Component, inject, OnInit, signal } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../_models/Products';
import { ServicesContainerService } from '../_services/services-container.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  imports: [RouterModule, NavBarComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export  class ProductsComponent implements OnInit {

  constructor(private services: ServicesContainerService) { }

  items: any[] = [];
  model: any = {};
  newModel: any = {};
  products: Products = {
    processors: [],
    graphicsCards: [],
    psUs: [],
    raMs: [],
    cases: [],
    motherBoards: []
  };
  
  selectedAction = "GET";
  selectedType = signal<string>("");

  private modelTemplate = {
    name: "",
    price: "",
    type: ""
  }

  ngOnInit(): void {
    this.getComponents();
  }

  getComponents() {
    this.services.productsService.getItems().subscribe({
      next: (output) => {
        this.products = output as Products;
      }
    })
  }

  onActionChange(event: Event) {
    this.selectedAction = (event.target as HTMLSelectElement).value;
    switch (this.selectedAction) {
      case "GET":
        break;
      case "ADD":
        this.resetModel();
        break;
      case "UPDATE":
        this.resetModel();
        break;
    }
  }

  onTypeChange(event: Event) {
    this.selectedType.set((event.target as HTMLSelectElement).value);

    const typeMapping = {
      "CPU": this.products.processors,
      "GPU": this.products.graphicsCards,
      "PSU": this.products.psUs,
      "RAM": this.products.raMs,
      "CASE": this.products.cases,
      "MOTHERBOARD": this.products.motherBoards
    }
    this.items = typeMapping[this.selectedType().toUpperCase() as keyof typeof typeMapping] || [];
    this.selectedAction = "GET";
  }

  setModel(model: any) {
    this.newModel = model;
  }

  resetModel() {
    this.newModel = { ...this.modelTemplate, type: this.selectedType() };
  }

  closeForm() {
    this.selectedAction = "GET";
  }

 

  deleteProduct(type: string, name: string): void {
    this.services.productsService.deleteItem(type, name).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.name !== name);
        this.getComponents();
        this.selectedAction = "";
        this.selectedAction = "GET";
      },
      error: (err) => {
        this.services.toastrService.error(JSON.stringify(err.error));
      }
    })
  }

  addProduct() {
    type ServiceType = {
      addItem: (model: any) => Observable<any>;
    };

    const servicesMap: Record<string, ServiceType> = {
      "CPU": this.services.processorService,
      "PSU": this.services.psuService,
      "GPU": this.services.graphicsCardService,
      "CASE": this.services.caseService,
      "RAM": this.services.ramService,
      "MOTHERBOARD": this.services.motherBoardService
    };
    const selectedType = this.selectedType() as keyof typeof servicesMap;
    const selectedService = servicesMap[selectedType];

    if (selectedService) {
      console.log(this.newModel);

      this.newModel.type = selectedType;
      selectedService.addItem(this.newModel).subscribe({
        next: (res: any) => {
          this.items.push(res);
          this.services.toastrService.success("Success");
        },
        error: (err: any) => {
          this.services.toastrService.error(JSON.stringify(err.error));
        }
      });
    }
  }
  updateProduct(name: string) {
    this.selectedAction = "UPDATE";

    type SelectedService = {
      updateItem:(name:string,model:any) => Observable<any>;
    }

    const serviceMap:Record<string,SelectedService> = {
      "CPU": this.services.processorService,
      "PSU": this.services.psuService,
      "GPU": this.services.graphicsCardService,
      "CASE": this.services.caseService,
      "RAM": this.services.ramService,
      "MOTHERBOARD": this.services.motherBoardService
    }

    const selectedService = serviceMap[this.selectedType()];

    selectedService.updateItem(name, this.newModel).subscribe({
      next: () => {
       this.services.toastrService.success("Product updated");
       this.model.name = this.newModel.name;
      },
      error: (err: Error) => {
        alert(JSON.stringify(err))
      }
    })
  }
}
