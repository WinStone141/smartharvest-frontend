import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcropComponent } from "./listarcrop/listarcrop.component";

@Component({
  selector: 'app-crop',
  imports: [RouterOutlet, ListarcropComponent],
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.css'
})
export class CropComponent {
  constructor(public route:ActivatedRoute) {}
}
