import { Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { LocalmarketComponent } from './components/localmarket/localmarket.component';
import { InsertareditarComponent } from './components/company/insertareditar/insertareditar.component';
import { InsertareditarlocalmarketComponent } from './components/localmarket/insertareditarlocalmarket/insertareditarlocalmarket.component';
import { InsertareditarinputComponent } from './components/input/insertareditarinput/insertareditarinput.component';
import { InputComponent } from './components/input/input.component';

export const routes: Routes = [
    {
        path:'companies',component:CompanyComponent,  
        children:[
            {
                path:'nuevo',component:InsertareditarComponent
            }
        ]
    },
    {
        path:'localmarkets',component:LocalmarketComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarlocalmarketComponent
            }
        ]
    },
    {
        path:'inputs',component:InputComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarinputComponent
            }
        ]
    }
];
