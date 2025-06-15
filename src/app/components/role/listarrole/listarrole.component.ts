import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarrole',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit{
  dataSource:MatTableDataSource<Role> = new MatTableDataSource<Role>()

   displayedColumns:string[]=['c1','c2','c3','c4','c5']

  constructor(private rS:RoleService) {} 

    ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
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
