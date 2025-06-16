import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Company } from '../../../models/company';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  company: Company = new Company();

  id: number = 0
  edicion: boolean = false

  constructor(
    private cS: CompanyService,
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
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      mission: ['', [Validators.required, Validators.maxLength(300)]],
      vision: ['', [Validators.required, Validators.maxLength(300)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.company.idCompany = this.form.value.codigo;
      this.company.name = this.form.value.name;
      this.company.description = this.form.value.description;
      this.company.mission = this.form.value.mission;
      this.company.vision = this.form.value.vision;
      this.company.address = this.form.value.address;
      this.company.email = this.form.value.email;
      this.company.contact = this.form.value.contact;

      if (this.edicion) {
        //actualizar
        this.cS.update(this.company).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        //insertar
        this.cS.insert(this.company).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['companies']);
    }
  }

    init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCompany),
          name: new FormControl(data.name),
          description: new FormControl(data.description),
          mission: new FormControl(data.mission),
          vision: new FormControl(data.vision),
          address: new FormControl(data.address),
          email: new FormControl(data.email),
          contact: new FormControl(data.contact),
        })
      })
    }
  }

  cancelar(): void {
  this.router.navigate(['companies']);
}
}
