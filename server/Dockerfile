FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN bun run build

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/dist/server server
COPY --from=build /app/package.json package.json

ENV NODE_ENV=production

CMD ["./server"]

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE ${PORT}
