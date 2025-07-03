import { Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { LocalmarketComponent } from './components/localmarket/localmarket.component';
import { InsertareditarComponent } from './components/company/insertareditar/insertareditar.component';
import { InsertareditarlocalmarketComponent } from './components/localmarket/insertareditarlocalmarket/insertareditarlocalmarket.component';
import { InsertareditarinputComponent } from './components/input/insertareditarinput/insertareditarinput.component';
import { InputComponent } from './components/input/input.component';
import { RoleComponent } from './components/role/role.component';
import { InsertareditarroleComponent } from './components/role/insertareditarrole/insertareditarrole.component';
import { UsersComponent } from './components/users/users.component';
import { InsertareditarusersComponent } from './components/users/insertareditarusers/insertareditarusers.component';
import { ParcelComponent } from './components/parcel/parcel.component';
import { InsertareditarparcelComponent } from './components/parcel/insertareditarparcel/insertareditarparcel.component';
import { InsertareditarcropComponent } from './components/crop/insertareditarcrop/insertareditarcrop.component';
import { DetallecompanyComponent } from './components/company/detallecompany/detallecompany.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { roleGuard } from './guard/role.guard';
import { LoginComponent } from './components/login/login.component';
import { CropComponent } from './components/crop/crop.component';
import { InsertarnuevousuarioComponent } from './components/role/insertarnuevousuario/insertarnuevousuario.component';
import { HomeComponent } from './components/home/home.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { InsertareditarsensorComponent } from './components/sensor/insertareditarsensor/insertareditarsensor.component';
import { AgriculturalproductComponent } from './components/agriculturalproduct/agriculturalproduct.component';
import { InsertareditaragriculturalproductComponent } from './components/agriculturalproduct/insertareditaragriculturalproduct/insertareditaragriculturalproduct.component';
import { IaComponent } from './components/ia/ia.component';
import { CropsNeedingAttentionComponent } from './components/reportes/crops-needing-attention/crops-needing-attention.component';
import { ParcelsActiveComponent } from './components/reportes/parcels-active/parcels-active.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
  path:'ia',component:IaComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'seleccionar-rol',
    component: InsertarnuevousuarioComponent,
    canActivate: [seguridadGuard], // Solo usuarios autenticados
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [seguridadGuard], // Solo usuarios autenticados
  },
  {
    path: 'companies',
    component: CompanyComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarComponent,
      },
      {
        path: 'detalle/:id',
        component: DetallecompanyComponent,
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
  },
  {
    path: 'localmarkets',
    component: LocalmarketComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarlocalmarketComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'DUEÑO_DE_MERCADO'] }, // Solo ADMIN y DUEÑO_DE_MERCADO pueden crear
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarlocalmarketComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'DUEÑO_DE_MERCADO'] }, // Solo ADMIN y DUEÑO_DE_MERCADO pueden editar
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR', 'DUEÑO_DE_MERCADO'] }, // Todos pueden ver la lista
  },
  {
    path: 'inputs',
    component: InputComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarinputComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden crear
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarinputComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden editar
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden ver la lista
  },
  {
    path: 'roles',
    component: RoleComponent,
    children: [
      {
        path: 'all',
        component: InsertarnuevousuarioComponent,
      },
      {
        path: 'nuevo',
        component: InsertareditarroleComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN'] }, // Solo ADMIN puede crear roles
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarroleComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN'] }, // Solo ADMIN puede editar roles
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] }, // Solo ADMIN puede ver la gestión de roles
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'ediciones/:id',
        component: InsertareditarusersComponent,
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR', 'DUEÑO_DE_MERCADO'] },
      },
    ],
    canActivate: [seguridadGuard, roleGuard], // Para verificar login o token
    data: { expectedRoles: ['ADMIN'] },
  },
  {
    path: 'parcels',
    component: ParcelComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarparcelComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] },
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarparcelComponent,
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] },
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden manejar parcelas
  },
  {
    path: 'crops',
    component: CropComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarcropComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // Solo ADMIN y AGRICULTOR pueden crear
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarcropComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // Solo ADMIN y AGRICULTOR pueden editar
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden manejar cultivos
  },
  {
    path: 'sensors',
    component: SensorComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditarsensorComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // Solo ADMIN y AGRICULTOR pueden crear
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarsensorComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // Solo ADMIN y AGRICULTOR pueden editar
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden manejar cultivos
  },
  //Report access
  {
    path: 'reportes',
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] },
    children: [
      {
        path: 'cultivos-peligro',
        component: CropsNeedingAttentionComponent,
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }
      },
      {
        path: 'parcelas-activas',
        component: ParcelsActiveComponent,
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }
      }
    ]
  },
  {
    path: 'agriculturalproducts',
    component: AgriculturalproductComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertareditaragriculturalproductComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // Solo ADMIN y AGRICULTOR pueden crear
      },
      {
        path: 'ediciones/:id',
        component: InsertareditaragriculturalproductComponent,
        canActivate: [roleGuard],
        data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // Solo ADMIN y AGRICULTOR pueden editar
      },
    ],
    canActivate: [seguridadGuard, roleGuard],
    data: { expectedRoles: ['ADMIN', 'AGRICULTOR'] }, // ADMIN y AGRICULTOR pueden manejar cultivos
  },
  {
    path: 'newuser',
    component: InsertareditarusersComponent, // libre
  },
];
