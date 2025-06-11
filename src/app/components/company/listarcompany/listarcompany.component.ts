import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-listarcompany',
  imports: [MatTableModule],
  templateUrl: './listarcompany.component.html',
  styleUrl: './listarcompany.component.css',
})
export class ListarcompanyComponent implements OnInit {
  dataSource: MatTableDataSource<Company> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private cS: CompanyService) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
