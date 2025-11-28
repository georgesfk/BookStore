# Docker Compose — Quick Start

This project includes a `docker-compose.yml` to run the Postgres database, backend, and frontend for local development.

Quick steps

1. Copy the included environment example and adjust values for your environment:

   ```bash
   cp .env.example .env
   # edit .env and set JWT_SECRET (recommended) and any DB credentials
   ```

2. Build and start the stack:

   ```bash
   docker compose up --build
   ```

3. Services:
   - Backend: http://localhost:8080 (container listens on 8080)
   - Frontend: http://localhost:4200 (compose maps host 4200 -> container 80 where nginx serves the build)
   - Postgres: 5432 on localhost (if you expose the port)

Notes and tips

- The backend image includes an entrypoint script (`backend/docker-entrypoint.sh`) that will generate a random `JWT_SECRET` for local development if none is provided. For reproducible local testing, set `JWT_SECRET` in your `.env`.
- The `frontend` image serves static files with Nginx (container port 80). Compose maps port `4200` on the host to container `80` for developer convenience.
- The compose file includes a Postgres healthcheck. `bookstore-backend` depends on `bookstore-db` at the compose level; if you observe timing issues, use `docker compose up --build` and wait for the DB to pass health checks.

Advanced

- To use a production Postgres instance, update `SPRING_DATASOURCE_URL` in your `.env` or use the `SPRING_*` environment variables directly in your deployment environment.
- For production deployments, do not use generated JWT secrets — set a secure secret and enable TLS (Let's Encrypt or a managed certificate provider behind a reverse proxy).

Troubleshooting

- Backend logs: `docker compose logs -f bookstore-backend`
- DB readiness: `docker compose ps` to see health status; `docker compose logs -f bookstore-db` for postgres logs.
