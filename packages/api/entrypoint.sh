#!/bin/sh
set -e

echo "Waiting for MySQL at ${DB_HOST}:${DB_PORT}..."
for i in $(seq 1 30); do
  nc -z "$DB_HOST" "$DB_PORT" && break
  sleep 1
done

echo "Running migrations..."
npx sequelize-cli db:migrate --config sequelize-config.js --migrations-path migrations

echo "Seeding (idempotent where possible)..."
npx sequelize-cli db:seed:all --config sequelize-config.js --seeders-path seeders || true

echo "Starting API..."
node dist/main.js
