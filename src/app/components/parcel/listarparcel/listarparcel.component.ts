import { Component, OnInit } from '@angular/core';
import { Parcel } from '../../../models/parcel';
import { ParcelService } from '../../../services/parcel.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarparcel',
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarparcel.component.html',
  styleUrl: './listarparcel.component.css'
})
export class ListarparcelComponent implements OnInit {
  dataSource: MatTableDataSource<Parcel> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private iS: ParcelService) {}

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
