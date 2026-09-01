FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
COPY tsconfig.json vite.config.ts components.json eslint.config.js ./
COPY public ./public
COPY src ./src
COPY supabase ./supabase

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV NITRO_PRESET=node_server
ENV COPYFILE_DISABLE=1

RUN npm install
RUN npx vite build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_PRESET=node_server
ENV PORT=10000
EXPOSE 10000
COPY --from=build /app/.output .output
CMD ["node", ".output/server/index.mjs"]
