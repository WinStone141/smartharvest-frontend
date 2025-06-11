import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarinputComponent } from "./listarinput/listarinput.component";

@Component({
  selector: 'app-input',
  imports: [RouterOutlet, ListarinputComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
    constructor(public route:ActivatedRoute) {}
}
