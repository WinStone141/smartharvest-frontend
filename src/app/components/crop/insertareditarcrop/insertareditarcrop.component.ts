import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-insertareditarcrop',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './insertareditarcrop.component.html',
  styleUrl: './insertareditarcrop.component.css'
})
export class InsertareditarcropComponent {
  form: FormGroup = new FormGroup({});
  crop:Crop = new Crop()

  id: number = 0
  edicion: boolean = false

  parcels:Parcel[]=[]

  estados:{value:string;viewValue:string}[]=[
    {value:"Sembrado",viewValue:"Sembrado"},
    {value:"En preparación",viewValue:"En preparación"},
    {value:"Listo para cosecha",viewValue:"Listo para cosecha"},
    {value:"Creciendo",viewValue:"Creciendo"},
    {value:"Seco",viewValue:"Seco"},
  ]

  tipoC:{value:string;viewValue:string}[]=[
    {value:"Arroz",viewValue:"Arroz"},
    {value:"Papa",viewValue:"Papa"},
    {value:"Maíz",viewValue:"Maíz"},
    {value:"Zanahoria",viewValue:"Zanahoria"},
    {value:"Lenteja",viewValue:"Lenteja"},
    {value:"Trigo",viewValue:"Trigo"},
    {value:"Quinua",viewValue:"Quinua"},
    {value:"Tomate",viewValue:"Tomate"},
    {value:"Frijol",viewValue:"Frijol"},
    {value:"Cebolla",viewValue:"Cebolla"}
  ]

  constructor(
    private cS: CropService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    }),

    this.form = this.formBuilder.group({
      codigo: [''],
      tipo: ['', Validators.required],
      fechaSembrado: ['', Validators.required],
      fechaCosecha: ['', Validators.required],
      estado: ['', [Validators.required]],
      idParcela: ['', Validators.required],
    });

    this.loadParcels();
  }

  loadParcels():void {
    this.cS.getParcels().subscribe({
      next:(data)=>{
        this.parcels = data;
      },
      error:(error) => {
        console.error('Error al cargar parcelas:',error);
      }
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
        //actualizar
        this.cS.update(this.crop).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        //insertar
        this.cS.insert(this.crop).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['crops']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCrop),
          tipo: new FormControl(data.typeCrop),
          fechaSembrado: new FormControl(data.sowingDate),
          fechaCosecha: new FormControl(data.estimatedHarvestDate),
          estado: new FormControl(data.actualState),
          idParcela: new FormControl(data.parcel.idParcel),
        })
      })
    }
  }
}
