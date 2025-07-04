import { Component, OnInit } from '@angular/core';
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
import { SensorService } from '../../../services/sensor.service';

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
    CommonModule
  ],
  templateUrl: './insertareditarmaintenance.component.html',
  styleUrl: './insertareditarmaintenance.component.css'
})
export class InsertareditarmaintenanceComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  maintenance: Maintenance = new Maintenance();
  id: number = 0;
  edicion: boolean = false;
  sensors: Sensor[] = [];

  maintenanceTypes: {value: string; viewValue: string}[] = [
    {value: "calibracion", viewValue: "Calibración del sensor"},
    {value: "limpieza", viewValue: "Limpieza de componentes"},
    {value: "sustitucion_bateria", viewValue: "Sustitución de batería"},
    {value: "actualizacion_software", viewValue: "Actualización de software"},
    {value: "reparacion_cableado", viewValue: "Reparación de cableado"},
    {value: "proteccion_climatica", viewValue: "Protección climática"},
    {value: "verificacion_precision", viewValue: "Verificación de precisión"},
    {value: "reemplazo_sensor", viewValue: "Reemplazo completo del sensor"},
    {value: "mantenimiento_preventivo", viewValue: "Mantenimiento preventivo"},
    {value: "ajuste_humedad", viewValue: "Ajuste por humedad extrema"},
    {value: "control_ph", viewValue: "Control de pH en sensores de suelo"},
    {value: "optimizacion_energia", viewValue: "Optimización de consumo energético"}
  ];

  constructor(
    private mS: MaintenanceService,
    private sS: SensorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    });

    this.form = this.formBuilder.group({
      idMaintenance: [''],
      installationDate: ['', Validators.required],
      tipoMantenimiento: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      idSensor: ['', Validators.required]
    });

    this.loadSensors();
  }

  loadSensors():void {
    this.mS.getSensors().subscribe({
      next:(data)=>{
        this.sensors = data;
      },
      error:(error) => {
        console.error('Error al cargar sensores:',error);
      }
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.maintenance.idMaintenance = this.form.value.idMaintenance;
      this.maintenance.installationDate = this.form.value.installationDate;
      this.maintenance.tipoMantenimiento = this.form.value.tipoMantenimiento;
      this.maintenance.description = this.form.value.description;
      this.maintenance.sensor.idSensor = this.form.value.idSensor;

      if (this.edicion) {
        this.mS.update(this.maintenance).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.maintenance).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['maintenances']);
    }
  }
}