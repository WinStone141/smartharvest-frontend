import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { SensorService } from '../../../services/sensor.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-countmaintenancebysensortype',
  imports: [BaseChartDirective],
  templateUrl: './countmaintenancebysensortype.component.html',
  styleUrl: './countmaintenancebysensortype.component.css',
})
export class CountmaintenancebysensortypeComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  private currentUserId: number | null = null;

  constructor(private sS: SensorService, private loginService: LoginService) {}

  ngOnInit(): void {
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });

    this.sS
      .getMaintenanceCountbySensorType(this.currentUserId!)
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.sensorType);
        this.barChartData = [
          {
            data: data.map((item) => item.quantity),
            label: 'Cantidad de mantenimientos por tipo de sensor',
            backgroundColor: ['#b5ed72', '#6cb90e', '#5d8927'],
            borderColor: '#90de31',
            borderWidth: 1,
          },
        ];
      });
  }
}
