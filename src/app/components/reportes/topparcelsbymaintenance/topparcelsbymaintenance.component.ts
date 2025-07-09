import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CropService } from '../../../services/crop.service';
import { BaseChartDirective } from 'ng2-charts';
import { MaintenanceService } from '../../../services/maintenance.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-topparcelsbymaintenance',
  imports: [BaseChartDirective],
  templateUrl: './topparcelsbymaintenance.component.html',
  styleUrl: './topparcelsbymaintenance.component.css',
})
export class TopparcelsbymaintenanceComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  private currentUserId: number | null = null;

  constructor(
    private mS: MaintenanceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });

    this.mS.getParcelsByMaintenance(this.currentUserId!).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.parcelName);
      this.barChartData = [
        {
          data: data.map((item) => item.quant_maintenance),
          label: 'Cantidad de mantenimientos',
          backgroundColor: ['#b5ed72', '#6cb90e', '#5d8927'],
          borderColor: '#90de31',
          borderWidth: 1,
        },
      ];
    });
  }
}
