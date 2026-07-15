# Stage 1: Build
FROM registry.access.redhat.com/ubi9/nodejs-22:latest AS builder

USER 0
WORKDIR /opt/app-root/src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Runtime
FROM registry.access.redhat.com/ubi9/nodejs-22-minimal:latest AS runner

USER 0
WORKDIR /opt/app-root/src

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

COPY --from=builder /opt/app-root/src/.next/standalone ./
COPY --from=builder /opt/app-root/src/.next/static ./.next/static
COPY --from=builder /opt/app-root/src/public ./public

COPY docker/entrypoint.sh /opt/app-root/entrypoint.sh
RUN chmod +x /opt/app-root/entrypoint.sh

RUN chown -R 1001:0 /opt/app-root && \
    chmod -R g=u /opt/app-root

USER 1001

EXPOSE 8080

ENTRYPOINT ["/opt/app-root/entrypoint.sh"]
