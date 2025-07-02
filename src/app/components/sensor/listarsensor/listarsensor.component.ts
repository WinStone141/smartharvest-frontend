import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sensor } from '../../../models/sensor';
import { SensorService } from '../../../services/sensor.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarsensor',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule, MatCardModule,
    MatTooltipModule,
    CommonModule],
  templateUrl: './listarsensor.component.html',
  styleUrl: './listarsensor.component.css'
})
export class ListarsensorComponent implements OnInit {
  dataSource: MatTableDataSource<Sensor> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private sS: SensorService) {}

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.sS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.sS.deleteA(id).subscribe(data => {
      this.sS.list().subscribe(data => {
        this.sS.setList(data)
      })
    })
  }
}
