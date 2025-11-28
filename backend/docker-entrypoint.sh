#!/bin/sh
set -e

# Provide sane defaults for local development
: "${SPRING_DATASOURCE_URL:=jdbc:postgresql://bookstore-db:5432/bookstoredb}"
: "${SPRING_DATASOURCE_USERNAME:=bookstore_user}"
: "${SPRING_DATASOURCE_PASSWORD:=bookstore_password}"

# Generate a random JWT secret if none provided (useful for local dev)
if [ -z "${JWT_SECRET}" ]; then
  if command -v head >/dev/null 2>&1 && command -v base64 >/dev/null 2>&1; then
    JWT_SECRET=$(head -c 32 /dev/urandom | base64)
  else
    JWT_SECRET=dev-secret-please-change
  fi
  export JWT_SECRET
  echo "[entrypoint] Generated JWT_SECRET for local dev"
fi

echo "[entrypoint] Using SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}"

exec java ${JAVA_OPTS:-} -jar /app/app.jar
