import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">Register</h2>
              <form (ngSubmit)="register()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username" 
                    [(ngModel)]="formData.username" 
                    name="username"
                    required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    [(ngModel)]="formData.email" 
                    name="email"
                    required>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="firstName" 
                      [(ngModel)]="formData.firstName" 
                      name="firstName">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="lastName" 
                      [(ngModel)]="formData.lastName" 
                      name="lastName">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    [(ngModel)]="formData.password" 
                    name="password"
                    required>
                </div>
                <button type="submit" class="btn btn-primary w-100" [disabled]="loading">
                  {{ loading ? 'Registering...' : 'Register' }}
                </button>
              </form>
              <p class="text-center mt-3">
                Already have an account? <a routerLink="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  formData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.authService.register(this.formData).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.authService.setCurrentUser(response.user);
        this.router.navigate(['/books']);
      },
      error: (error) => {
        alert('Registration failed: ' + (error.error?.message || 'Unknown error'));
        this.loading = false;
      }
    });
  }
}
