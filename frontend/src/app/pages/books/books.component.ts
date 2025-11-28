import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book, PageResponse } from '../../models/models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h1 class="mb-4">📚 Book Store Catalog</h1>

      <div class="row mb-4">
        <div class="col-md-6">
          <div class="input-group">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search books..."
              [(ngModel)]="searchQuery"
              (keyup.enter)="search()"
              name="search">
            <button class="btn btn-outline-primary" type="button" (click)="search()">Search</button>
          </div>
        </div>
        <div class="col-md-6">
          <select class="form-select" [(ngModel)]="selectedCategory" (change)="filterByCategory()" name="category">
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Technology">Technology</option>
            <option value="Biography">Biography</option>
          </select>
        </div>
      </div>

      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="!loading && books.length > 0" class="row">
        <div class="col-md-4 mb-4" *ngFor="let book of books">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text text-muted">{{ book.author }}</p>
              <p class="card-text">{{ book.description | slice:0:100 }}...</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-primary">\${{ book.price }}</span>
                <span class="badge bg-success" *ngIf="book.available">Available</span>
                <span class="badge bg-danger" *ngIf="!book.available">Out of Stock</span>
              </div>
              <div class="mt-3">
                <small class="text-muted">Rating: ⭐ {{ book.rating }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!loading && books.length === 0" class="alert alert-info">
        No books found.
      </div>

      <!-- Pagination -->
      <nav *ngIf="totalPages > 1" aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" [class.disabled]="currentPage === 0">
            <button class="page-link" (click)="previousPage()">Previous</button>
          </li>
          <li class="page-item" *ngFor="let page of getPageNumbers()" [class.active]="page === currentPage">
            <button class="page-link" (click)="goToPage(page)">{{ page + 1 }}</button>
          </li>
          <li class="page-item" [class.disabled]="currentPage === totalPages - 1">
            <button class="page-link" (click)="nextPage()">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: []
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  totalPages = 0;
  currentPage = 0;
  pageSize = 9;
  loading = false;
  searchQuery = '';
  selectedCategory = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.bookService.getAllBooks(this.currentPage, this.pageSize).subscribe({
      next: (response: PageResponse<Book>) => {
        this.books = response.content;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books', error);
        this.loading = false;
      }
    });
  }

  search() {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.bookService.searchBooks(this.searchQuery, 0, this.pageSize).subscribe({
        next: (response: PageResponse<Book>) => {
          this.books = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = 0;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching books', error);
          this.loading = false;
        }
      });
    } else {
      this.currentPage = 0;
      this.loadBooks();
    }
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.loading = true;
      this.bookService.getBooksByCategory(this.selectedCategory, 0, this.pageSize).subscribe({
        next: (response: PageResponse<Book>) => {
          this.books = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = 0;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error filtering books', error);
          this.loading = false;
        }
      });
    } else {
      this.currentPage = 0;
      this.loadBooks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadBooks();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let start = Math.max(0, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxPages);

    if (end - start < maxPages) {
      start = Math.max(0, end - maxPages);
    }

    for (let i = start; i < end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
