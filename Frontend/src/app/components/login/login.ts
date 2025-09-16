import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  email: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login() {
    console.log("📤 Enviando datos de login:", {
      email: this.email,
      contrasena: this.contrasena
    });
    this.http.post<any>('http://localhost:3000/api/auth/login', { email: this.email, contrasena: this.contrasena })
      .subscribe({
        next: (response) => {
          console.log("✅ Respuesta login:", response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.authService.setUser(response.user);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error("❌ Error login:", error);
          this.errorMessage = error.error.message || 'Login fallido';
        }
      });
  }
}

