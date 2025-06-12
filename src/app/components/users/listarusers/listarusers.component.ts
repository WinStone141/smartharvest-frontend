import { Component } from '@angular/core';
import { Users } from '../../../models/users';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-listarusers',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent {
  dataSource:MatTableDataSource<Users> = new MatTableDataSource<Users>()

   displayedColumns:string[]=['c1','c2','c3']

  constructor(private uS:UsersService) {} 

  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource.data = data;
      })
  }
}
