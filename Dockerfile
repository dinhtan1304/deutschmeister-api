# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get upgrade -y --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Prisma 7 validates env vars in schema.prisma even during `prisma generate`.
# A dummy URL is fine — no real DB connection is made during type generation.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"

COPY package*.json ./
COPY prisma ./prisma/

# Install ALL deps (including devDeps for nest build) + compile native modules (bcrypt etc.)
# postinstall runs `prisma generate` with the dummy DATABASE_URL above
RUN npm ci

COPY . .

# Compile TypeScript → dist/
RUN npm run build

# ── Stage 2: production ──────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner

RUN apt-get update && apt-get upgrade -y --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production

# Copy the entire node_modules from builder so native addons (bcrypt, etc.)
# are already compiled for the same OS/arch — no recompile needed.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
