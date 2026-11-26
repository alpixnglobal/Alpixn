# ALPIXN — Official Website

Next.js 16 (App Router) website for **ALPIXN**, an AI, robotics and software technology company,
with a MongoDB-backed content management system and admin dashboard.

> The 2026 brand redesign (new logo, dark/light theme, 3D robotics hero, redesigned homepage) is
> documented in [`docs/REDESIGN.md`](docs/REDESIGN.md).

## Requirements

- Node.js 20+ (tested on Node 22)
- npm 10+
- MongoDB (local or hosted). Without a reachable database the public pages render built-in default content.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server on [http://localhost:8080](http://localhost:8080):

   ```bash
   npm run dev
   ```

## Scripts

| Command              | What it does                                                  |
| -------------------- | ------------------------------------------------------------- |
| `npm run dev`        | Dev server (webpack) on port 8080                             |
| `npm run dev:turbo`  | Dev server (Turbopack) on port 8080                           |
| `npm run build`      | Production build                                              |
| `npm start`          | Serve the production build                                    |
| `npm run lint`       | ESLint                                                        |
| `npm run test:db`    | Database/content-service tests (uses an in-memory MongoDB)    |
| `npm run db:migrate` | Copy data between MongoDB instances (see script `--help`)     |

`npm run test:db` downloads a MongoDB binary on first run (from `fastdl.mongodb.org`).

## Project structure

```
app/                  Routes (App Router), root layout, favicon / icons / OG image
admin/                Admin dashboard pages + server actions (re-exported under app/admin)
components/
  brand/              ALPIXN logo + social icons
  hero/               3D robotics hero (React Three Fiber) and its fallbacks
  layouts/            Header, Footer
  sections/           Page sections (homepage sections at the top level)
  ui/                 Shared UI (buttons, Reveal, TiltCard, SectionHeading, …)
  theme-provider.tsx  Global dark/light theme (next-themes)
  theme-toggle.tsx    Header theme switch
lib/                  MongoDB connection, models, content service, seed defaults
public/brand/         Approved logo + emblem artwork
public/media/hero/    Pre-rendered hero video loops + posters
tests/                Database tests
```

## Theming

Colours are defined once as CSS variables in `app/globals.css` (brand palette + theme-aware semantic tokens such as
`--canvas`, `--fg`, `--tech`, `--gold`). Use the matching Tailwind utilities (`bg-canvas`, `text-fg`, `text-fg-muted`,
`border-line`, `text-tech`, `text-gold`, …) instead of hard-coded hex values so components work in both themes.
Add the `dark` class to a section to force dark tokens inside it (for example, on top of dark imagery).
