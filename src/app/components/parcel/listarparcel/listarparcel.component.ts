import { Component, OnInit } from '@angular/core';
import { Parcel } from '../../../models/parcel';
import { ParcelService } from '../../../services/parcel.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-listarparcel',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule,MatCard,MatCardContent],
  templateUrl: './listarparcel.component.html',
  styleUrl: './listarparcel.component.css'
})
export class ListarparcelComponent implements OnInit {
  dataSource: MatTableDataSource<Parcel> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8','c9'];

  constructor(private iS: ParcelService) {}

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.iS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.iS.deleteA(id).subscribe(data => {
      this.iS.list().subscribe(data => {
        this.iS.setList(data)
      })
    })
  }
}
