import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { SensorService } from '../../../services/sensor.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-typesensoraactive',
  imports: [BaseChartDirective],
  templateUrl: './typesensoraactive.component.html',
  styleUrl: './typesensoraactive.component.css'
})
export class TypesensoraactiveComponent {
  barChartOptions:ChartOptions={
          responsive:true
        }
        barChartLabels:string[]=[]
        barChartType:ChartType='pie'
        barChartLegend=true
        barChartData:ChartDataset[]=[]
        
        constructor(private mS:SensorService){}
        
        ngOnInit(): void {
        this.mS.getActiveSensorbySensorType().subscribe(data=>{
          this.barChartLabels=data.map(item=>item.sensorType)
          this.barChartData=[
            {
              data:data.map(item=>item.cantidad),
              label:'Cantidad de sensores activos',
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
