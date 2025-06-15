import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { InputService } from '../../../services/input.service';
import { CommonModule } from '@angular/common';
import { Inputs } from '../../../models/inputs';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarinput',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './listarinput.component.html',
  styleUrl: './listarinput.component.css'
})
export class ListarinputComponent implements OnInit{
  dataSource: MatTableDataSource<Inputs> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8','c9','c10'];

  constructor(private iS: InputService) {}

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
