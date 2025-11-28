import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">Login</h2>
              <form (ngSubmit)="login()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    [(ngModel)]="credentials.username" 
                    name="username"
                    required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    [(ngModel)]="credentials.password" 
                    name="password"
                    required>
                </div>
                <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
                  {{ loading ? 'Logging in...' : 'Login' }}
                </button>
              </form>
              <p class="text-center mt-3">
                Don't have an account? <a routerLink="/register">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  credentials: AuthRequest = { username: '', password: '' };
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.authService.setCurrentUser(response.user);
        this.router.navigate(['/books']);
      },
      error: (error) => {
        alert('Login failed: ' + (error.error?.message || 'Unknown error'));
        this.loading = false;
      }
    });
  }
}
