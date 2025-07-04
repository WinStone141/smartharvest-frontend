import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmaintenanceComponent } from "./listarmaintenance/listarmaintenance.component";

@Component({
  selector: 'app-maintenance',
  imports: [RouterOutlet, ListarmaintenanceComponent],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent {
    constructor(public route:ActivatedRoute) {}
}