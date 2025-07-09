import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaintenanceService } from '../../../services/maintenance.service';
import { CommonModule } from '@angular/common';
import { Maintenance } from '../../../models/maintenance';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarmaintenance',
  imports: [
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatCard,
    MatCardContent,
    MatPaginatorModule,
  ],
  templateUrl: './listarmaintenance.component.html',
  styleUrl: './listarmaintenance.component.css',
})
export class ListarmaintenanceComponent {
  dataSource: MatTableDataSource<Maintenance> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(
    private mS: MaintenanceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      if (userId) {
        this.loadAgriculturalProduct(userId);
      }
    });

    // Suscribirse a los cambios en la lista
    const listSub = this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.subscriptions.push(userIdSub, listSub);
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadAgriculturalProduct(userId: number): void {
    const loadSub = this.mS.list(userId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(loadSub);
  }

  eliminar(id: number) {
    const deleteSub = this.mS.deleteA(id).subscribe(() => {
      // Recargar la lista después de eliminar
      if (this.currentUserId) {
        this.mS.list(this.currentUserId).subscribe((data) => {
          this.mS.setList(data as Maintenance[]);
        });
      }
    });
    this.subscriptions.push(deleteSub);
  }
}
