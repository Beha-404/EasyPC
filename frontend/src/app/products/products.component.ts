import { Component, inject, OnInit, signal } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Products } from '../_models/Products';
import { ServicesContainerService } from '../_services/services-container.service';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterModule,
    NavBarComponent,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,    
    MatCardModule,    
    MatIconModule,
    MatRadioModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(
    private services: ServicesContainerService,
    private fb:FormBuilder
  ) { }

  items: any | null = null;
  model: any = {};
  newModel: any = {};
  products: Products | null = null;
  pcs:any;
  pcForm!:FormGroup;
  
  selectedAction = "GET";
  selectedType = signal<string>("");

  private modelTemplate = {
    name: "",
    price: "",
    type: ""
  }

  ngOnInit(): void {
    this.getComponents();
    this.getPCs();
    this.createPcForm();
  }

  createPcForm() {
    this.pcForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      processorId: ['', Validators.required],
      ramId: ['', Validators.required],
      graphicsCardId: ['', Validators.required],
      caseId: ['', Validators.required],
      motherBoardId: ['', Validators.required],
      psuId: ['', Validators.required]
    });
  }

  getPCs() {
    this.services.pcService.getAll().subscribe({
      next: (res) => {
        this.pcs = res;
       // console.log(this.pcs);
      }
    })
  }

  getComponents() {
    this.services.productsService.getItems().subscribe({
      next: (output) => {
        this.products = output;
       // console.log("Proizvodi: ",this.products);
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
      "CPU": this.products?.processors,
      "GPU": this.products?.graphicsCards,
      "PSU": this.products?.psUs,
      "RAM": this.products?.raMs,
      "CASE": this.products?.cases,
      "MOTHERBOARD": this.products?.motherBoards,
      "PC": this.pcs
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

  deleteProduct(type: string, id: number): void {
    this.services.productsService.deleteItem(type, id).subscribe({
      next: () => {
        this.items = this.items.filter((item:any) => item.id !== id);
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
      "MOTHERBOARD": this.services.motherBoardService,
      "PC": this.services.pcService
    };

    const selectedType = this.selectedType() as keyof typeof servicesMap;
    const selectedService = servicesMap[selectedType];
    
    if (selectedService) {
      this.newModel.type = selectedType;
      if(this.selectedType() == 'PC')
          this.newModel.price = 0;
        
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
      "MOTHERBOARD": this.services.motherBoardService,
      "PC": this.services.pcService
    }

    const selectedService = serviceMap[this.selectedType()];

    selectedService.updateItem(name, this.newModel).subscribe({
      next: () => {
       this.services.toastrService.success("Product updated");
       this.model.name = this.newModel.name;
      },
    })
  


  }
}
