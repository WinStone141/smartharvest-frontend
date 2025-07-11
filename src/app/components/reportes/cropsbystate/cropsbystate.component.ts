import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CropService } from '../../../services/crop.service';
import { BaseChartDirective } from 'ng2-charts';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-cropsbystate',
  imports: [BaseChartDirective],
  templateUrl: './cropsbystate.component.html',
  styleUrl: './cropsbystate.component.css',
})
export class CropsbystateComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  private currentUserId: number | null = null;

  constructor(private cS: CropService, private loginService: LoginService) {}

  ngOnInit(): void {
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });

    this.cS.getCropsByState(this.currentUserId!).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.actualState);
      this.barChartData = [
        {
          data: data.map((item) => item.quantity),
          label: 'Cantidad de cultivos',
          backgroundColor: ['#b5ed72', '#6cb90e', '#5d8927'],
          borderColor: '#90de31',
          borderWidth: 1,
        },
      ];
    });
  }
}
