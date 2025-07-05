import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { RecommendationService } from '../../../services/recommendation.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-recommendationsbymonth',
  imports: [ReactiveFormsModule, BaseChartDirective],
  templateUrl: './recommendationsbymonth.component.html',
  styleUrl: './recommendationsbymonth.component.css'
})
export class RecommendationsbymonthComponent {
  form: FormGroup;
    barChartOptions: ChartOptions = { responsive: true };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
  
    constructor(private rS: RecommendationService, private fb: FormBuilder) {
      this.form = this.fb.group({
        year: ['']
      });
    }
  
    getRecommendations() {
      const year = this.form.value.year;
      this.rS.getRecommendationsByMonth(year).subscribe(data => {
        this.barChartLabels = data.map(item => item.mes);
        this.barChartData = [
          {
            data: data.map(item => item.quantity),
            label: 'Recomendaciones registradas',
            backgroundColor: '#6aa84f',
            borderColor: '#38761d',
            borderWidth: 1
          }
        ];
      });
    }
}
