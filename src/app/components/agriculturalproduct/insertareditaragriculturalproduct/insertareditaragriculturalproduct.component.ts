import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AgriculturalProduct } from '../../../models/agriculturalproduct';
import { Sensor } from '../../../models/sensor';
import { AgriculturalproductService } from '../../../services/agriculturalproduct.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Crop } from '../../../models/crop';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subscription, switchMap } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditaragriculturalproduct',
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
  templateUrl: './insertareditaragriculturalproduct.component.html',
  styleUrl: './insertareditaragriculturalproduct.component.css',
})
export class InsertareditaragriculturalproductComponent {
  form: FormGroup = new FormGroup({});
  agriculturalproduct: AgriculturalProduct = new AgriculturalProduct();

  id: number = 0;
  edicion: boolean = false;
  currentUserId: number | null = null;

  cultivos: Crop[] = [];
  private subscriptions: Subscription[] = [];

  udemedida: { value: string; viewValue: string }[] = [
    { value: 'toneladas', viewValue: 'Toneladas' },
    { value: 'kg', viewValue: 'Kilogramos' },
    { value: 'cajas', viewValue: 'Cajas' },
    { value: 'sacos', viewValue: 'Sacos' },
    { value: 'libras', viewValue: 'Libras' },
  ];

  constructor(
    private aS: AgriculturalproductService,
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
    this.loadCrops();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      cantidad: [
        '',
        [Validators.required, Validators.max(1000), Validators.min(1)],
      ],
      unidaddemedida: ['', Validators.required],
      fechadecosecha: ['', Validators.required],
      idCultivo: ['', Validators.required],
    });
  }

  loadCrops(): void {
    this.aS.getCrops(this.currentUserId!).subscribe({
      next: (data) => {
        this.cultivos = data;
      },
      error: (error) => {
        console.error('Error al cargar cultivos:', error);
      },
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.agriculturalproduct.idProduct = this.form.value.codigo;
      this.agriculturalproduct.name = this.form.value.nombre;
      this.agriculturalproduct.quantity = this.form.value.cantidad;
      this.agriculturalproduct.unitMeasure = this.form.value.unidaddemedida;
      this.agriculturalproduct.harvestDate = this.form.value.fechadecosecha;
      this.agriculturalproduct.crop.idCrop = this.form.value.idCultivo;

      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.aS
          .update(this.agriculturalproduct)
          .pipe(switchMap(() => this.aS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.aS.setList(data);
            this.router.navigate(['agriculturalproducts']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.aS
          .insert(this.agriculturalproduct)
          .pipe(switchMap(() => this.aS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.aS.setList(data);
            this.router.navigate(['agriculturalproducts']);
          });
        this.subscriptions.push(insertSub);
      }
      this.router.navigate(['agriculturalproducts']);
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idProduct),
          nombre: new FormControl(data.name),
          cantidad: new FormControl(data.quantity),
          unidaddemedida: new FormControl(data.unitMeasure),
          fechadecosecha: new FormControl(data.harvestDate),
          idCultivo: new FormControl(data.crop.idCrop),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['agriculturalproducts']);
  }
}
