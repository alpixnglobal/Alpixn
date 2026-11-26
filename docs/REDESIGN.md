# ALPIXN Brand Redesign & Robotics Experience

This document records the 2026 premium redesign of the ALPIXN website: what changed, why, and how to work with it.
The redesign is an **enhancement of the existing production codebase**. Routes, CMS/MongoDB content, admin, forms,
security headers and SEO URLs are unchanged.

---

## 1. Audit summary (before)

| Area | Finding |
| --- | --- |
| Architecture | Next.js 16 App Router, React 19, Tailwind v4, MongoDB via Mongoose, `unstable_cache` content service with seeded defaults, admin under `/admin` (pages in `admin/`, re-exported from `app/admin`). |
| Theme | **Three competing systems**: an unused custom `ThemeProvider`, an unused `ThemeToggle`, and `DisableDarkMode` (a MutationObserver stripping the `dark` class). A one-off `convert-light.js` codemod had rewritten admin classes. All CSS variables were identical for `:root`, `.light` and `.dark`. |
| Branding | Placeholder logo ("COMPANY – Your Logo Here") from the `logoUrl` default; "Axaon" defaults; old favicon; generic purple/blue SaaS palette (`#389EFF`, `#9747FF`, `#D42190`). |
| Typography | Manrope + Roboto (brand guidelines specify Sora + Inter). |
| Header | Desktop/mobile switched with a JS media query, so the layout flashed on hydration. |
| Lint baseline | 26 errors / 34 warnings before any change (all in existing files). |

## 2. Brand system

Source of truth: *ALPIXN Logo & Brand Identity Guidelines* (PDF).

| Token | Value | Use |
| --- | --- | --- |
| `brand-navy` | `#071A33` | Premium dark surfaces |
| `brand-royal` | `#0878D1` | Technology / AI highlights, primary buttons |
| `brand-midnight` | `#064A87` | Gradients, depth |
| `brand-gold` | `#D99A19` | Premium accents, borders |
| `brand-champagne` | `#F6D77A` | Light gold, glows, HUD details |
| `brand-antique` | `#9A5B08` | Gold text on light backgrounds |
| `brand-electric` | `#2EA8FF` | Interactive / futuristic effects (dark theme `--tech`) |

**Semantic theme tokens** in `app/globals.css` are defined separately for light (`:root, .light`) and dark (`.dark`):
`--canvas`, `--canvas-2`, `--surface`, `--surface-2`, `--glow`, `--fg`, `--fg-muted`, `--fg-subtle`, `--line`,
`--line-gold`, `--tech`, `--tech-soft`, `--gold`, `--gold-soft`, `--gold-ink`, `--glass`, `--header-bg`, heading
gradient stops, and a highlight colour (`--hi-rgb` / `--hi-scale`). Each token has a Tailwind utility (`bg-canvas`,
`text-fg`, `border-line`, `text-tech`, `text-gold-ink`, …).

- **Dark theme:** deep navy, blue radial lighting, gold detailing, glass panels.
- **Light theme:** off-white canvas, white cards, navy headings, royal-blue accents, restrained gold, soft shadows.
  It is designed separately, not an inversion of dark.
- Add the `dark` class to a section to force dark tokens inside it (used on the product hero over dark imagery).

**Typography:** Sora (headings, `font-display`) and Inter (body/UI) via `next/font`. The ALPIXN wordmark is always the
supplied artwork and is never retyped.

## 3. Theme architecture

- Single provider: `components/theme-provider.tsx` wraps **next-themes** (`attribute="class"`, `defaultTheme="dark"`,
  `storageKey="alpixn-theme"`). Its blocking script applies the saved theme before first paint, so there is no flash
  and no hydration mismatch.
- `components/theme-toggle.tsx`: an animated sun/moon switch with gold/blue detailing, `role="switch"` and
  `aria-checked`. The knob position is CSS-driven, so it is correct before hydration.
- Placed on the right of the desktop header and next to the menu button on mobile.
- **Removed:** `components/DisableDarkMode.tsx`, the forced `dark` wrapper in `app/admin/layout.tsx`, and
  `convert-light.js`. Admin now follows the global theme.

## 4. Logo, favicon & metadata

| Asset | Path | Source |
| --- | --- | --- |
| Horizontal logo (master PNG, transparent) | `public/brand/alpixn-logo-horizontal.png` | Extracted losslessly from the brand-guidelines PDF |
| Horizontal logo (web) | `public/brand/alpixn-logo-horizontal.webp`, `-560.webp` | Derived |
| Emblem (master / web) | `public/brand/alpixn-emblem.png`, `.webp` | Supplied triangular emblem |
| Favicon (16/32/48/64) | `app/favicon.ico` | Emblem only |
| App icon | `app/icon.png` (256²) | Emblem |
| Apple touch icon | `app/apple-icon.png` (180², navy background) | Emblem |
| Open Graph / Twitter | `app/opengraph-image.jpg`, `app/twitter-image.jpg` (1200×630) | Logo on navy |
| Legacy path | `public/images/logo.png` | Replaced with the new logo, so any stored CMS value pointing here shows ALPIXN |

- `components/brand/BrandLogo.tsx` renders the logo at a fixed height with the artwork's real aspect ratio (never
  stretched). The logo still comes from **Site Settings → logoUrl**. Legacy placeholder values (`""`,
  `/images/logo.png`) resolve to the approved artwork, and a custom upload made in admin still wins.
- Header (desktop and mobile), mobile drawer, footer and admin sidebar all use the new branding.
- `app/layout.tsx` metadata now has the ALPIXN title template, description, keywords, `metadataBase`, Open Graph,
  Twitter and theme colours. The old `app/ALPIXN_Final_fevicon Icon.png` was removed.
- Default seed values changed from "Axaon Company" to "ALPIXN". These are fallbacks only; stored database content is untouched.

## 5. Homepage

All copy, images and CTAs still come from **Home Settings** in MongoDB. Nothing that was CMS-driven is hard-coded.

| Section | Redesign |
| --- | --- |
| Hero | Cinematic layout: gold eyebrow, Sora headline, animated CTAs, capability pillars, and the **3D robotics scene** (below). |
| Custom Solutions | Bento grid of image-led cards with 3D pointer tilt, light sheen, HUD corner brackets and index numerals. |
| Offerings | Editorial split: sticky intro with an orbiting-emblem graphic, plus a staggered grid of module cards with gradient-border glow. |
| Case Studies | Glass showcase with an image stage (radial glow, HUD frame), feature checklist, themed controls and a clickable segmented progress bar. |
| Industries | Accessible ARIA tabs (arrow-key navigation), a numbered rail with a gold active marker, and a glass detail panel. |
| Technology Stack | Segmented tab control; logos in navy "chip" tiles with gold rings (white logos stay legible in both themes); animated circuit lines. |
| Why Choose Us | Editorial testimonial: large Sora quote, metallic-gold quote mark, conic-ring portrait, emblem watermark. |
| Insights | Featured post plus a stacked pair, with image zoom and themed metadata. |

Shared building blocks: `components/ui/SectionHeading.tsx`, `Reveal.tsx` (progressive scroll reveal: content stays
visible without JS and is never hidden above the fold) and `TiltCard.tsx` (CSS-variable tilt, no React re-renders).

### Animated buttons (`app/globals.css`)

- `.btn-brand`: primary CTA. A gold-to-blue light travels around the border (`@property --border-angle` +
  `conic-gradient`), with hover lift and glow. Reserved for hero and section CTAs.
- `.btn-ghost-brand`: secondary. An elegant gradient outline that brightens on hover.
- `.btn-subtle`: tertiary with a static border.
- The shared `Button` components (`components/ui/button.tsx`, `buttonBtn.tsx`) use the brand gradient without the
  moving border, so not every button animates.
- Every variant keeps a visible gold `:focus-visible` outline.

## 6. 3D robotics hero

Files: `components/hero/RoboticsScene.tsx`, `components/hero/HeroVisual.tsx`.

- **Scene** (Three.js r187 + React Three Fiber 9, built entirely in code, with no external models or textures):
  a 6-axis industrial robotic arm with a three-finger gripper whose mechanical fingers open and close. It runs a
  choreographed loop (observe → plan → grasp → present → place → release) and carries a holographic data core.
  Around it: a neural-network field with travelling pulses, a floor scanning ring, ambient particles, and a camera
  rig that responds to the mouse and scroll. Materials are theme-aware (navy graphite + gold in dark, pearl white +
  navy in light). Image-based lighting comes from `RoomEnvironment`.
- **Holographic panels:** DOM glass cards with live joint telemetry, written straight to the DOM about 10 times a
  second with no React re-renders. They are labelled "live sim" and show no business claims.
- **Capability tiers** (`HeroVisual`):
  - `webgl`: the full scene. Loaded with `next/dynamic` after `requestIdleCallback`; `frameloop` pauses when the
    hero is off-screen or the tab is hidden; adaptive DPR; reduced particle and node counts on small or touch devices.
  - `lite` (≤ 4 CPU cores, ≤ 3 GB device memory, or Save-Data): a pre-rendered muted loop (`autoplay muted loop
    playsInline`, `preload="none"`, no controls, poster fallback). It is inserted only while in view.
  - `static` (prefers-reduced-motion or no WebGL): a poster image, or the CMS hero image if one has been customised.
  - QA override: append `?hero=webgl|lite|static` to the URL.
- **Disposal:** all geometries, materials, textures and the PMREM environment are disposed on unmount.
- **Reduced motion:** a global CSS rule neutralises animations and transitions; Reveal and TiltCard are disabled.

### Generated media assets (`public/media/hero/`)

| File | Notes |
| --- | --- |
| `robotics-loop-dark.webm` / `.mp4` | 11 s seamless loop, 640 px, VP9 / H.264 (`+faststart`) |
| `robotics-loop-light.webm` / `.mp4` | Same, light theme |
| `robotics-poster-dark.webp` / `-light.webp` | Poster frames |

They were rendered from the site's own Three.js scene, frame by frame (deterministic capture clock, 20 fps), and
encoded with ffmpeg.

## 7. Licences of external assets

| Asset | Source | Licence |
| --- | --- | --- |
| ALPIXN logo & emblem | Supplied by ALPIXN | Owned by ALPIXN |
| Hero 3D scene, videos, posters | Generated in this project | Owned by ALPIXN (no third-party media) |
| Sora, Inter fonts | Google Fonts via `next/font` | SIL Open Font License 1.1 |
| three (0.187.0) | npm | MIT |
| @react-three/fiber (9.8.2) | npm | MIT |
| lucide-react icons | npm (existing dependency) | ISC |
| Social icons (`components/brand/SocialIcons.tsx`) | Simple vector marks drawn for this project | Used as nominative links to the respective networks |

No stock videos or third-party 3D models were added.

## 8. Global consistency

- Codemod pass 1 (111 files): legacy hex and `rgba()` colours were mapped to tokens (`#389EFF` → `--tech`,
  `#00070E` → `--canvas`, `#002348` → `--glow`, purple `#9747FF` → `--gold`, …), and `text-white` / `border-white/x`
  / `bg-white/x` on themed surfaces became `text-fg` etc. SVG presentation attributes got static brand hex values,
  and text on primary buttons stays white.
- Codemod pass 2 (30 files): white highlight borders now use `--hi-rgb`, white gradient stops use the heading token,
  and grey text uses `text-fg-muted`.
- Legacy pink `#D42190` hero glows → brand gold; the indigo product hero → navy (dark-scoped).
- Header: glass bar, gold-to-blue hairline, animated nav underline, themed mega-menu panels, a themed mobile drawer
  with close button, and CSS breakpoints (no layout flash).
- Footer: logo, newsletter card, CMS columns and offices, `currentColor` social icons.
- Admin: follows the theme; ALPIXN emblem in the sidebar; login page themed; cyan/purple accents replaced with brand blue/gold.
- New branded `app/not-found.tsx`.

## 9. Modified and added files

See `git log` / `git diff af165d9..HEAD --stat` in this repository for the complete list (the baseline commit
`af165d9` is the untouched original source). The main files:

**Added:** `components/brand/BrandLogo.tsx`, `components/brand/SocialIcons.tsx`, `components/hero/RoboticsScene.tsx`,
`components/hero/HeroVisual.tsx`, `components/ui/Reveal.tsx`, `components/ui/SectionHeading.tsx`,
`components/ui/TiltCard.tsx`, `app/not-found.tsx`, `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg`,
`app/twitter-image.jpg`, `public/brand/*`, `public/media/hero/*`, `.env.example`, `docs/REDESIGN.md`.

**Removed:** `components/DisableDarkMode.tsx`, `app/ALPIXN_Final_fevicon Icon.png`, `convert-light.js`.

**Rewritten:** `app/globals.css`, `app/layout.tsx`, `components/theme-provider.tsx`, `components/theme-toggle.tsx`,
`components/menu.tsx`, `components/layouts/Header.tsx`, `components/layouts/Footer.tsx`, and all homepage sections in
`components/sections/` (`Hero`, `CustomSolutionSection`, `OfferSection`, `CaseStudySection`, `HomeIndustriesSection`,
`TechStackSection`, `WhyChooseUsSection`, `InsigntSection`).

**Token updates (mechanical):** about 110 section and UI components across all routes, the admin shell and login,
`lib/content-service.ts` / `lib/models.ts` (default values only), `app/favicon.ico`, `public/images/logo.png`,
`package.json` (+`three`, `@react-three/fiber`, `@types/three`).

## 10. Known items (pre-existing, not changed)

- The footer links to `/privacy-policy` and `/sitemap`, but those routes do not exist in the codebase (prefetch is
  now disabled for them). Create the pages or update the links.
- `/resources/careers/job-apply` intentionally returns 404 without a `?job=` parameter.
- Some tech-stack logos fall back to `cdn.simpleicons.org`; others use a "logoipsum" placeholder from the CMS seed.
  Upload real logos in admin.
- Some seed content references "Jellyfish Technologies" and "AlCompany" (CMS data, left untouched).
- The admin session cookie is still named `axaon-admin-session`. It was intentionally not renamed, because renaming
  would log out every admin.
- 21 pre-existing lint errors remain in untouched files (`LogoLoop.tsx`, `scripts/migrate-mongodb.cjs`,
  `hooks/use-media-query.tsx`, `ApplicationStatusToast.tsx`, `TestimonialOurExpertise.tsx`). The redesign adds
  none, fixed 3, and removed 2 more by deleting the obsolete `convert-light.js` (baseline: 26 errors).

## 11. QA results (final build)

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass (0 errors) |
| `npm run lint` | 21 errors / 32 warnings, all pre-existing (baseline 26 / 34); 0 introduced |
| `npm run build` | Pass (82 static pages generated) |
| `npm run test:db` | 19 / 19 pass |
| Route checks | All 22 public/admin routes 200; `/admin` → 307 to login (auth intact); unknown URL → branded 404 |
| Theme | Default dark; toggle → light, persisted in `localStorage` (`alpixn-theme`), survives reload and client navigation; keyboard operable; `aria-checked` correct; no hydration warnings |
| Console | No errors on tested routes (blocked external logo CDN excluded) |
| Responsive | 390 px (iPhone 13), 1280 px, 1440 px checked in both themes; no horizontal overflow on mobile |
| Performance | three.js chunk (≈921 KB raw) loads only on the WebGL tier, after idle; base JS ≈789 KB raw; local LCP ≈0.6 s; hero video tier ≈0.25–0.45 MB per loop |

## 12. Deployment note

Nothing was deployed and no production systems were touched. To deploy, follow the existing process
(`npm ci && npm run build && npm start` behind the current Nginx/PM2 setup). `NEXT_PUBLIC_SITE_URL` is optional.
