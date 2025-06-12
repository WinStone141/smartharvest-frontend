import { Component, input, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputService } from '../../../services/input.service';
import { Router } from '@angular/router';
import { Inputs } from '../../../models/inputs';
import { Users } from '../../../models/users';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarinput',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './insertareditarinput.component.html',
  styleUrl: './insertareditarinput.component.css'
})
export class InsertareditarinputComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  input:Inputs = new Inputs()

  users:Users[]=[]

  tipos:{value:string;viewValue:string}[]=[
    {value:"Fertilizante",viewValue:"Fertilizante"},
    {value:"Semilla",viewValue:"Semilla"},
    {value:"Pesticida",viewValue:"Pesticida"},
    {value:"Abono",viewValue:"Abono"},
    {value:"Control Biológico",viewValue:"Control Biológico"}
  ]

  unidades:{value:string;viewValue:string}[]=[
    {value:"unidad",viewValue:"Unidad"},
    {value:"bolsa",viewValue:"Bolsa"},
    {value:"saco",viewValue:"Saco"},
    {value:"kg",viewValue:"Kilogramo"},
    {value:"L",viewValue:"Litro"}
  ]

  constructor(
    private iS: InputService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(70)]],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', [Validators.required, Validators.min(1)]],
      registrationDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      idUser:['',Validators.required],
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
      this.input.name = this.form.value.name;
      this.input.type = this.form.value.type;
      this.input.amount = this.form.value.amount;
      this.input.unit = this.form.value.unit;
      this.input.registrationDate = this.form.value.registrationDate;
      this.input.expirationDate = this.form.value.expirationDate;
      this.input.users.id = this.form.value.idUser;


      this.iS.insert(this.input).subscribe({
        next: () => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
          this.router.navigate(['inputs']);
        },
        error: (error) => {
          console.error('Error al insertar input:', error);
        }
      });
    }
  }
}
