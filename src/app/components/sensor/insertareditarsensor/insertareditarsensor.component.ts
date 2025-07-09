import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sensor } from '../../../models/sensor';
import { SensorService } from '../../../services/sensor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Parcel } from '../../../models/parcel';
import { Crop } from '../../../models/crop';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subscription, switchMap } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarsensor',
  imports: [
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './insertareditarsensor.component.html',
  styleUrl: './insertareditarsensor.component.css',
})
export class InsertareditarsensorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  sensor: Sensor = new Sensor();

  id: number = 0;
  edicion: boolean = false;
  currentUserId: number | null = null;

  private subscriptions: Subscription[] = [];

  parcels: Parcel[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'PH', viewValue: 'Potencial de Hidrogeno' },
    { value: 'Humedad', viewValue: 'Humedad' },
    { value: 'Humedad del suelo', viewValue: 'Humedad del suelo' },
    { value: 'Luminosidad', viewValue: 'Luminosidad' },
    { value: 'Temperatura', viewValue: 'Temperatura' },
  ];

  constructor(
    private sS: SensorService,
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
      tiposensor: ['', Validators.required],
      fechainstalacion: ['', Validators.required],
      estado: ['', Validators.required],
      ultimalectura: ['', Validators.required],
      niveldebateria: [
        '',
        [Validators.required, Validators.max(100), Validators.min(1)],
      ],
      parcela: ['', Validators.required],
      humedad: [
        '',
        [Validators.required, Validators.max(100), Validators.min(1)],
      ],
    });
  }

  loadParcels(): void {
    this.sS.getParcels(this.currentUserId!).subscribe({
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
      this.sensor.idSensor = this.form.value.codigo;
      this.sensor.sensorType = this.form.value.tiposensor;
      this.sensor.installationDate = this.form.value.fechainstalacion;
      this.sensor.state = this.form.value.estado;
      this.sensor.lastLecture = this.form.value.ultimalectura;
      this.sensor.batteryLevel = this.form.value.niveldebateria;
      this.sensor.parcel.idParcel = this.form.value.parcela;
      this.sensor.humidity = this.form.value.humedad;

      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.sS
          .update(this.sensor)
          .pipe(switchMap(() => this.sS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.sS.setList(data);
            this.router.navigate(['sensors']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.sS
          .insert(this.sensor)
          .pipe(switchMap(() => this.sS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.sS.setList(data);
            this.router.navigate(['sensors']);
          });
        this.subscriptions.push(insertSub);
      }
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idSensor),
          tiposensor: new FormControl(data.sensorType),
          fechainstalacion: new FormControl(data.installationDate),
          estado: new FormControl(data.state),
          ultimalectura: new FormControl(data.lastLecture),
          niveldebateria: new FormControl(data.batteryLevel),
          parcela: new FormControl(data.parcel.idParcel),
          humedad: new FormControl(data.humidity),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['sensors']);
  }
}
