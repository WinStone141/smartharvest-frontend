import { Component, OnInit } from '@angular/core';
import { AgriculturalProduct } from '../../../models/agriculturalproduct';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AgriculturalproductService } from '../../../services/agriculturalproduct.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-listaragriculturalproduct',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule,MatCard,MatCardContent],
  templateUrl: './listaragriculturalproduct.component.html',
  styleUrl: './listaragriculturalproduct.component.css'
})
export class ListaragriculturalproductComponent implements OnInit {
  dataSource: MatTableDataSource<AgriculturalProduct> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private aS: AgriculturalproductService) {}

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.aS.deleteA(id).subscribe(data => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data)
      })
    })
  }
}
