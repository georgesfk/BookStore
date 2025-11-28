# Development Guide

## Project Overview

BookStore is a full-stack web application for managing an online bookstore with user authentication, book catalog management, and order processing.

## Architecture

### Backend (Spring Boot)
```
REST API
    ↓
Controller Layer
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Database (H2/PostgreSQL)
```

### Frontend (Angular)
```
User Interface
    ↓
Components
    ↓
Services (HTTP Calls)
    ↓
Interceptors (JWT)
    ↓
Backend API
```

## Development Workflow

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```

API runs on: `http://localhost:8080`

### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```

App runs on: `http://localhost:4200`

### 3. Test API
```bash
curl -X GET http://localhost:8080/api/v1/books
```

### 4. Access API Documentation
```
http://localhost:8080/swagger-ui.html
```

## Key Classes & Methods

### Backend

#### AuthService
```java
public AuthResponse register(RegisterRequest request)
public AuthResponse login(AuthRequest request)
```

#### BookService
```java
public Page<BookDTO> getAllBooks(Pageable pageable)
public BookDTO getBookById(Long id)
public Page<BookDTO> searchBooks(String search, Pageable pageable)
public BookDTO createBook(BookDTO bookDTO)
public BookDTO updateBook(Long id, BookDTO bookDTO)
public void deleteBook(Long id)
```

#### JwtTokenProvider
```java
public String generateToken(Authentication authentication)
public String getUsernameFromJWT(String token)
public boolean validateToken(String authToken)
```

### Frontend

#### AuthService
```typescript
register(request: RegisterRequest): Observable<AuthResponse>
login(request: AuthRequest): Observable<AuthResponse>
logout(): void
getToken(): string | null
isAuthenticated(): boolean
```

#### BookService
```typescript
getAllBooks(page, size, sortBy, direction): Observable<PageResponse<Book>>
getBookById(id): Observable<Book>
searchBooks(query, page, size): Observable<PageResponse<Book>>
getBooksByCategory(category, page, size): Observable<PageResponse<Book>>
createBook(book): Observable<Book>
updateBook(id, book): Observable<Book>
deleteBook(id): Observable<void>
```

## Adding New Features

### Add a New Endpoint (Backend)

1. Create DTO in `dto/`
2. Create Entity in `entity/`
3. Create Repository in `repository/`
4. Create Service in `service/`
5. Create Controller in `controller/`

Example: Adding Reviews Feature

```java
// 1. ReviewDTO.java
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ReviewDTO {
    private Long id;
    private String content;
    private int rating;
    private Long bookId;
    private Long userId;
}

// 2. Review.java (Entity)
@Entity @Table(name = "reviews")
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne private Book book;
    @ManyToOne private User user;
    private String content;
    private int rating;
}

// 3. ReviewRepository.java
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBookId(Long bookId);
}

// 4. ReviewService.java
@Service
public class ReviewService {
    public List<ReviewDTO> getBookReviews(Long bookId) {
        // Implementation
    }
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        // Implementation
    }
}

// 5. ReviewController.java
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<ReviewDTO>> getBookReviews(@PathVariable Long bookId) {
        // Implementation
    }
    
    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        // Implementation
    }
}
```

### Add a New Component (Frontend)

1. Generate component: `ng generate component pages/reviews`
2. Create Service: `ng generate service services/review`
3. Add to Routes
4. Implement Logic

Example:

```typescript
// review.service.ts
@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private http: HttpClient) {}
  
  getBookReviews(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/book/${bookId}`);
  }
  
  createReview(review: ReviewDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(`${this.apiUrl}/reviews`, review);
  }
}

// reviews.component.ts
@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<!-- Template -->`
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  
  constructor(private reviewService: ReviewService) {}
  
  ngOnInit() {
    this.loadReviews();
  }
  
  loadReviews() {
    this.reviewService.getBookReviews(this.bookId).subscribe(
      data => this.reviews = data
    );
  }
}
```

## Database Schema Changes

### Add New Table

1. Create Entity class
2. Update `application.properties`:
   ```properties
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Spring will auto-generate the table

### Update Existing Table

1. Modify Entity class
2. Add new fields with JPA annotations
3. Update related DTOs and Services

## Testing

### Backend Unit Test Example

```java
@SpringBootTest
class AuthServiceTest {
    @MockBean
    private UserRepository userRepository;
    
    @Autowired
    private AuthService authService;
    
    @Test
    void testRegister() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser");
        // Test implementation
    }
}
```

### Frontend Unit Test Example

```typescript
describe('BookService', () => {
  let service: BookService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BookService(httpClientSpy);
  });

  it('should get books', () => {
    const mockBooks = [{ id: 1, title: 'Book 1' }];
    httpClientSpy.get.and.returnValue(of(mockBooks));
    
    service.getAllBooks(0, 10).subscribe(response => {
      expect(response.content).toEqual(mockBooks);
    });
  });
});
```

## Performance Tips

### Backend
- Use pagination for large datasets
- Implement caching for frequently accessed data
- Use database indexes appropriately
- Lazy load relationships

### Frontend
- Use OnPush change detection
- Lazy load routes
- Implement virtual scrolling for large lists
- Optimize images

## Debugging

### Backend
- Use IDE debugger
- Check logs: `logging.level.com.bookstore=DEBUG`
- Use breakpoints in Spring Security

### Frontend
- Use Chrome DevTools
- RxJS DevTools extension
- Check Network tab
- Monitor API calls

## Common Issues

### Issue: CORS Error
**Solution**: Check SecurityConfig allowed origins

### Issue: JWT Expired
**Solution**: Implement token refresh logic

### Issue: Database Connection Failed
**Solution**: Verify connection string and credentials

## Best Practices

1. **Security**
   - Always validate input
   - Use HTTPS in production
   - Keep secrets in environment variables
   - Implement rate limiting

2. **Performance**
   - Use indexes on frequently queried fields
   - Implement caching
   - Optimize API responses
   - Minimize bundle size

3. **Code Quality**
   - Write unit tests
   - Use design patterns
   - Keep methods small
   - Document complex logic

4. **Documentation**
   - Add JavaDoc comments
   - Document API endpoints
   - Keep README updated
   - Add inline code comments

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [JWT.io](https://jwt.io)
- [RESTful API Design](https://restfulapi.net)

---

Happy Coding! 🚀
