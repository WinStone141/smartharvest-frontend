import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/newuser']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
