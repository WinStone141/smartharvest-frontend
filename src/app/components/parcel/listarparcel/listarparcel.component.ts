import { Component, OnInit } from '@angular/core';
import { Parcel } from '../../../models/parcel';
import { ParcelService } from '../../../services/parcel.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listarparcel',
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
  templateUrl: './listarparcel.component.html',
  styleUrl: './listarparcel.component.css',
})
export class ListarparcelComponent implements OnInit {
  dataSource: MatTableDataSource<Parcel> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(private pS: ParcelService, private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del userId
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      if (userId) {
        this.loadParcels(userId);
      }
    });

    // Suscribirse a los cambios en la lista
    const listSub = this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.subscriptions.push(userIdSub, listSub);
  }

  private loadParcels(userId: number): void {
    const loadSub = this.pS.list(userId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(loadSub);
  }

  eliminar(id: number) {
    const deleteSub = this.pS.deleteA(id).subscribe(() => {
      // Recargar la lista después de eliminar
      if (this.currentUserId) {
        this.pS.list(this.currentUserId).subscribe((data) => {
          this.pS.setList(data as Parcel[]);
        });
      }
    });
    this.subscriptions.push(deleteSub);
  }
}
