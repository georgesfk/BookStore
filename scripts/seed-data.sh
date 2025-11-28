#!/usr/bin/env bash
set -euo pipefail

# Simple seeding script that attempts to create sample data via the backend API.
# It will retry until the backend responds.

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
ENV_FILE="$ROOT_DIR/.env"
if [ -f "$ENV_FILE" ]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

API_URL=${API_URL:-http://localhost:8080/api/v1}

echo "Seeding sample data using API at: $API_URL"

wait_for_url() {
  local url=$1
  local retries=60
  local wait=2
  echo "Waiting for $url to become available..."
  until [ $retries -le 0 ] || curl -sSf -o /dev/null "$url"; do
    retries=$((retries - 1))
    sleep $wait
  done
  if [ $retries -le 0 ]; then
    echo "Timed out waiting for $url" >&2
    return 1
  fi
  return 0
}

# Prefer health endpoint if available, fallback to root
if wait_for_url "$API_URL/actuator/health" 2>/dev/null; then
  echo "Backend health OK"
elif wait_for_url "$API_URL"; then
  echo "Backend reachable"
else
  echo "Backend not reachable. Exiting." >&2
  exit 1
fi

post_json() {
  local url=$1
  local data=$2
  echo "POST $url -> $data"
  curl -sS -X POST "$url" -H 'Content-Type: application/json' -d "$data" || true
  echo
}

# Try to register a default admin user (if endpoint exists)
echo "Attempting to register sample user (if registration endpoint exists)"
post_json "$API_URL/auth/register" '{"email":"admin@example.com","password":"admin123","name":"Admin"}'
post_json "$API_URL/register" '{"email":"admin@example.com","password":"admin123","name":"Admin"}'

# Create sample books (try a few probable endpoints)
echo "Creating sample books"
BOOK1='{"title":"The Hobbit","author":"J.R.R. Tolkien","price":9.99,"isbn":"9780261102217"}'
BOOK2='{"title":"Clean Code","author":"Robert C. Martin","price":29.99,"isbn":"9780132350884"}'

post_json "$API_URL/books" "$BOOK1"
post_json "$API_URL/book" "$BOOK1"
post_json "$API_URL/books" "$BOOK2"
post_json "$API_URL/book" "$BOOK2"

echo "Seeding finished. If the API accepted requests these records should be present."
echo "If nothing was created, adapt this script to your API endpoints or seed data directly into the database."
