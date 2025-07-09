import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CropService } from '../../../services/crop.service';
import { BaseChartDirective } from 'ng2-charts';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-harvestbycroptype',
  imports: [BaseChartDirective, ReactiveFormsModule],
  templateUrl: './harvestbycroptype.component.html',
  styleUrl: './harvestbycroptype.component.css',
})
export class HarvestbycroptypeComponent {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  private currentUserId: number | null = null;

  rangeForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor(private cS: CropService, private loginService: LoginService) {}

  onSubmit() {
    const userIdSub = this.loginService.getUserId().subscribe((userId) => {
      this.currentUserId = userId;
    });

    const { startDate, endDate } = this.rangeForm.value;
    if (startDate && endDate) {
      this.cS
        .getHarvestByCropTypeInRange(startDate, endDate, this.currentUserId!)
        .subscribe((data) => {
          this.barChartLabels = data.map((item) => item.typeCrop);
          this.barChartData = [
            {
              data: data.map((item) => item.quantity),
              label: 'Cosechas por tipo de cultivo',
              backgroundColor: ['#58a4b0', '#a9def9', '#61c0bf'],
              borderColor: '#007c91',
              borderWidth: 1,
            },
          ];
        });
    }
  }
}
