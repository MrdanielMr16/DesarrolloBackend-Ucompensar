import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Importa esto
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule], // 👈 Agrégalo aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
  title = 'Smart Devices';
}