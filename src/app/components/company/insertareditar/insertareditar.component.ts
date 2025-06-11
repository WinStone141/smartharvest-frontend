import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Company } from '../../../models/company';
import { CompanyService } from '../../../services/company.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  company: Company = new Company();

  constructor(
    private cS: CompanyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      this.company.name = this.form.value.name;
      this.company.description = this.form.value.description;
      this.company.mission = this.form.value.mission;
      this.company.vision = this.form.value.vision;
      this.company.address = this.form.value.address;
      this.company.email = this.form.value.email;
      this.company.contact = this.form.value.contact;

      this.cS.insert(this.company).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['companies']);
    }
  }
}
