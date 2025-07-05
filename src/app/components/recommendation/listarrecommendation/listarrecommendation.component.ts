import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Recommendation } from '../../../models/recommendation';
import { RecommendationService } from '../../../services/recommendation.service';

@Component({
  selector: 'app-listarrecommendation',
  imports: [
    MatTableModule, 
    RouterLink, 
    MatIconModule, 
    MatButtonModule, 
    CommonModule,
    MatCard,
    MatCardContent,
    MatPaginatorModule
  ],
  templateUrl: './listarrecommendation.component.html',
  styleUrl: './listarrecommendation.component.css'
})
export class ListarrecommendationComponent implements OnInit {
  dataSource: MatTableDataSource<Recommendation> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8','c9'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private rS: RecommendationService) {}
  
    ngOnInit(): void {
      this.rS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
      this.rS.getList().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
    }
  
    eliminar(id: number) {
      this.rS.deleteA(id).subscribe(data => {
        this.rS.list().subscribe(data => {
          this.rS.setList(data)
        })
      })
    }


}
