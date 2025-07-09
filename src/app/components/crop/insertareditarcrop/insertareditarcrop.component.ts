import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Crop } from '../../../models/crop';
import { Parcel } from '../../../models/parcel';
import { CropService } from '../../../services/crop.service';
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
import { LoginService } from '../../../services/login.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-insertareditarcrop',
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
  templateUrl: './insertareditarcrop.component.html',
  styleUrl: './insertareditarcrop.component.css',
})
export class InsertareditarcropComponent {
  form: FormGroup = new FormGroup({});
  crop: Crop = new Crop();

  id: number = 0;
  edicion: boolean = false;
  currentUserId: number | null = null;

  parcels: Parcel[] = [];
  private subscriptions: Subscription[] = [];

  estados: { value: string; viewValue: string }[] = [
    { value: 'Sembrado', viewValue: 'Sembrado' },
    { value: 'En preparación', viewValue: 'En preparación' },
    { value: 'Listo para cosecha', viewValue: 'Listo para cosecha' },
    { value: 'Creciendo', viewValue: 'Creciendo' },
    { value: 'Seco', viewValue: 'Seco' },
  ];

  tipoC: { value: string; viewValue: string }[] = [
    { value: 'Arroz', viewValue: 'Arroz' },
    { value: 'Papa', viewValue: 'Papa' },
    { value: 'Maíz', viewValue: 'Maíz' },
    { value: 'Zanahoria', viewValue: 'Zanahoria' },
    { value: 'Lenteja', viewValue: 'Lenteja' },
    { value: 'Trigo', viewValue: 'Trigo' },
    { value: 'Quinua', viewValue: 'Quinua' },
    { value: 'Tomate', viewValue: 'Tomate' },
    { value: 'Frijol', viewValue: 'Frijol' },
    { value: 'Cebolla', viewValue: 'Cebolla' },
  ];

  constructor(
    private cS: CropService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService
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
    this.loadParcels();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      tipo: ['', [Validators.required]],
      fechaSembrado: ['', Validators.required],
      fechaCosecha: ['', Validators.required],
      estado: ['', [Validators.required]],
      idParcela: ['', Validators.required],
    });
  }

  loadParcels(): void {
    this.cS.getParcels(this.currentUserId!).subscribe({
      next: (data) => {
        this.parcels = data;
      },
      error: (error) => {
        console.error('Error al cargar parcelas:', error);
      },
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.crop.idCrop = this.form.value.codigo;
      this.crop.typeCrop = this.form.value.tipo;
      this.crop.sowingDate = this.form.value.fechaSembrado;
      this.crop.estimatedHarvestDate = this.form.value.fechaCosecha;
      this.crop.actualState = this.form.value.estado;
      this.crop.parcel.idParcel = this.form.value.idParcela;

      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.cS
          .update(this.crop)
          .pipe(switchMap(() => this.cS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.cS.setList(data);
            this.router.navigate(['crops']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.cS
          .insert(this.crop)
          .pipe(switchMap(() => this.cS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.cS.setList(data);
            this.router.navigate(['crops']);
          });
        this.subscriptions.push(insertSub);
      }
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCrop),
          tipo: new FormControl(data.typeCrop),
          fechaSembrado: new FormControl(data.sowingDate),
          fechaCosecha: new FormControl(data.estimatedHarvestDate),
          estado: new FormControl(data.actualState),
          idParcela: new FormControl(data.parcel.idParcel),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['crops']);
  }
}
