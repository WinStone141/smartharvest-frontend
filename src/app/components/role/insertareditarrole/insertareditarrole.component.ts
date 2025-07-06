import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/role';
import { Users } from '../../../models/users';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-insertareditarrole',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './insertareditarrole.component.html',
  styleUrl: './insertareditarrole.component.css',
})
export class InsertareditarroleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();

  id: number = 0;
  edicion: boolean = false;

  users: Users[] = [];

  roles: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'Administrador' },
    { value: 'AGRICULTOR', viewValue: 'Agricultor' },
    { value: 'DUEÑO_DE_MERCADO', viewValue: 'Dueño de mercado' },
  ];

  constructor(
    private rS: RoleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    }),
      (this.form = this.formBuilder.group({
        codigo: [''],
        rol: ['', Validators.required],
        idUser: ['', Validators.required],
      }));

    this.loadUsers();
  }

  loadUsers(): void {
    this.rS.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      },
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.role.id = this.form.value.codigo;
      this.role.rol = this.form.value.rol;
      this.role.user.id = this.form.value.idUser;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //insertar
        this.rS.insert(this.role).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          rol: new FormControl(data.rol),
          idUser: new FormControl(data.user.id),
        });
      });
    }
  }

  eliminar(id: number) {
    this.rS.deleteA(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

  cancelar(): void {
    this.router.navigate(['roles']);
  }
}
