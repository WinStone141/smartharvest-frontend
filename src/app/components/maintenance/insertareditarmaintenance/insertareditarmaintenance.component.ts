import { Component, input, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  sensors: Sensor[] = [];

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    }),
      (this.form = this.formBuilder.group({
        codigo: [''],
        fechaInstalacion: ['', Validators.required],
        tipoMantenimiento: ['', Validators.required],
        descripcion: ['', [Validators.required, Validators.maxLength(200)]],
        sensor: ['', Validators.required],
      }));

    this.loadSensors();
  }

  loadSensors(): void {
    this.mS.getSensors().subscribe({
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
        //actualizar
        this.mS.update(this.maintenance).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        //insertar
        this.mS.insert(this.maintenance).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['maintenances']);
    }
  }

  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMaintenance),
          fechaInstalacion: new FormControl(data.installationDate),
          tipoMantenimiento: new FormControl(data.tipoMantenimiento),
          descripcion: new FormControl(data.description),
          sensor: new FormControl(data.sensor.idSensor),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['maintenances']);
  }
}
