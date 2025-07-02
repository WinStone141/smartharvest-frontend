import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { LocalmarketComponent } from './components/localmarket/localmarket.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SmartHarvestFrontend';
  estaLogueado = false;

  constructor(private loginService: LoginService) {
    // Suscribirse a los cambios de login
    this.loginService.getLoginStatus().subscribe((status) => {
      this.estaLogueado = status;
    });
  }
}
