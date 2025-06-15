import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule  } from '@angular/material/table';
import { LocalMarket } from '../../../models/localmarket';
import { LocalmarketService } from '../../../services/localmarket.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarlocalmarket',
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './listarlocalmarket.component.html',
  styleUrl: './listarlocalmarket.component.css'
})
export class ListarlocalmarketComponent implements OnInit{
  dataSource:MatTableDataSource<LocalMarket> = new MatTableDataSource<LocalMarket>()

   displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7']

  constructor(private lS:LocalmarketService) {} 

  ngOnInit(): void {
    this.lS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.lS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.lS.deleteA(id).subscribe(data => {
      this.lS.list().subscribe(data => {
        this.lS.setList(data)
      })
    })
  }
}
