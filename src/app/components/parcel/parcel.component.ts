import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarparcelComponent } from './listarparcel/listarparcel.component';

@Component({
  selector: 'app-parcel',
  imports: [ListarparcelComponent,RouterOutlet],
  templateUrl: './parcel.component.html',
  styleUrl: './parcel.component.css'
})
export class ParcelComponent {
  constructor(public route:ActivatedRoute) {}
}
