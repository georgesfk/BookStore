import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Book, PageResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  getAllBooks(page: number = 0, size: number = 10, sortBy: string = 'id', direction: string = 'ASC'): Observable<PageResponse<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);
    return this.http.get<PageResponse<Book>>(this.apiUrl, { params });
  }

  searchBooks(query: string, page: number = 0, size: number = 10): Observable<PageResponse<Book>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Book>>(`${this.apiUrl}/search`, { params });
  }

  getBooksByCategory(category: string, page: number = 0, size: number = 10): Observable<PageResponse<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Book>>(`${this.apiUrl}/category/${category}`, { params });
  }

  getAvailableBooks(page: number = 0, size: number = 10): Observable<PageResponse<Book>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Book>>(`${this.apiUrl}/available`, { params });
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
