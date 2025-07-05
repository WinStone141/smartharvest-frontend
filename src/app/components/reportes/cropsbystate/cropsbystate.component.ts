import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CropService } from '../../../services/crop.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-cropsbystate',
  imports: [BaseChartDirective],
  templateUrl: './cropsbystate.component.html',
  styleUrl: './cropsbystate.component.css'
})
export class CropsbystateComponent {
  barChartOptions:ChartOptions={
      responsive:true
    }
    barChartLabels:string[]=[]
    barChartType:ChartType='pie'
    barChartLegend=true
    barChartData:ChartDataset[]=[]
    
    constructor(private cS:CropService){}
    
    ngOnInit(): void {
    this.cS.getCropsByState().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.actualState)
      this.barChartData=[
        {
          data:data.map(item=>item.quantity),
          label:'Cantidad de cultivos',
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
