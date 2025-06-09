import { Component } from '@angular/core';
import { ListarcompanyComponent } from './listarcompany/listarcompany.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company',
  imports: [ListarcompanyComponent, RouterOutlet],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  constructor(public route:ActivatedRoute) {}
}
