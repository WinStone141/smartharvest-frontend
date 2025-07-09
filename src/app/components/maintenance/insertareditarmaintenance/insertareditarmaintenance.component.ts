import { Component, input, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaintenanceService } from '../../../services/maintenance.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Maintenance } from '../../../models/maintenance';
import { Sensor } from '../../../models/sensor';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpHeaders } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subscription, switchMap } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarmaintenance',
  standalone: true,
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
  templateUrl: './insertareditarmaintenance.component.html',
  styleUrl: './insertareditarmaintenance.component.css',
})
export class InsertareditarmaintenanceComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  maintenance: Maintenance = new Maintenance();
  id: number = 0;
  edicion: boolean = false;
  currentUserId: number | null = null;

  sensors: Sensor[] = [];
  private subscriptions: Subscription[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Preventivo', viewValue: 'Preventivo' },
    { value: 'Correctivo', viewValue: 'Correctivo' },
    { value: 'Predictivo', viewValue: 'Predictivo' },
    { value: 'Rutinario', viewValue: 'Rutinario' },
    { value: 'Emergencia', viewValue: 'Emergencia' },
  ];

  constructor(
    private mS: MaintenanceService,
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
    this.loadSensors();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      fechaInstalacion: ['', Validators.required],
      tipoMantenimiento: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      sensor: ['', Validators.required],
    });
  }

  loadSensors(): void {
    this.mS.getSensors(this.currentUserId!).subscribe({
      next: (data) => {
        this.sensors = data;
      },
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.maintenance.idMaintenance = this.form.value.codigo;
      this.maintenance.installationDate = this.form.value.fechaInstalacion;
      this.maintenance.tipoMantenimiento = this.form.value.tipoMantenimiento;
      this.maintenance.description = this.form.value.descripcion;
      this.maintenance.sensor.idSensor = this.form.value.sensor;
      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.mS
          .update(this.maintenance)
          .pipe(switchMap(() => this.mS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.mS.setList(data);
            this.router.navigate(['maintenances']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.mS
          .insert(this.maintenance)
          .pipe(switchMap(() => this.mS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.mS.setList(data);
            this.router.navigate(['maintenances']);
          });
        this.subscriptions.push(insertSub);
      }
      this.router.navigate(['maintenances']);
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMaintenance),
          fechaInstalacion: new FormControl(data.installationDate),
          tipoMantenimiento: new FormControl(data.tipoMantenimiento),
          descripcion: new FormControl(data.description),
          sensor: new FormControl(data.sensor.idSensor),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['maintenances']);
  }
}
