import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarrole',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit{
  dataSource:MatTableDataSource<Role> = new MatTableDataSource<Role>()

   displayedColumns:string[]=['c1','c2','c3']

  constructor(private rS:RoleService) {} 

  ngOnInit(): void {
      this.rS.list().subscribe(data=>{
        this.dataSource.data = data;
      })
  }
}
