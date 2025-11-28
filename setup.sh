#!/bin/bash

# BookStore Setup Script

echo "🚀 Starting BookStore Application Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker is installed"
    
    # Check if Docker Compose is installed
    if command -v docker-compose &> /dev/null; then
        echo -e "${GREEN}✓${NC} Docker Compose is installed"
        
        echo -e "${YELLOW}Starting services with Docker Compose...${NC}"
        docker-compose up -d
        
        echo -e "${GREEN}Services started!${NC}"
        echo "Backend: http://localhost:8080"
        echo "Frontend: http://localhost:4200"
        echo "API Docs: http://localhost:8080/swagger-ui.html"
    else
        echo -e "${RED}✗${NC} Docker Compose is not installed"
        echo "Please install Docker Compose to continue"
        exit 1
    fi
else
    echo -e "${YELLOW}Docker not found. Setting up locally...${NC}"
    
    # Backend setup
    echo -e "${YELLOW}Setting up Backend...${NC}"
    cd backend
    mvn clean install
    cd ..
    
    # Frontend setup
    echo -e "${YELLOW}Setting up Frontend...${NC}"
    cd frontend
    npm install
    cd ..
    
    echo -e "${GREEN}Setup complete!${NC}"
    echo "Start Backend: cd backend && mvn spring-boot:run"
    echo "Start Frontend: cd frontend && npm start"
fi
