# CONTRIBUTING.md

## Contributing to BookStore

Thank you for your interest in contributing to BookStore! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/BookStore.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Making Changes

1. Make your changes in a feature branch
2. Follow the code style guidelines
3. Test your changes thoroughly
4. Write clear, concise commit messages

## Backend Guidelines

- Use Java 17 features
- Follow Spring Boot best practices
- Add appropriate annotations for security
- Include JavaDoc for public methods
- Write unit tests for new functionality

### Code Style
```java
// Class naming: PascalCase
public class UserController {
    // Method naming: camelCase
    public ResponseEntity<UserDTO> getUser(Long id) {
        // Implementation
    }
}
```

## Frontend Guidelines

- Use TypeScript strict mode
- Follow Angular style guide
- Use standalone components
- Implement OnDestroy for subscription management
- Add proper error handling

### Code Style
```typescript
// Component naming: kebab-case (file), PascalCase (class)
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // Implementation
}
```

## Commit Messages

Follow conventional commit format:
```
type(scope): brief description

Detailed explanation if needed.

Closes #issue-number
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Request Process

1. Update the README.md with any new features or changes
2. Ensure all tests pass
3. Request review from maintainers
4. Address review feedback
5. Merge once approved

## Reporting Bugs

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Java/Node version, etc.)

## Feature Requests

Include:
- Clear description
- Use case
- Proposed solution
- Alternative solutions

## Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
npm test
```

## Documentation

- Update JavaDoc in backend code
- Update component documentation in frontend
- Keep README files current
- Document API changes

## License

By contributing, you agree that your contributions will be licensed under the same MIT license.

---

Thank you for contributing! 🎉
