import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Recommendation } from '../../../models/recommendation';
import { Users } from '../../../models/users';
import { Crop } from '../../../models/crop';
import { RecommendationService } from '../../../services/recommendation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-insertareditarrecommendation',
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
  templateUrl: './insertareditarrecommendation.component.html',
  styleUrl: './insertareditarrecommendation.component.css',
})
export class InsertareditarrecommendationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recommendation: Recommendation = new Recommendation();
  id: number = 0;
  edicion: boolean = false;
  crops: Crop[] = [];
  users: Users[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Fertilización', viewValue: 'Fertilización' },
    { value: 'Riego', viewValue: 'Riego' },
    { value: 'Control de Plagas', viewValue: 'Control de Plagas' },
    { value: 'Poda', viewValue: 'Poda' },
    { value: 'Cosecha', viewValue: 'Cosecha' },
  ];

  constructor(
    private rS: RecommendationService,
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
        tipo: ['', Validators.required],
        descripcion: ['', [Validators.required, Validators.maxLength(200)]],
        fechaEmision: ['', Validators.required],
        fuente: ['', Validators.required],
        idUser: ['', Validators.required],
        idCrop: ['', Validators.required],
      }));

    this.loadCrops();
    this.loadUsers();
  }

  loadCrops(): void {
    this.rS.getCrops().subscribe({
      next: (data) => {
        this.crops = data;
      },
    });
  }
  loadUsers(): void {
    this.rS.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.recommendation.idRecommendation = this.form.value.codigo;
      this.recommendation.type = this.form.value.tipo;
      this.recommendation.description = this.form.value.descripcion;
      this.recommendation.issueDate = this.form.value.fechaEmision;
      this.recommendation.source = this.form.value.fuente;
      this.recommendation.users.id = this.form.value.idUser;
      this.recommendation.crop.idCrop = this.form.value.idCrop;

      if (this.edicion) {
        //actualizar
        this.rS.update(this.recommendation).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //insertar
        this.rS.insert(this.recommendation).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['recommendations']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecommendation),
          tipo: new FormControl(data.type),
          descripcion: new FormControl(data.description),
          fechaEmision: new FormControl(data.issueDate),
          fuente: new FormControl(data.source),
          idUser: new FormControl(data.users.id),
          idCrop: new FormControl(data.crop.idCrop),
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['recommendations']);
  }
}
