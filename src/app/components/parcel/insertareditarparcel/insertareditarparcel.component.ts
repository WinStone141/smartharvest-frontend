import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Parcel } from '../../../models/parcel';
import { Users } from '../../../models/users';
import { ParcelService } from '../../../services/parcel.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarparcel',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './insertareditarparcel.component.html',
  styleUrl: './insertareditarparcel.component.css'
})
export class InsertareditarparcelComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  parcel:Parcel = new Parcel()

  users:Users[]=[]

  tipos:{value:string;viewValue:string}[]=[
    {value:"Arenoso",viewValue:"Arenoso"},
    {value:"Pedregoso",viewValue:"Pedregoso"},
    {value:"Arcilloso",viewValue:"Arcilloso"},
    {value:"Orgánico",viewValue:"Orgánico"},
    {value:"Franco",viewValue:"Franco"}
  ]

  constructor(
    private iS: ParcelService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

    ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(70),
        Validators.minLength(2)
      ]],
      location: ['', [
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(3)
      ]],
      sizem2: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(999999),
        Validators.pattern(/^\d+(\.\d{1,2})?$/) // Permite decimales con máximo 2 decimales
      ]],
      groundType: ['', Validators.required],
      registrationDate: ['', Validators.required],
      idUser: ['', Validators.required],
    });

    this.loadUsers();
  }

  loadUsers():void {
    this.iS.getUsers().subscribe({
      next:(data)=>{
        this.users = data;
      },
      error:(error) => {
        console.error('Error al cargar usuarios:',error);
      }
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.parcel.name = this.form.value.name;
      this.parcel.location = this.form.value.location;
      this.parcel.sizem2 = this.form.value.sizem2;
      this.parcel.groundType = this.form.value.groundType;
      this.parcel.registrationDate = this.form.value.registrationDate;
      this.parcel.users.id = this.form.value.idUser;


      this.iS.insert(this.parcel).subscribe({
        next: () => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
          this.router.navigate(['parcels']);
        },
        error: (error) => {
          console.error('Error al insertar input:', error);
        }
      });
    }
  }
}
