import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputService } from '../../../services/input.service';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Inputs } from '../../../models/inputs';
import { Users } from '../../../models/users';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-insertareditarinput',
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
  templateUrl: './insertareditarinput.component.html',
  styleUrl: './insertareditarinput.component.css',
})
export class InsertareditarinputComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  input: Inputs = new Inputs();

  id: number = 0;
  edicion: boolean = false;
  currentUserId: number | null = null;

  users: Users[] = [];
  private subscriptions: Subscription[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Fertilizante', viewValue: 'Fertilizante' },
    { value: 'Semilla', viewValue: 'Semilla' },
    { value: 'Pesticida', viewValue: 'Pesticida' },
    { value: 'Abono', viewValue: 'Abono' },
    { value: 'Control Biológico', viewValue: 'Control Biológico' },
  ];

  unidades: { value: string; viewValue: string }[] = [
    { value: 'unidad', viewValue: 'Unidad' },
    { value: 'bolsa', viewValue: 'Bolsa' },
    { value: 'saco', viewValue: 'Saco' },
    { value: 'kg', viewValue: 'Kilogramo' },
    { value: 'L', viewValue: 'Litro' },
  ];

  constructor(
    private iS: InputService,
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
      name: ['', [Validators.required, Validators.maxLength(70)]],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', [Validators.required, Validators.min(1)]],
      registrationDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      idUser: [
        { value: this.currentUserId, disabled: true },
        Validators.required,
      ],
    });
  }

  aceptar() {
    if (this.form.valid && this.currentUserId) {
      this.input.idInput = this.form.value.codigo;
      this.input.name = this.form.value.name;
      this.input.type = this.form.value.type;
      this.input.amount = this.form.value.amount;
      this.input.unit = this.form.value.unit;
      this.input.registrationDate = this.form.value.registrationDate;
      this.input.expirationDate = this.form.value.expirationDate;

      // Usar el userId del usuario logueado
      this.input.users.id = this.currentUserId;

      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.iS
          .update(this.input)
          .pipe(switchMap(() => this.iS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.iS.setList(data);
            this.router.navigate(['inputs']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.iS
          .insert(this.input)
          .pipe(switchMap(() => this.iS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.iS.setList(data);
            this.router.navigate(['inputs']);
          });
        this.subscriptions.push(insertSub);
      }
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.iS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idInput),
          name: new FormControl(data.name),
          type: new FormControl(data.type),
          amount: new FormControl(data.amount),
          unit: new FormControl(data.unit),
          registrationDate: new FormControl(data.registrationDate),
          expirationDate: new FormControl(data.expirationDate),
          idUser: new FormControl({ value: data.users.id, disabled: true }),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['inputs']);
  }
}
