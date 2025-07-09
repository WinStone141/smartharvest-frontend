import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Parcel } from '../../../models/parcel';
import { Users } from '../../../models/users';
import { ParcelService } from '../../../services/parcel.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subscription, switchMap } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarparcel',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './insertareditarparcel.component.html',
  styleUrl: './insertareditarparcel.component.css',
})
export class InsertareditarparcelComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  parcel: Parcel = new Parcel();

  id: number = 0;
  edicion: boolean = false;
  currentUserId: number | null = null;

  private subscriptions: Subscription[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Arenoso', viewValue: 'Arenoso' },
    { value: 'Pedregoso', viewValue: 'Pedregoso' },
    { value: 'Arcilloso', viewValue: 'Arcilloso' },
    { value: 'Orgánico', viewValue: 'Orgánico' },
    { value: 'Franco', viewValue: 'Franco' },
  ];

  constructor(
    private pS: ParcelService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el userId del usuario logueado
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      this.initializeForm();
    });

    // Suscribirse a los parámetros de la ruta
    const routeSub = this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.subscriptions.push(userIdSub, routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(2),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3),
        ],
      ],
      sizem2: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(999999),
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // Permite decimales con máximo 2 decimales
        ],
      ],
      groundType: ['', Validators.required],
      registrationDate: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid && this.currentUserId) {
      this.parcel.idParcel = this.form.value.codigo;
      this.parcel.name = this.form.value.name;
      this.parcel.location = this.form.value.location;
      this.parcel.sizem2 = this.form.value.sizem2;
      this.parcel.groundType = this.form.value.groundType;
      this.parcel.registrationDate = this.form.value.registrationDate;

      this.parcel.users.id = this.currentUserId;

      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.pS
          .update(this.parcel)
          .pipe(switchMap(() => this.pS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.pS.setList(data);
            this.router.navigate(['parcels']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.pS
          .insert(this.parcel)
          .pipe(switchMap(() => this.pS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.pS.setList(data);
            this.router.navigate(['parcels']);
          });
        this.subscriptions.push(insertSub);
      }
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idParcel),
          name: new FormControl(data.name),
          location: new FormControl(data.location),
          sizem2: new FormControl(data.sizem2),
          groundType: new FormControl(data.groundType),
          registrationDate: new FormControl(data.registrationDate),
          idUser: new FormControl({ value: data.users.id, disabled: true }),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['parcels']);
  }
}
