import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule  } from '@angular/material/table';
import { LocalMarket } from '../../../models/localmarket';
import { LocalmarketService } from '../../../services/localmarket.service';

@Component({
  selector: 'app-listarlocalmarket',
  imports: [MatTableModule],
  templateUrl: './listarlocalmarket.component.html',
  styleUrl: './listarlocalmarket.component.css'
})
export class ListarlocalmarketComponent implements OnInit{
  dataSource:MatTableDataSource<LocalMarket> = new MatTableDataSource<LocalMarket>()

   displayedColumns:string[]=['c1','c2','c3','c4','c5']

  constructor(private lS:LocalmarketService) {} 

  ngOnInit(): void {
      this.lS.list().subscribe(data=>{
        this.dataSource.data = data;
      })
  }
}
