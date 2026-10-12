# Stage 1: Build
FROM registry.access.redhat.com/ubi9/nodejs-22:latest AS builder

USER 0
WORKDIR /opt/app-root/src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Brand theming — NEXT_PUBLIC_* vars are inlined into the client bundle at build time.
# Defaults are the FRIDA brand. Override with --build-arg for other brands.
# Logo and favicon are served via local proxy routes (/api/logo, /api/favicon) so
# the actual upstream URLs are server-side-only vars (no NEXT_PUBLIC_ prefix).
ARG NEXT_PUBLIC_PRIMARY_COLOR="#1AB3B9"
ARG NEXT_PUBLIC_SECONDARY_COLOR="#22D9E0"
ARG NEXT_PUBLIC_HEADER_BG="#333333"
ARG NEXT_PUBLIC_LOGO_URL="/icon-carclaimsapi.svg"
ARG NEXT_PUBLIC_LOGO_POSITION="right"
ARG NEXT_PUBLIC_BUTTON_RADIUS="30px"
ARG NEXT_PUBLIC_FAVICON="/frida.ico"
ENV NEXT_PUBLIC_PRIMARY_COLOR=$NEXT_PUBLIC_PRIMARY_COLOR
ENV NEXT_PUBLIC_SECONDARY_COLOR=$NEXT_PUBLIC_SECONDARY_COLOR
ENV NEXT_PUBLIC_HEADER_BG=$NEXT_PUBLIC_HEADER_BG
ENV NEXT_PUBLIC_LOGO_URL=$NEXT_PUBLIC_LOGO_URL
ENV NEXT_PUBLIC_LOGO_POSITION=$NEXT_PUBLIC_LOGO_POSITION
ENV NEXT_PUBLIC_BUTTON_RADIUS=$NEXT_PUBLIC_BUTTON_RADIUS
ENV NEXT_PUBLIC_FAVICON=$NEXT_PUBLIC_FAVICON

# BRAND_FONT is server-side only but influences font preloading in layout.tsx at build time
ARG BRAND_FONT="roboto"
ENV BRAND_FONT=$BRAND_FONT

RUN cp node_modules/@ricky0123/vad-web/dist/silero_vad_legacy.onnx \
       node_modules/@ricky0123/vad-web/dist/silero_vad_v5.onnx \
       node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js \
       node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm \
       node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm \
       node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs \
       public/
RUN npm run build

# Stage 2: Runtime
FROM registry.access.redhat.com/ubi9/nodejs-22-minimal:latest AS runner

USER 0
WORKDIR /opt/app-root/src

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Runtime-only vars — override at container/pod level without a rebuild.
# BRAND_FONT: carried over from build arg so standalone docker run matches the built brand.
ARG BRAND_FONT="roboto"
ENV BRAND_FONT=$BRAND_FONT
# Upstream URLs for the server-side proxy routes (/api/logo, /api/favicon).
ARG LOGO_SOURCE_URL=""
ENV LOGO_SOURCE_URL=$LOGO_SOURCE_URL
ARG FAVICON_SOURCE_URL=""
ENV FAVICON_SOURCE_URL=$FAVICON_SOURCE_URL

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
