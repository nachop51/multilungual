# Stage 1: build the Vite React app with Bun
FROM oven/bun:1 AS builder

WORKDIR /app

# Install frontend dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Install server dependencies so its types are resolvable during the frontend build
COPY server/package.json server/bun.lock* server/
RUN bun install --frozen-lockfile --cwd server

COPY . .
RUN bun run build

FROM caddy:2.11-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /srv

EXPOSE 80
