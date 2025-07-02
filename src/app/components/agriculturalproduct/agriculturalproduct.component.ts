import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaragriculturalproductComponent } from './listaragriculturalproduct/listaragriculturalproduct.component';

@Component({
  selector: 'app-agriculturalproduct',
  imports: [RouterOutlet, ListaragriculturalproductComponent],
  templateUrl: './agriculturalproduct.component.html',
  styleUrl: './agriculturalproduct.component.css'
})
export class AgriculturalproductComponent {
    constructor(public route:ActivatedRoute) {}
}
