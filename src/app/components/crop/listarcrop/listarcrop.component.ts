import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Crop } from '../../../models/crop';
import { CropService } from '../../../services/crop.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarcrop',
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
  templateUrl: './listarcrop.component.html',
  styleUrl: './listarcrop.component.css',
})
export class ListarcropComponent implements OnInit {
  dataSource: MatTableDataSource<Crop> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(private cS: CropService, private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del userId
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      if (userId) {
        this.loadCrops(userId);
      }
    });

    // Suscribirse a los cambios en la lista
    const listSub = this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.subscriptions.push(userIdSub, listSub);
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadCrops(userId: number): void {
    const loadSub = this.cS.list(userId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(loadSub);
  }

  eliminar(id: number) {
    const deleteSub = this.cS.deleteA(id).subscribe(() => {
      // Recargar la lista después de eliminar
      if (this.currentUserId) {
        this.cS.list(this.currentUserId).subscribe((data) => {
          this.cS.setList(data as Crop[]);
        });
      }
    });
    this.subscriptions.push(deleteSub);
  }
}
