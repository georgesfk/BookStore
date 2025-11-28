import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/" style="font-weight: bold;">
          📚 BookStore
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/books" routerLinkActive="active">Books</a>
            </li>
            <li class="nav-item" *ngIf="!isAuthenticated">
              <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
            </li>
            <li class="nav-item" *ngIf="!isAuthenticated">
              <a class="nav-link" routerLink="/register" routerLinkActive="active">Register</a>
            </li>
            <li class="nav-item" *ngIf="isAuthenticated">
              <span class="nav-link">Welcome, {{ getCurrentUsername() }}</span>
            </li>
            <li class="nav-item" *ngIf="isAuthenticated">
              <a class="nav-link cursor-pointer" (click)="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container-fluid">
        <p class="text-center">&copy; 2024 BookStore. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .cursor-pointer {
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  isAuthenticated = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser() as User | null;
  }

  getCurrentUsername(): string | undefined {
    return this.currentUser ? this.currentUser.username : undefined;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
