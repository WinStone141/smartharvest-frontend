import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { SensorService } from '../../../services/sensor.service';
import { BaseChartDirective } from 'ng2-charts';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-typesensoraactive',
  imports: [BaseChartDirective],
  templateUrl: './typesensoraactive.component.html',
  styleUrl: './typesensoraactive.component.css',
})
export class TypesensoraactiveComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  private currentUserId: number | null = null;

  constructor(private mS: SensorService, private loginService: LoginService) {}

  ngOnInit(): void {
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });

    this.mS
      .getActiveSensorbySensorType(this.currentUserId!)
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.sensorType);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de sensores activos',
            backgroundColor: ['#b5ed72', '#6cb90e', '#5d8927'],
            borderColor: '#90de31',
            borderWidth: 1,
          },
        ];
      });
  }
}
