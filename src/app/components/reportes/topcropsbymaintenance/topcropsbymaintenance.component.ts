import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CropService } from '../../../services/crop.service';
import { BaseChartDirective } from 'ng2-charts';
import { MaintenanceService } from '../../../services/maintenance.service';

@Component({
  selector: 'app-topcropsbymaintenance',
  imports: [BaseChartDirective],
  templateUrl: './topcropsbymaintenance.component.html',
  styleUrl: './topcropsbymaintenance.component.css'
})
export class TopcropsbymaintenanceComponent implements OnInit {
  barChartOptions:ChartOptions={
        responsive:true
      }
      barChartLabels:string[]=[]
      barChartType:ChartType='line'
      barChartLegend=true
      barChartData:ChartDataset[]=[]
      
      constructor(private mS:MaintenanceService){}
      
      ngOnInit(): void {
      this.mS.getCropsByMaintenance().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.type_crop)
        this.barChartData=[
          {
            data:data.map(item=>item.quant_maintenance),
            label:'Cantidad de mantenimientos',
            backgroundColor:[
              '#b5ed72',
              '#6cb90e',
              '#5d8927'
            ],
            borderColor:'#90de31',
            borderWidth:1
          }
        ]
      })  
      }
}
