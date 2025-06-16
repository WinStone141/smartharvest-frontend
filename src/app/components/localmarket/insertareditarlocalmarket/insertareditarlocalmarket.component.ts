import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalMarket } from '../../../models/localmarket';
import { LocalmarketService } from '../../../services/localmarket.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-insertareditarlocalmarket',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, MatIconModule, MatCardModule],
  templateUrl: './insertareditarlocalmarket.component.html',
  styleUrl: './insertareditarlocalmarket.component.css'
})
export class InsertareditarlocalmarketComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  localmarket: LocalMarket = new LocalMarket();

  id: number = 0
  edicion: boolean = false

  constructor(
    private lS: LocalmarketService,
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
      location: ['', [Validators.required, Validators.maxLength(100)]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      attentionDate: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.localmarket.idLocalMarket = this.form.value.codigo;
      this.localmarket.name = this.form.value.name;
      this.localmarket.location = this.form.value.location;
      this.localmarket.contact = this.form.value.contact;
      this.localmarket.attentionDate = this.form.value.attentionDate;

      if (this.edicion) {
        //actualizar
        this.lS.update(this.localmarket).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        //insertar
        this.lS.insert(this.localmarket).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
      this.router.navigate(['localmarkets']);
    }
  }

  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idLocalMarket),
          name: new FormControl(data.name),
          location: new FormControl(data.location),
          contact: new FormControl(data.contact),
          attentionDate: new FormControl(data.attentionDate),
        })
      })
    }
  }

  cancelar(): void {
  this.router.navigate(['localmarkets']);
  }
}
