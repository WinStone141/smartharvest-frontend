import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CompanyComponent } from "./components/company/company.component";
import { LocalmarketComponent } from './components/localmarket/localmarket.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartHarvestFrontend';
}
