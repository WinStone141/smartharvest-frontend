import { Component, OnInit } from '@angular/core';
import { LocalmarketService } from '../../../services/localmarket.service';
import { LoginService } from '../../../services/login.service';
import { LocalMarket } from '../../../models/localmarket';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarlocalmarket',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  templateUrl: './listarlocalmarket.component.html',
  styleUrl: './listarlocalmarket.component.css',
})
export class ListarlocalmarketComponent implements OnInit {
  localMarkets: LocalMarket[] = [];
  pagedMarkets: LocalMarket[] = []; // lista paginada que se mostrará
  pageSize = 4;
  currentPage = 0;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(
    private lS: LocalmarketService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      if (userId) {
        this.loadLocalMarkets(userId);
      }
    });

    const listSub = this.lS.getList().subscribe((data) => {
      this.localMarkets = data;
      this.updatePagedMarkets();
    });

    this.subscriptions.push(userSub, listSub);
  }

  private loadLocalMarkets(userId: number): void {
    const loadSub = this.lS.list(userId).subscribe((data) => {
      this.localMarkets = data;
      this.updatePagedMarkets();
    });
    this.subscriptions.push(loadSub);
  }
  onPageChange(event: any): void {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.updatePagedMarkets();
  }
  
  private updatePagedMarkets(): void {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedMarkets = this.localMarkets.slice(startIndex, endIndex);
}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Verifica si el usuario actual puede crear mercados locales
   * Solo ADMIN y DUEÑO_DE_MERCADO pueden crear
   */
  canCreateMarket(): boolean {
    const userRole = this.loginService.showRole();
    return userRole === 'ADMIN' || userRole === 'DUEÑO_DE_MERCADO';
  }

  /**
   * Verifica si el usuario actual puede editar mercados locales
   * Solo ADMIN y DUEÑO_DE_MERCADO pueden editar
   */
  canEditMarket(): boolean {
    const userRole = this.loginService.showRole();
    return userRole === 'ADMIN' || userRole === 'DUEÑO_DE_MERCADO';
  }

  /**
   * Verifica si el usuario actual puede eliminar mercados locales
   * Solo ADMIN y DUEÑO_DE_MERCADO pueden eliminar
   */
  canDeleteMarket(): boolean {
    const userRole = this.loginService.showRole();
    return userRole === 'ADMIN' || userRole === 'DUEÑO_DE_MERCADO';
  }

  /**
   * Obtiene el rol actual del usuario para mostrar en la interfaz (opcional)
   */
  getCurrentUserRole(): string {
    return this.loginService.showRole() || 'Sin rol';
  }

  // Método para editar
  editar(localmarket: LocalMarket): void {
    // Verificar permisos antes de permitir editar
    if (!this.canEditMarket()) {
      alert('No tienes permisos para editar mercados locales.');
      return;
    }
    console.log('Editando mercado:', localmarket.idLocalMarket);
  }

  // Método para eliminar
  eliminar(id: number): void {
    // Verificar permisos antes de permitir eliminar
    if (!this.canDeleteMarket()) {
      alert('No tienes permisos para eliminar mercados locales.');
      return;
    }

    if (confirm('¿Está seguro de que desea eliminar este mercado?')) {
      this.lS.deleteA(id).subscribe({
        next: () => {
          if (this.currentUserId) {
            this.lS.list(this.currentUserId).subscribe(data => {
              this.localMarkets = data;
              this.lS.setList(data);
            });
          }
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el mercado. Inténtalo nuevamente.');
        },
      });
    }
  }

  onImageError(event: any): void {
    // Si la imagen no se encuentra, mostrar una imagen por defecto con CSS
    event.target.style.display = 'none';
    event.target.parentElement.classList.add('image-error');
  }
}