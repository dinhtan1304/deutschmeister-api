# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get upgrade -y --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Prisma 7 requires DATABASE_URL even for `prisma generate` (validates schema env refs).
# A dummy value is fine — we only need the generated TypeScript types, not a real DB.
ENV DATABASE_URL="postgresql://neondb_owner:npg_VFgByt52OCuA@ep-odd-unit-a1i39asg.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: production (distroless — no shell, minimal attack surface) ──────
FROM gcr.io/distroless/nodejs22-debian12 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["dist/main"]
