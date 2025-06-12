import { Component, OnInit } from '@angular/core'; // Agregar OnInit
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersForRegister } from '../../../models/usersforregister.';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
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

  constructor(
    private uS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      this.user.username = this.form.value.username;
      this.user.password = this.form.value.password;
      this.user.enabled = this.form.value.enabled;

      this.uS.insert(this.user).subscribe({
        next: () => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
          this.router.navigate(['users']);
        },
        error: (error) => {
          console.error('Error al insertar usuario:', error);
        }
      });
    }
  }
}