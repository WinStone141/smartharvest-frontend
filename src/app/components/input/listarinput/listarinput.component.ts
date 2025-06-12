import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { InputService } from '../../../services/input.service';
import { CommonModule } from '@angular/common';
import { Inputs } from '../../../models/inputs';

@Component({
  selector: 'app-listarinput',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarinput.component.html',
  styleUrl: './listarinput.component.css'
})
export class ListarinputComponent implements OnInit{
  dataSource: MatTableDataSource<Inputs> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private iS: InputService) {}

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
