import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ParcelService } from '../../../services/parcel.service';
import { ParcelActive } from '../../../models/parcel-active.model';

@Component({
  selector: 'app-parcels-active',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './parcels-active.component.html',
  styleUrl: './parcels-active.component.css',
})
export class ParcelsActiveComponent implements OnInit {
  parcels: ParcelActive[] = [];
  loading = true;
  error = '';

  displayedColumns = ['idParcel', 'name'];

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.parcelService.getActiveParcels().subscribe({
      next: (data) => {
        this.parcels = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al obtener parcelas activas';
        this.loading = false;
      },
    });
  }
}