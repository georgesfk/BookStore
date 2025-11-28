# BookStore Backend - Spring Boot REST API

Professional REST API for BookStore application with JWT authentication and role-based security.

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+

### Installation

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

## Project Structure

```
src/main/java/com/bookstore/bookstorebackend/
├── config/              # Security, CORS configuration
├── controller/          # REST endpoints
├── dto/                 # Data Transfer Objects
├── entity/              # JPA entities
├── exception/           # Custom exceptions
├── repository/          # Database access
├── security/            # JWT and authentication
├── service/             # Business logic
└── util/                # Utility classes
```

## Key Features

1. **JWT Authentication**
   - Secure token generation and validation
   - Token expiration management
   - Refresh token support

2. **Role-Based Access Control**
   - ROLE_USER: Standard user
   - ROLE_ADMIN: Administrator
   - ROLE_MODERATOR: Content moderator

3. **RESTful API**
   - Comprehensive book management
   - User authentication and registration
   - Order processing
   - Advanced search and filtering

4. **Exception Handling**
   - Global exception handler
   - Validation error messages
   - Consistent error response format

5. **API Documentation**
   - Swagger/OpenAPI 3.0
   - Interactive API explorer
   - Auto-generated documentation

## Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# Database (H2)
spring.datasource.url=jdbc:h2:mem:bookstoredb
spring.jpa.hibernate.ddl-auto=create-drop

# JWT
jwt.secret=your-secret-key
jwt.expiration=86400000

# Logging
logging.level.com.bookstore.bookstorebackend=DEBUG
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Books
- `GET /api/v1/books` - List all books
- `GET /api/v1/books/{id}` - Get book by ID
- `GET /api/v1/books/search` - Search books
- `GET /api/v1/books/category/{category}` - Filter by category
- `POST /api/v1/books` - Create book (ADMIN)
- `PUT /api/v1/books/{id}` - Update book (ADMIN)
- `DELETE /api/v1/books/{id}` - Delete book (ADMIN)

## Security

### JWT Token
```
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...
```

### Roles and Permissions
- Public endpoints: `/api/v1/auth/**`, `/api/v1/books` (GET)
- User endpoints: `/api/v1/orders/**`, `/api/v1/users/**`
- Admin endpoints: `/api/v1/admin/**`, `/api/v1/books` (POST/PUT/DELETE)

## Database

H2 in-memory database for development.

### Access H2 Console
http://localhost:8080/h2-console
- URL: `jdbc:h2:mem:bookstoredb`
- User: `sa`
- Password: (leave blank)

## Building & Deployment

### Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package -DskipTests
java -jar target/bookstore-backend-1.0.0.jar
```

### Docker
```bash
mvn spring-boot:build-image
docker run -p 8080:8080 bookstore-backend:1.0.0
```

## Testing

```bash
mvn test
```

## Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **CORS error**
   - Update allowed origins in `SecurityConfig.java`

3. **JWT validation failed**
   - Check token expiration
   - Verify secret key matches

## Dependencies

- Spring Boot 3.2.0
- Spring Security 6
- Spring Data JPA
- JWT (jjwt)
- Lombok
- PostgreSQL Driver
- H2 Database
- Springdoc OpenAPI

## Documentation

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Future Improvements

- [ ] Caching (Redis)
- [ ] Async processing
- [ ] Message queue (Kafka)
- [ ] Metrics (Micrometer)
- [ ] Distributed tracing (Sleuth)
- [ ] Circuit breaker (Resilience4j)
