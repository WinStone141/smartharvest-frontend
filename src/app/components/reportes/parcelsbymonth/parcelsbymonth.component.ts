import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ParcelService } from '../../../services/parcel.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-parcelsbymonth',
  imports: [ReactiveFormsModule, BaseChartDirective],
  templateUrl: './parcelsbymonth.component.html',
  styleUrl: './parcelsbymonth.component.css'
})
export class ParcelsbymonthComponent {
  form: FormGroup;
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: ParcelService, private fb: FormBuilder) {
    this.form = this.fb.group({
      year: ['']
    });
  }

  getParcels() {
    const year = this.form.value.year;
    this.pS.getParcelsByMonth(year).subscribe(data => {
      this.barChartLabels = data.map(item => item.mes);
      this.barChartData = [
        {
          data: data.map(item => item.cantidad),
          label: 'Parcelas registradas',
          backgroundColor: '#6aa84f',
          borderColor: '#38761d',
          borderWidth: 1
        }
      ];
    });
  }
}
