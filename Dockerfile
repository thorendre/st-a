# Stage 1: Build application with Node.js
FROM node:20-alpine AS build

WORKDIR /app

# Optimize build caching by copying dependency manifests first
COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

# Stage 2: Hardened, unprivileged Nginx web server
FROM nginxinc/nginx-unprivileged:alpine

# Remove default configuration and inject security-hardened conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Copy production static assets
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Expose non-privileged HTTP port
EXPOSE 8080

# Healthcheck for container orchestration (Docker Compose / Kubernetes)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
