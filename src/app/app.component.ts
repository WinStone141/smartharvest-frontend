import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CompanyComponent } from "./components/company/company.component";
import { LocalmarketComponent } from './components/localmarket/localmarket.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartHarvestFrontend';
}
