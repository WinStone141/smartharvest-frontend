import { Component, OnInit } from '@angular/core'; // Agregar OnInit
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersForRegister } from '../../../models/usersforregister';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-insertareditarusers',
  imports: [
    MatRadioModule,
    MatInputModule,        
    MatButtonModule,       
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './insertareditarusers.component.html',
  styleUrl: './insertareditarusers.component.css'
})
export class InsertareditarusersComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: UsersForRegister = new UsersForRegister();
  estado: boolean = true;

  id: number = 0
  edicion: boolean = false

  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    }),


    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      enabled: [true, Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.id = this.form.value.codigo;
      this.user.username = this.form.value.username;
      this.user.password = this.form.value.password;
      this.user.enabled = this.form.value.enabled;
      this.user.roles = [];

      if (this.edicion) {
        //actualizar
        this.uS.update(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        //insertar
        this.uS.insert(this.user).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['users']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          username: new FormControl(data.username),
          password: new FormControl(''),
          enabled: new FormControl(data.enabled)
        })
      })
    }
  }

  eliminar(id: number) {
    this.uS.deleteA(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      })
    })
  }
}