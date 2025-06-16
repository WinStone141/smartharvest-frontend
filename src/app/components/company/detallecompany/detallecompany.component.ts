import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detallecompany',
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './detallecompany.component.html',
  styleUrl: './detallecompany.component.css'
})
export class DetallecompanyComponent implements OnInit {
  company: Company = new Company();
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cS: CompanyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadCompanyDetails();
    });
  }

  loadCompanyDetails(): void {
    if (this.id) {
      this.cS.listId(this.id).subscribe({
        next: (data) => {
          this.company = data;
        },
        error: (error) => {
          console.error('Error al cargar detalles:', error);
          this.router.navigate(['companies']);
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['companies']);
  }

  editar(): void {
    this.router.navigate(['companies/ediciones', this.id]);
  }
}
