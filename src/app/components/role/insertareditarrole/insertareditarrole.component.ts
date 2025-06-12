import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/role';
import { Users } from '../../../models/users';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarrole',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './insertareditarrole.component.html',
  styleUrl: './insertareditarrole.component.css'
})
export class InsertareditarroleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role:Role = new Role()

  users:Users[]=[]

  roles:{value:string;viewValue:string}[]=[
    {value:"ADMIN",viewValue:"Administrador"},
    {value:"AGRICULTOR",viewValue:"Agricultor"},
    {value:"DUEÑO_DE_MERCADO",viewValue:"Dueño de mercado"},
  ]

  constructor(
    private rS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rol: ['', Validators.required],
      idUser:['',Validators.required],
    });

    this.loadUsers();
  }

  loadUsers():void {
    this.rS.getUsers().subscribe({
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
      this.role.rol = this.form.value.rol;
      this.role.user.id = this.form.value.idUser;

      this.rS.insert(this.role).subscribe({
        next: () => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
          this.router.navigate(['roles']);
        },
        error: (error) => {
          console.error('Error al insertar rol:', error);
        }
      });
    }
  }
}
