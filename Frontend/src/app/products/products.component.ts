import { Component, inject, OnInit, signal } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../_services/pruducts.service';
import { Products } from '../_models/Products';
import { ProcessorService } from '../_services/processor.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { PSUService } from '../_services/psu.service';
import { GraphicsCardService } from '../_services/graphics-card.service';
import { CaseService } from '../_services/case.service';
import { ServicesContainerService } from '../_services/services-container.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule, NavBarComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private services:ServicesContainerService){}

  items: any[] = [];
  model: any = {};
  newModel: any = {};
  products: Products;

  selectedAction = "GET";
  selectedType = signal<string>("");

  private modelTemplate = {
    name: "",
    price: "",
    socket: "",
    threadCount: "",
    coreCount: "",
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

  addProduct() {
    switch (this.selectedType()) {
      case "CPU":
        this.newModel.type = this.selectedType();
        this.services.processorService.addItem(this.newModel).subscribe({
          next: (res) => {
            this.items.push(res);
            this.services.toastrService.success("Success");
          },
          error: (err) => {
            this.services.toastrService.error(JSON.stringify(err.error));
          }
        })
        break;
      case "GPU":
        this.newModel.type = this.selectedType();
        this.services.graphicsCardService.addItem(this.newModel).subscribe({
          next: () => {
            this.services.toastrService.success("Success");
          },
          error: (err) => {
            this.services.toastrService.error(JSON.stringify(err.error));
          }
        });
        break;
      case "PSU":
        this.newModel.type = this.selectedType();
        this.services.psuService.addItem(this.newModel).subscribe({
          next: () => {
            this.services.toastrService.success("Success");
          },
          error: (err) => {
            this.services.toastrService.error(JSON.stringify(err.error));
          }
        });
        break;
    }
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