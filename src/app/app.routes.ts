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

export const routes: Routes = [
    {
        path:'companies',component:CompanyComponent,  
        children:[
            {
                path:'nuevo',component:InsertareditarComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarComponent
            }
        ]
    },
    {
        path:'localmarkets',component:LocalmarketComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarlocalmarketComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarlocalmarketComponent
            }
        ]
    },
    {
        path:'inputs',component:InputComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarinputComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarinputComponent
            }
        ]
    },
    {
        path:'roles',component:RoleComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarroleComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarroleComponent
            }
        ]
    },
    {
        path:'users',component:UsersComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarusersComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarusersComponent
            }
        ]
    },
    {
        path:'parcels',component:ParcelComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarparcelComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarparcelComponent
            }
        ]
    }
];
