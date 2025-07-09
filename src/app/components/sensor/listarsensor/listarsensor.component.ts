import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sensor } from '../../../models/sensor';
import { SensorService } from '../../../services/sensor.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-listarsensor',
  imports: [
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarsensor.component.html',
  styleUrl: './listarsensor.component.css',
})
export class ListarsensorComponent implements OnInit {
  dataSource: MatTableDataSource<Sensor> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private subscriptions: Subscription[] = [];
  private currentUserId: number | null = null;

  constructor(private sS: SensorService, private loginService: LoginService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del userId
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
      if (userId) {
        this.loadSensors(userId);
      }
    });

    // Suscribirse a los cambios en la lista
    const listSub = this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.subscriptions.push(userIdSub, listSub);
  }

  private loadSensors(userId: number): void {
    const loadSub = this.sS.list(userId).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.subscriptions.push(loadSub);
  }

  eliminar(id: number) {
    const deleteSub = this.sS.deleteA(id).subscribe(() => {
      // Recargar la lista después de eliminar
      if (this.currentUserId) {
        this.sS.list(this.currentUserId).subscribe((data) => {
          this.sS.setList(data as Sensor[]);
        });
      }
    });
    this.subscriptions.push(deleteSub);
  }
}
