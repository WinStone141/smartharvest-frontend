import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalMarket } from '../../../models/localmarket';
import { LocalmarketService } from '../../../services/localmarket.service';
import { Router } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarlocalmarket',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './insertareditarlocalmarket.component.html',
  styleUrl: './insertareditarlocalmarket.component.css'
})
export class InsertareditarlocalmarketComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  localmarket: LocalMarket = new LocalMarket();

  constructor(
    private lS: LocalmarketService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.maxLength(100)]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      attentionDate: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.localmarket.name = this.form.value.name;
      this.localmarket.location = this.form.value.location;
      this.localmarket.contact = this.form.value.contact;
      this.localmarket.attentionDate = this.form.value.attentionDate;

      this.lS.insert(this.localmarket).subscribe(() => {
        this.lS.list().subscribe((data) => {
          this.lS.setList(data);
        });
      });
      this.router.navigate(['localmarkets']);
    }
  }
}
