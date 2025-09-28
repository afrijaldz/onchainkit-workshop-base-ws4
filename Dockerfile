# Step 1: Install dependencies and build the app
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable pnpm

WORKDIR /app

# Install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Disable Next.js linting & type-check inside Docker
ENV NEXT_DISABLE_ESLINT=1
ENV NEXT_DISABLE_TYPECHECK=1

# Build the Next.js app
RUN pnpm build

# Step 2: Run the app using a smaller image
FROM node:22-alpine AS runner

# Install pnpm (optional, only needed if using `pnpm` directly at runtime)
RUN corepack enable pnpm

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
