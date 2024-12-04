import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterModule, FormsModule,MatButtonModule, MatFormFieldModule, MatInputModule, NavBarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
http = inject(HttpClient);
model:any[]=[];


acceptChanges() {

}

}
