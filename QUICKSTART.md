# Quick Start Guide

Get BookStore running in minutes!

## 🚀 Fastest Way: Docker Compose

### Prerequisites
- Docker Desktop installed
- 10-15 minutes

### Steps

1. **Clone and navigate**
```bash
cd BookStore
```

2. **Start everything**
```bash
docker-compose up
```

3. **Access the application**
- Frontend: http://localhost:4200
- Backend: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui.html

## 🛠️ Local Development Setup

### Prerequisites
- Java 17+ (for backend)
- Node.js 18+ (for frontend)
- Maven 3.8+ (for backend)

### Backend Setup (Terminal 1)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend starts on: http://localhost:8080

### Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm start
```

Frontend opens at: http://localhost:4200

## 📝 First Steps

### 1. Register a New Account
- Click "Register" in the navbar
- Fill in username, email, password
- Click "Register"

### 2. Browse Books
- Click "Books" to see all available books
- Use search to find books by title or author
- Filter by category

### 3. Access API Documentation
- Visit: http://localhost:8080/swagger-ui.html
- Explore all available endpoints
- Try out API calls directly

## 🔑 Default Test Credentials

Create your own account through registration!

## 🗂️ Project Structure

```
BookStore/
├── backend/          # Spring Boot API
├── frontend/         # Angular UI
├── docker-compose.yml
└── README.md
```

## 📚 Documentation

- **[Main README](README.md)** - Project overview
- **[Backend README](backend/README.md)** - Backend documentation
- **[Frontend README](frontend/README.md)** - Frontend documentation
- **[Development Guide](DEVELOPMENT.md)** - Development workflow
- **[Contributing Guide](CONTRIBUTING.md)** - Contribution guidelines

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process on port 4200
lsof -ti:4200 | xargs kill -9
```

### CORS Errors
- Ensure backend is running on port 8080
- Check frontend has correct API URL in environment.ts

### Module Not Found
```bash
# Backend
cd backend && mvn clean install

# Frontend
cd frontend && npm install
```

## 🎯 Next Steps

1. Read [Development Guide](DEVELOPMENT.md)
2. Explore [API Documentation](http://localhost:8080/swagger-ui.html)
3. Check out [Contributing Guidelines](CONTRIBUTING.md)
4. Start building features!

## 📞 Support

- Check [README.md](README.md) for detailed info
- Review [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
- Open an issue on GitHub

---

**Happy Coding! 📚**
