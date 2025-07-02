import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit{
  role: string | null = null;
  estaLogueado: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // Escucha en tiempo real el estado de login
    this.loginService.getLoginStatus().subscribe(status => {
      this.estaLogueado = status;
      this.role = status ? this.loginService.showRole() : null;
    });
  }
  cerrar() {
    this.loginService.logout();
  }
  
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isAgricultor() {
    return this.role === 'AGRICULTOR';
  }

  isOwner() {
    return this.role === 'DUEÑO_DE_MERCADO';
  }
}
