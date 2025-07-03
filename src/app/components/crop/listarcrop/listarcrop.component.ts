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

@Component({
  selector: 'app-listarcrop',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule,MatCard,MatCardContent,MatPaginatorModule],
  templateUrl: './listarcrop.component.html',
  styleUrl: './listarcrop.component.css'
})
export class ListarcropComponent implements OnInit {
  dataSource: MatTableDataSource<Crop> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private cS: CropService) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number) {
    this.cS.deleteA(id).subscribe(data => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data)
      })
    })
  }
}
