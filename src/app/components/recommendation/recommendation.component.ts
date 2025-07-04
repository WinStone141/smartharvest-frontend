import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecommendationComponent } from "./listarrecommendation/listarrecommendation.component";

@Component({
  selector: 'app-recommendation',
  imports: [RouterOutlet, ListarrecommendationComponent],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent {
  constructor(public route:ActivatedRoute) {}
}
