import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CropService } from '../../../services/crop.service';
import { CropsNeedingAttention } from '../../../models/crops-needing-attention.model';

@Component({
  selector: 'app-crops-needing-attention',
  standalone: true,
  imports: [CommonModule, NgIf, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './crops-needing-attention.component.html',
  styleUrl: './crops-needing-attention.component.css',
})
export class CropsNeedingAttentionComponent implements OnInit {
  crops: CropsNeedingAttention[] = [];
  loading = true;
  error = '';

  displayedColumns = ['idcrop', 'typecrop', 'name', 'actualstate', 'sowingdate'];

  constructor(private cropService: CropService) {}

  ngOnInit(): void {
    this.cropService.getCropsNeedingAttention().subscribe({
      next: (data) => {
        this.crops = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al obtener cultivos que necesitan atención';
        this.loading = false;
      },
    });
  }
}