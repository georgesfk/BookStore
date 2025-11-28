SHELL := /bin/bash

# Makefile helpers for docker-compose based development
# Usage: `make up`, `make down`, `make logs`, `make db-shell`

COMPOSE = docker compose
ENV_FILE ?= .env

.PHONY: up build down restart logs ps exec-backend exec-frontend db-shell

up:
	@echo "Starting services (detached) using $(ENV_FILE)"
	$(COMPOSE) --env-file $(ENV_FILE) up --build -d

build:
	@echo "Building images"
	$(COMPOSE) --env-file $(ENV_FILE) build

down:
	@echo "Stopping and removing containers"
	$(COMPOSE) --env-file $(ENV_FILE) down

restart:
	@echo "Restarting services"
	$(COMPOSE) --env-file $(ENV_FILE) restart

logs:
	@echo "Tailing logs (ctrl-c to exit)"
	$(COMPOSE) --env-file $(ENV_FILE) logs -f --tail=200

ps:
	@echo "Service status"
	$(COMPOSE) --env-file $(ENV_FILE) ps

exec-backend:
	@echo "Opening shell in backend container"
	$(COMPOSE) --env-file $(ENV_FILE) exec bookstore-backend sh

exec-frontend:
	@echo "Opening shell in frontend container"
	$(COMPOSE) --env-file $(ENV_FILE) exec bookstore-frontend sh

db-shell:
	@echo "Opening psql shell on Postgres service"
	$(COMPOSE) --env-file $(ENV_FILE) exec bookstore-db psql -U $${POSTGRES_USER:-bookstore_user} $${POSTGRES_DB:-bookstoredb}
