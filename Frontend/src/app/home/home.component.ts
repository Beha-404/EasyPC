import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe, NgIf, NgFor, NgOptimizedImage} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatSlideToggleModule, MatInputModule,FormsModule, ReactiveFormsModule, MatButtonModule, AsyncPipe, MatAutocompleteModule, MatSelectModule, MatSliderModule, MatIconModule, NavBarComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  users:any;
  selectedCpuManufacturer: string = ''; 
  sanitizer = inject(DomSanitizer);
  isCardDetailsFormVisible: boolean  = false;
  isSearchFormVisible: boolean  = false;
  baseUrl = "http://localhost:5271/api/";

//za autocomplete
cpuAutoControl = new FormControl('');
gpuAutoControl = new FormControl('');
caseAutoControl = new FormControl('');
cpuOptions: string[] = ['Intel', 'AMD'];
gpuOptions: string[] = ['Intel', 'AMD', 'Nvidia'];
caseOptions: string[] = [];
filteredCPUOptions: Observable<string[]>;
filteredGPUOptions: Observable<string[]>
filteredCaseOptions!: Observable<string[]>
  registerMode = false;

  ngOnInit(): void {
    this.getUsers();
    this.fetchCaseNames();


    //za autocomplete
    this.filteredCPUOptions = this.cpuAutoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._cpufilter(value || '')),
    );

    this.filteredGPUOptions = this.gpuAutoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._gpufilter(value || '')),
    );

    
    this.filteredCaseOptions = this.caseAutoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._casefilter(value || '')),
    );

    
    
  }

  
  fetchCaseNames(): void {
    this.http.get<any>( this.baseUrl + 'products/all').subscribe({
      next: (response) => {
        this.caseOptions = [];
        if (response.cases) {
          this.caseOptions = response.cases.map((c: any) => c.name);
        }
      },
      error: (err) => {
        console.error('Error fetching cases:', err);
      },
    });
  }

registerToggle(){
  this.registerMode = !this.registerMode;
}


cancelRegisterMode(event: boolean){
  this.registerMode = event;
}

  getUsers(){
    this.http.get("http://localhost:5271/api/users")
    .subscribe(
      {
        next: response => this.users = response,
        error: error => console.log(error)
      }
    );
}

//za autocomplete
private _cpufilter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.cpuOptions.filter(cpuOption => cpuOption.toLowerCase().includes(filterValue));
}
//za autocomplete
private _gpufilter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.gpuOptions.filter(gpuOption => gpuOption.toLowerCase().includes(filterValue));
}
private _casefilter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.caseOptions.filter(caseOption => caseOption.toLowerCase().includes(filterValue));
}

resetForm() {
  this.cpuAutoControl.reset();
  this.gpuAutoControl.reset();
  this.caseAutoControl.reset();
}


openCardDetailsForm(): void {
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
