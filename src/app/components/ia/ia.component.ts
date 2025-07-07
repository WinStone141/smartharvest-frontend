import { Component } from '@angular/core';
import { IaOpenrouterService } from '../../services/ia-openrouter.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ia',
  imports: [CommonModule,FormsModule, MatIconModule],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.css'
})
export class IaComponent {
pregunta: string = '';
  respuesta: string = '';
  cargando = false;

  constructor(private iaService: IaOpenrouterService) {}

  preguntarIA() {
    if (!this.pregunta) return;

    this.cargando = true;
    this.respuesta = '';

    this.iaService.consultarOpenRouter(this.pregunta).subscribe({
      next: (res) => {
        this.respuesta = res.choices?.[0]?.message?.content || 'Sin respuesta';
        this.cargando = false;
      },
      error: () => {
        this.respuesta = 'Ocurrió un error al consultar la IA.';
        this.cargando = false;
      }
    });
  }
}
