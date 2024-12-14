import { Component, inject, OnInit,signal} from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../_services/pruducts.service';
import { Products } from '../_models/Products';

@Component({
  selector: 'app-products',
  imports: [RouterModule, NavBarComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  items: any[] = [];
  model: any = {};
  newModel: any = {};
  products: Products;

  selectedAction = "";

  selectedComponent = signal<string>("");
  selectedType = signal<string>("");

  productsService = inject(ProductsService);

  getComponents() {
    this.productsService.getItems().subscribe({
      next: (output) => {
        this.products = output as Products;
      }
    })
  }

  ngOnInit(): void {
    this.getComponents();
  }

  onActionSelectChanged(event: Event) {
    this.selectedAction=(event.target as HTMLSelectElement).value;
    console.log("Selected action:", this.selectedAction);
    switch (this.selectedAction) {
      case "GET":
        break;
      case "ADD":
        break;
      case "UPDATE":
        break;
    }
  }

  onComponentTypeChange(event: Event) {
    this.selectedComponent.set((event.target as HTMLSelectElement).value);
    this.selectedAction="GET";

    console.log("Selected component:", this.selectedComponent());
    console.log("Selected action:", this.selectedAction);

    switch (this.selectedComponent()) {
      case "CPU":
        this.items = this.products.processors;
        this.selectedType.set("CPU");
        break;
      case "GPU":
        this.items = this.products.graphicsCards;
        this.selectedType.set("GPU");
        break;
      case "Power supply":
        this.items = this.products.psUs;
        this.selectedType.set("PSU");
        break;
      case "Case":
        this.items = this.products.cases;
        this.selectedType.set("Case");
        break;
      case "RAM":
        this.items = this.products.raMs;
        this.selectedType.set("RAM");
        break;
      case "Motherboard":
        this.items = this.products.motherBoards;
        this.selectedType.set("MotherBoard");
        break;
    }
  }

  setModel(model: any) {
    this.newModel = model;
  }

  closeForm() {
    this.selectedAction="GET";
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

  // addProduct(type:string) {
  //   this.productsService.addItem(type,this.newModel).subscribe({
  //     next: () => {
  //       this.selectedAction.set("GET");
  //       this.selectedAction.set("ADD");
  //     },
  //     error: (error:Error) => {
  //       alert(JSON.stringify(error))
  //     }
  //   })
  // }

  deleteProduct(type:string,name: string):void {
    this.productsService.deleteItem(type,name).subscribe({
      next:() => {
        this.items = this.items.filter(item => item.name !== name);
        
      },
      error: (err) => {
        alert(JSON.stringify(err.error))
      }
    })
  }

  // updateProduct(name: string) {
  //   this.selectedAction.set("UPDATE");
  //   this.productsService.updateItem(name, this.newModel).subscribe({
  //     next: () => {
  //       this.model.name = this.newModel.name;
  //     },
  //     error: (err:Error) => {
  //       alert(JSON.stringify(err))
  //     }
  //   })}
  
}


