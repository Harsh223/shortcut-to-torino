# Shortcut

Marketing site for Shortcut — parking, transit, and driving in one city app.

## Stack

- TanStack Start + React + TypeScript
- Vite + Nitro (`node_server` preset)
- Tailwind CSS
- Supabase

## Local development

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

Copy `.env.example` to `.env` and fill in the Supabase values.

## Production

```sh
bun run build
bun run start
```

The Node server listens on `PORT` (Render sets this automatically).

## Deploy

Live at [https://shortcut-to-torino.onrender.com](https://shortcut-to-torino.onrender.com).

Render web service (Frankfurt, free plan) builds from GitHub. The private GitLab copy is `https://gitlab.com/ytraffic/shortcut-to-torino`. See `render.yaml`.
