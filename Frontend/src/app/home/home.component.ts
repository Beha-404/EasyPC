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
import {AsyncPipe, NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Products } from '../_models/Products';

@Component({
  selector: 'app-home',
  imports: [NgIf, MatSlideToggleModule, MatInputModule,FormsModule, ReactiveFormsModule, MatButtonModule, AsyncPipe, MatAutocompleteModule, MatSelectModule, MatSliderModule, MatIconModule, NavBarComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  users:any;
  selectedCpuManufacturer: string = ''; 
  sanitizer = inject(DomSanitizer);
  dynamicHtml: SafeHtml;
  
  productsURL = "http://localhost:5271/api/products/all";

//za autocomplete
cpuAutoControl = new FormControl('');
gpuAutoControl = new FormControl('');
caseAutoControl = new FormControl('');
cpuoptions: string[] = ['Intel', 'AMD'];
gpuoptions: string[] = ['Intel', 'AMD', 'Nvidia'];
caseoptions: string[] = ['Lian Li Lancool 207', 'Phanteks XT Pro Ultra'];
filteredCPUOptions: Observable<string[]>;
filteredGPUOptions: Observable<string[]>
filteredCaseOptions: Observable<string[]>
  registerMode = false;


  ngOnInit(): void {
    this.getUsers();
    //this.setDynamicHtml();
    //this.setParameters();


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

  getProducts(){
    const productString = localStorage.getItem('cases');

    if(productString){
      const productObject = JSON.parse(productString);
      return productObject;
    }
  }
/*
  setParameters(){
    return this.http.get(this.productsURL + this.getProducts().name).subscribe({
      next: (newProduct) =>{
        this.product = newProduct as Product;
        console.log(this.product);
      }
    });
  }
*/


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
        error: error => console.log(error),
        complete: () => console.log("Request has completed")
      }
    );
}

//za autocomplete
private _cpufilter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.cpuoptions.filter(cpuoption => cpuoption.toLowerCase().includes(filterValue));
}
//za autocomplete
private _gpufilter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.gpuoptions.filter(gpuoption => gpuoption.toLowerCase().includes(filterValue));
}
private _casefilter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.caseoptions.filter(caseoption => caseoption.toLowerCase().includes(filterValue));
}
/*
setDynamicHtml(): void {
  const htmlContent = `
    <h2 style="color: #ffcc00;">Welcome to EasyPC!</h2>
    <p>Build and customize the PC of your dreams, tailored to your needs.</p>
    <ul>
      <li>Choose from a variety of CPUs, GPUs, and components.</li>
      <li>Set your budget and see compatible builds.</li>
      <li>Get real-time suggestions for your configuration.</li>
    </ul>
  `;
  this.dynamicHtml = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
}
*/

}
