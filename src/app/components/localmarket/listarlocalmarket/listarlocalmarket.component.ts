import { Component, OnInit } from '@angular/core';
import { LocalmarketService } from '../../../services/localmarket.service';
import { LocalMarket } from '../../../models/localmarket';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-listarlocalmarket',
  imports: [
    CommonModule, 
    RouterLink, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './listarlocalmarket.component.html',
  styleUrl: './listarlocalmarket.component.css'
})
export class ListarlocalmarketComponent implements OnInit {
  localMarkets: LocalMarket[] = [];

  constructor(private lS: LocalmarketService) {}

  ngOnInit(): void {
    this.lS.list().subscribe(data => {
      this.localMarkets = data;
    });
    
    this.lS.getList().subscribe(data => {
      this.localMarkets = data;
    });
  }

  // Método para editar
  editar(localmarket: LocalMarket): void {
    // Implementar navegación a editar
    console.log('Editando mercado:', localmarket.idLocalMarket);
  }

  // Método para eliminar
  eliminar(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este mercado?')) {
      this.lS.deleteA(id).subscribe({
        next: () => {
          this.lS.list().subscribe(data => {
            this.localMarkets = data;
            this.lS.setList(data);
          });
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
        }
      });
    }
  }
}