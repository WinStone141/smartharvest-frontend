import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsensorComponent } from "./listarsensor/listarsensor.component";

@Component({
  selector: 'app-sensor',
  imports: [RouterOutlet, ListarsensorComponent],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.css'
})
export class SensorComponent {
    constructor(public route:ActivatedRoute) {}
}
