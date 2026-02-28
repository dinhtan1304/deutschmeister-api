# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install ALL deps (including devDeps needed for nest build)
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# prisma generate is now part of "npm run build" via postinstall
# but we run it explicitly here to make sure
RUN npx prisma generate

COPY . .
RUN npm run build

# ── Stage 2: production ──────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma/
# Install only prod deps, postinstall will run prisma generate
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
# Copy generated Prisma client from builder stage (already generated there)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["node", "dist/main"]
