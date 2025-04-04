import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit} from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit {

  allStudents:any;
  studentID: any;
  studentForEdit: any;
  studentForm: FormGroup;

  constructor(public activatedRoute: ActivatedRoute, public fb: FormBuilder, public http: HttpClient, public router: Router) {
    this.studentForm = this.fb.group({
      username: ['', [Validators.required,Validators.min(4),Validators.max(8)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.studentID = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.studentID) {
      this.getStudents();

    }
  }


  getStudents() {
    this.http.get('http://localhost:5132/api/users').subscribe({
      next: (res) => {
        this.allStudents = res;
        this.studentForEdit = this.allStudents.find((student: any) => student.id == this.studentID);
        console.log(this.studentForEdit);
        this.fillForm(this.studentForEdit);
      }
    });
  }

  fillForm(student: any) {
    this.studentForm.patchValue({
      username: student.username,
      firstName: student.firstName,
      lastName: student.lastName
    })
  }

  submitChanges() {

    const formData = new FormData();

    formData.append('username', this.studentForm.get('username')?.value);

    formData.append('firstName', this.studentForm.get('firstName')?.value);

    formData.append('lastName', this.studentForm.get('lastName')?.value);

    this.http.put('http://localhost:5132/api/users/'+this.studentForEdit.username,formData).subscribe({
      next: (res) => {
        console.log(formData.get('username'));
        this.studentForEdit.username=formData.get('username');
      }
    });
  }

  ClosePage() {
    this.router.navigate(['/home']);
  }

  ID: any;


}
