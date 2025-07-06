import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/role';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarrole',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule,MatCard,MatCardContent,MatPaginatorModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit{
  dataSource:MatTableDataSource<Role> = new MatTableDataSource<Role>()

  displayedColumns:string[]=['c1','c2','c3','c4','c5']

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; //PAGINATOR


  constructor(private rS:RoleService) {} 

    ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;//paginator

    })
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;//paginator
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
