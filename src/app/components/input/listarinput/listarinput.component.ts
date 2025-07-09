import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { InputService } from '../../../services/input.service';
import { CommonModule } from '@angular/common';
import { Inputs } from '../../../models/inputs';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-listarinput',
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
  templateUrl: './listarinput.component.html',
  styleUrl: './listarinput.component.css',
})
export class ListarinputComponent implements OnInit {
  dataSource: MatTableDataSource<Inputs> = new MatTableDataSource();

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
    'c10',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(private iS: InputService, private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del userId
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      if (userId) {
        this.loadInputs(userId);
      }
    });

    // Suscribirse a los cambios en la lista
    const listSub = this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.subscriptions.push(userIdSub, listSub);
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadInputs(userId: number): void {
    const loadSub = this.iS.list(userId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(loadSub);
  }

  eliminar(id: number): void {
    const deleteSub = this.iS.deleteA(id).subscribe(() => {
      // Recargar la lista después de eliminar
      if (this.currentUserId) {
        this.iS.list(this.currentUserId).subscribe((data) => {
          this.iS.setList(data as Inputs[]);
        });
      }
    });
    this.subscriptions.push(deleteSub);
  }
}
