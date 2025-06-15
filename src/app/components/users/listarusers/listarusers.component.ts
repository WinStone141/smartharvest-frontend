import { Component } from '@angular/core';
import { Users } from '../../../models/users';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { iif } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-listarusers',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent {
  dataSource:MatTableDataSource<Users> = new MatTableDataSource<Users>()

   displayedColumns:string[]=['c1','c2','c3','c4','c5']

  constructor(private uS:UsersService) {} 

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.uS.deleteA(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      })
    })
  }
}

