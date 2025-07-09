import { Component, OnInit, ViewChild } from '@angular/core';
import { AgriculturalProduct } from '../../../models/agriculturalproduct';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AgriculturalproductService } from '../../../services/agriculturalproduct.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listaragriculturalproduct',
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
  templateUrl: './listaragriculturalproduct.component.html',
  styleUrl: './listaragriculturalproduct.component.css',
})
export class ListaragriculturalproductComponent implements OnInit {
  dataSource: MatTableDataSource<AgriculturalProduct> =
    new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(
    private aS: AgriculturalproductService,
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
    const listSub = this.aS.getList().subscribe((data) => {
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
    const loadSub = this.aS.list(userId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(loadSub);
  }

  eliminar(id: number) {
    const deleteSub = this.aS.deleteA(id).subscribe(() => {
      // Recargar la lista después de eliminar
      if (this.currentUserId) {
        this.aS.list(this.currentUserId).subscribe((data) => {
          this.aS.setList(data as AgriculturalProduct[]);
        });
      }
    });
    this.subscriptions.push(deleteSub);
  }
}
