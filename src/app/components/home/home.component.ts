import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  mostrarVideo = true;
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    const currentUrl = this.router.url;
    this.mostrarVideo = currentUrl === '/home';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  
  constructor(private router: Router) {}

}
