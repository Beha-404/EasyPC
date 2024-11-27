import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-home',
  imports: [MatSlideToggleModule, MatInputModule,FormsModule, ReactiveFormsModule, MatButtonModule, AsyncPipe, MatAutocompleteModule, MatSelectModule, MatSliderModule, MatIconModule, NavBarComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  users:any;
  selectedCpuManufacturer: string = ''; 

  
//za autocomplete
cpuAutoControl = new FormControl('');
gpuAutoControl = new FormControl('');
cpuoptions: string[] = ['Intel', 'AMD'];
gpuoptions: string[] = ['Intel', 'AMD', 'Nvidia'];
filteredCPUOptions: Observable<string[]>;
filteredGPUOptions: Observable<string[]>


  ngOnInit(): void {
    this.getUsers();

    //za autocomplete
    this.filteredCPUOptions = this.cpuAutoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._cpufilter(value || '')),
    );

    this.filteredGPUOptions = this.gpuAutoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._gpufilter(value || '')),
    );
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
}
