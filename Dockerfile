# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get upgrade -y --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Prisma 7 validates env vars referenced in schema.prisma even during `prisma generate`.
# A dummy URL is sufficient — no real DB connection is made during code generation.
# DO NOT put real credentials here; use Railway env vars for runtime.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: production ──────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner

RUN apt-get update && apt-get upgrade -y --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma/
# --ignore-scripts skips postinstall so prisma generate is not re-run here.
# Real DATABASE_URL is injected by Railway at container runtime, not build time.
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 3000

CMD ["node", "dist/main"]
