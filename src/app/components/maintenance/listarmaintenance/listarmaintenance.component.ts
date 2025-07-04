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

@Component({
  selector: 'app-listarmaintenance',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule,MatCard,MatCardContent,MatPaginatorModule],
  templateUrl: './listarmaintenance.component.html',
  styleUrl: './listarmaintenance.component.css'
})
export class ListarmaintenanceComponent implements OnInit{
  dataSource: MatTableDataSource<Maintenance> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private mS: MaintenanceService) {}

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    this.mS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number) {
    this.mS.deleteA(id).subscribe(data => {
      this.mS.list().subscribe(data => {
        this.mS.setList(data)
      })
    })
  }
}
