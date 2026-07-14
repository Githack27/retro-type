# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/index.js"]
