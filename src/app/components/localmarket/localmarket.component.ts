import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarlocalmarketComponent } from './listarlocalmarket/listarlocalmarket.component';

@Component({
  selector: 'app-localmarket',
  imports: [ListarlocalmarketComponent,RouterOutlet],
  templateUrl: './localmarket.component.html',
  styleUrl: './localmarket.component.css'
})
export class LocalmarketComponent {
  constructor(public route:ActivatedRoute) {}
}
