import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { Subscription, switchMap } from 'rxjs';
import { LoginService } from '../../../services/login.service';

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
  currentUserId: number | null = null;

  private subscriptions: Subscription[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Fertilización', viewValue: 'Fertilización' },
    { value: 'Riego', viewValue: 'Riego' },
    { value: 'Control de Plagas', viewValue: 'Control de Plagas' },
    { value: 'Poda', viewValue: 'Poda' },
    { value: 'Cosecha', viewValue: 'Cosecha' },
  ];

  constructor(
    private rS: RecommendationService,
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

    this.loadCrops();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      tipo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      fechaEmision: ['', Validators.required],
      fuente: ['', Validators.required],
      idCrop: ['', Validators.required],
    });
  }

  loadCrops(): void {
    this.rS.getCrops(this.currentUserId!).subscribe({
      next: (data) => {
        this.crops = data;
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
      this.recommendation.crop.idCrop = this.form.value.idCrop;

      if (this.edicion) {
        // Actualizar - Usar switchMap para encadenar las operaciones
        const updateSub = this.rS
          .update(this.recommendation)
          .pipe(switchMap(() => this.rS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.rS.setList(data);
            this.router.navigate(['recommendations']);
          });
        this.subscriptions.push(updateSub);
      } else {
        // Insertar - Usar switchMap para encadenar las operaciones
        const insertSub = this.rS
          .insert(this.recommendation)
          .pipe(switchMap(() => this.rS.list(this.currentUserId!)))
          .subscribe((data) => {
            this.rS.setList(data);
            this.router.navigate(['recommendations']);
          });
        this.subscriptions.push(insertSub);
      }
    }
  }

  init() {
    if (this.edicion) {
      const initSub = this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecommendation),
          tipo: new FormControl(data.type),
          descripcion: new FormControl(data.description),
          fechaEmision: new FormControl(data.issueDate),
          fuente: new FormControl(data.source),
          idCrop: new FormControl(data.crop.idCrop),
        });
      });
      this.subscriptions.push(initSub);
    }
  }

  cancelar(): void {
    this.router.navigate(['recommendations']);
  }
}
