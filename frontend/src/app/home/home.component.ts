import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router, RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgIf, NgFor, CommonModule, LowerCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Products } from '../_models/Products';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ServicesContainerService } from '../_services/services-container.service';
import { forkJoin, map, Observable } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatSlideToggleModule,NgxPaginationModule, MatPaginatorModule, CommonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatAutocompleteModule, MatSelectModule, MatSliderModule, MatIconModule, RouterModule, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {


  currentPage:number = 1;
  itemsPerPage:number = 3;
  pcs: any;
  filteredPCs: any;
  selectedPC: any;
  localPC: any
  customPCForm!: FormGroup
  users: any;
  userData: any;
  isCardDetailsFormVisible: boolean = false;
  isSearchFormVisible: boolean = false;
  baseUrl = "http://localhost:5271/api/";
  products: Products | null = null;
  minBudget: number = 0;
  maxBudget: number = 5000;

  categoryOptions: string[] = ["Any","Gaming PC", "Streaming PC", "Work PC"];
  selectedCategory: string | null = null;

  cpuOptions: string[] = ['Any','Intel', 'AMD'];
  selectedCPU: string | null = null;

  gpuOptions: string[] = ['Any','Intel', 'AMD', 'Nvidia'];
  selectedGPU: string | null = null;

  motherBoardOptions: string[] = ['Any','Gigabyte', 'Asus', 'Asrock', 'MSI'];
  selectedMotherBoard: string | null = null;

  ramOptions: string[] = ['Any','8GB', '16GB', '32GB'];
  selectedRam: string | null = null;

  psuOptions: string[] = ['Any','500W', '700W', '1000W'];
  selectedPsu: string | null = null;

  caseOptions: string[] = ['Any',"ATX", "Mini ATX"];
  selectedCase: string | null = null;


  registerMode = false;
  randomImages: [] = [];

  constructor(
    public router: Router,
    public services: ServicesContainerService,
    public fb: FormBuilder
  ) {
    this.userData = this.services.accountService.currentUser();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getPCs();
    this.createPcForm();
  }
  filterPCs() {
    
    this.filteredPCs = this.pcs.filter((pc: any) => {

      let matches = true;

      if (this.selectedRam && this.selectedRam != 'Any') {
        matches = matches && pc.ram?.name.toLowerCase().includes(this.selectedRam.toLowerCase())
      }

      if (this.selectedCPU && this.selectedCPU != 'Any') {
        matches = matches && pc.processor?.name.toLowerCase().includes(this.selectedCPU.toLowerCase())
      }

      if (this.selectedCase && this.selectedCase != 'Any') {
        matches = matches && pc.case?.name.toLowerCase().includes(this.selectedCase.toLowerCase())
      }

      if (this.selectedCategory && this.selectedCategory != 'Any') {
        matches = matches && pc.name?.toLowerCase().includes(this.selectedCategory.toLowerCase())
      }

      if (this.selectedGPU && this.selectedGPU != 'Any') {
        matches = matches && pc.graphicsCard?.name.toLowerCase().includes(this.selectedGPU.toLowerCase())
      }

      if (this.selectedPsu && this.selectedPsu != 'Any') {
        matches = matches && pc.psu?.name.toLowerCase().includes(this.selectedPsu.toLowerCase())
      }

      if (this.selectedMotherBoard && this.selectedMotherBoard != 'Any') {
        matches = matches && pc.motherBoard?.name.toLowerCase().includes(this.selectedMotherBoard.toLowerCase())
      }
      
      return matches;
    })
  }

  onSliderChange() {

    this.filteredPCs = this.pcs.filter((pc: any) => {
      return pc.price >= this.minBudget && pc.price <= this.maxBudget
    });
  }

  createPcForm() {
    this.customPCForm = this.fb.group({
      processor: ['', Validators.required],
      ram: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      case: ['', Validators.required],
      motherBoard: ['', Validators.required],
      psu: ['', Validators.required],
      name: ['CustomPC'],
      price: [0],
    });
  }


  getPCs() {
    this.services.pcService.getAll().subscribe({
      next: (res) => {
        this.pcs = res;
        this.filteredPCs = res;
      }
    })
  }

  getProducts() {
    this.services.productsService.getItems().subscribe({
      next: (res) => {
        this.products = res;
      }
    })
  }

  resetForm() {
    this.selectedCPU = '';
    this.selectedGPU = '';
    this.selectedCase = '';
    this.selectedMotherBoard = '';
    this.selectedRam = '';
    this.selectedPsu = '';
    this.selectedCategory = '';

    this.minBudget = 0;
    this.maxBudget = 5000;

    this.filteredPCs = this.pcs;
  }

  resetCustomPCForm() {
    this.customPCForm.reset();
  }

  addToCartRegularPC(pc: any) {
    const pcData = pc
    this.addNewOrder(pcData);
  }

  addNewOrder(pcData: any) {
    const description =
      `
        <strong> Processor:  </strong> ${pcData.processor.name} <br>
        <strong> Graphics Card:  </strong>${pcData.graphicsCard.name} <br>
        <strong> RAM:  </strong> ${pcData.ram.name} <br>
        <strong> Motherboard:  </strong> ${pcData.motherBoard.name} <br>
        <strong> Case: </strong> ${pcData.case.name} <br>
        <strong> Power Supply:  </strong> ${pcData.psu.name} <br>

        `

    const orderData = {
      userId: this.services.accountService.currentUser()?.id,
      status: "Waiting",
      total: pcData.price,
      details: description,
      date: new Date().toISOString()
    };
    this.services.orderService.addItem(orderData).subscribe({
      next: () => {
        this.services.toastrService.success("Success");
        this.closeCardDetailsForm();
      }
    });
  }


  addToCartCustomPC() {
    if (this.customPCForm.valid) {
      const pcData = this.customPCForm.value;
      this.addCustomNewOrder(pcData);
    }
  }

  addCustomNewOrder(pcData: any) {

    const description =
      `
          <strong> Processor:  </strong> ${pcData.processor.name} <br>
          <strong> Graphics Card:  </strong>${pcData.graphicsCard.name} <br>
          <strong> RAM:  </strong> ${pcData.ram.name} <br>
          <strong> Motherboard:  </strong> ${pcData.motherBoard.name} <br>
          <strong> Case: </strong> ${pcData.case.name} <br>
          <strong> Power Supply:  </strong> ${pcData.psu.name} <br>

          `

    const totalPrice =
      Number(pcData.processor?.price) +
      Number(pcData.graphicsCard?.price) +
      Number(pcData.ram?.price) +
      Number(pcData.motherBoard?.price) +
      Number(pcData.case?.price) +
      Number(pcData.psu?.price);

    const orderData = {
      userId: this.services.accountService.currentUser()?.id,
      status: "Waiting",
      total: totalPrice,
      details: description,
      date: new Date().toISOString()
    };
    this.services.orderService.addItem(orderData).subscribe({
      next: () => {
        this.services.toastrService.success("Success");
        this.closeSearchForm();
      }
    });
  }

  deletePC(pcId: number) {
    this.services.pcService.deleteItem(pcId).subscribe({
      next: () => { }
    })
  }
  getPCInfo(pcId: number): Observable<any> {
    return this.services.pcService.getById(pcId);
  }

  openCardDetailsForm(pcId: number): void {
    this.services.pcService.getById(pcId).subscribe({
      next: (res) => {
        forkJoin({
          processor: this.services.processorService.getById(res.processorId),
          case: this.services.caseService.getById(res.caseId),
          ram: this.services.ramService.getById(res.ramId),
          graphicsCard: this.services.graphicsCardService.getById(res.graphicsCardId),
          motherBoard: this.services.motherBoardService.getById(res.motherBoardId),
          psu: this.services.psuService.getById(res.psuId),
        }).subscribe(components => {
          this.selectedPC = {
            price: res.price,
            processor: components.processor.name,
            case: components.case.name,
            graphicsCard: components.graphicsCard.name,
            motherBoard: components.motherBoard.name,
            ram: components.ram.name,
            psu: components.psu.name,
            name: res.name,
            available: res.available
          }
        });
      }
    });
    this.isCardDetailsFormVisible = true;
  }

  closeCardDetailsForm(): void {
    this.isCardDetailsFormVisible = false;
  }

  openSearchForm(): void {
    this.isSearchFormVisible = true;
  }

  closeSearchForm(): void {
    this.isSearchFormVisible = false;
  }

}


