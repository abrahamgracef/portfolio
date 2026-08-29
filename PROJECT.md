# Abraham Grace — Personal Developer Portfolio

**Spec version:** 2.6.0
**Stack:** Next.js (App Router) · React 19 · TypeScript · Tailwind CSS · next-themes

## Overview

A technical, engineering-spec-themed personal portfolio. The interface is a
hardware/terminal schematic aesthetic: warm off-white canvas, 1px solid black
structural lines, electric blue (`#0055FF`) active-state accent, square grid
background pattern, and monospace telemetry-style typography. Functional
requirements are organized into 19 feature areas (F1–F19), each verified by a
deterministic, regex-free source-inspection test harness in `tests/`.

## Design System Tokens

| Token | Light | Dark |
| --- | --- | --- |
| Canvas | `#FAFAF9` | `#0A0A0A` |
| Structural border | `#000000` | `#FFFFFF` |
| Accent (active states) | `#0055FF` | `#0055FF` |
| Text primary | `#0A0A0A` | `#FAFAF9` |
| Text muted | `#525252` | `#A3A3A3` |
| Panel / card surfaces | `#FFFFFF` / `#F4F4F2` | `#1A1A1A` / `#262626` |

No glassmorphism, no heavy external animation libraries, no unauthorized drop
shadows.

## Functional Requirements

### F1 — Next.js App Router Scaffold
Next.js + React + TypeScript foundation, App Router layout with root layout and
main page, Tailwind/PostCSS configured, strict TypeScript, and a prohibition on
heavy external animation libraries (GSAP, Framer Motion).

### F2 — Design System & Theme Foundation
Warm off-white canvas token, 1px solid black border tokens, electric blue accent
(`#0055FF`), static CSS square grid background, and a light/dark theme powered by
next-themes with stateful `dark:` utility coverage.

### F3 — Header Navigation Component
Sticky technical header: 1px border divider, uppercase nav links (WORK, STACK,
ABOUT, CONTACT), `SYSTEM // ONLINE` status indicator with pulsing electric blue
dot, solid background preventing content bleed.

### F4 — Footer Component
Semantic footer with structural border, developer name and role, tech-stack
metadata, engineering specification details, direct email/contact action, and a
secondary status indicator.

### F5 — Hero Section Typography & Copy
Prominent `SOFTWARE DEVELOPER` headline, developer name, metadata chips
(location, status, system/role), responsive container, and integrated terminal
schematic.

### F6 — Custom SVG Terminal Schematic
Custom `viewBox`-scaled SVG: structural chassis/perimeter/bus lines, engineering
dimension marks, technical schematic labels, responsive scaling
(`w-full`, `h-auto`, `preserveAspectRatio`).

### F7 — SVG Terminal Drawing Animation
Self-drawing frame via `stroke-dasharray`/`stroke-dashoffset`, GPU-friendly
properties only, <2s total duration, resolving to clean solid lines on
completion.

### F8 — SVG Terminal Text & Cursor
Monospace terminal lines, sequential command revelation
(`kairoku init` / boot sequence), response/diagnostic output, and a blinking
block cursor via opacity oscillation keyframes.

### F9 — Selected Work: KAIROKU
`#work` section featuring KAIROKU — a production anime news and updates Discord
bot (TypeScript / Node.js / discord.js / AniList GraphQL / PostgreSQL / Docker):
architecture overview, tech stack badges, engineering metrics, and an `OPEN
SYSTEM` CTA with hover states.

### F10 — Technical Stack Spec Sheet
`#stack` section as a technical spec sheet: 6 categories (Language, Backend,
Database, Cloud, Frontend, Tools), concrete production technologies with
monospace index tags, 1px border grid, responsive multi-column reflow.

### F11 — About & Education Section
`#about` engineering bio narrative, engineering philosophy and discipline
blocks, formal academic credential block, 1px border modules, clean typographic
hierarchy.

### F12 — Contact Section
`#contact` with direct email action (copyable address), no multi-field forms,
communication availability indicator, and electric blue interactive/copy
feedback states.

### F13 — Fast Boot Sequence
Initial boot loader state machine (<1.0s), status transitions
(`SYSTEM INITIALIZING...` → `INTERFACE // READY`), entrance unlock, clean SSR /
unmounted handling with no flash of unstyled content.

### F14 — Scroll Reveals & Observer
Native Intersection Observer reveal: hidden initial state, viewport-triggered
fade/translate, staggered delays, and fallback visibility when the API is
unsupported or reduced motion is preferred.

### F15 — Technical Hover Interactions
Snappy (150–250ms) mechanical hover states: nav color shifts, electric blue CTA
highlights, crisp 1px border/background-tint on stack items and project cards;
static elements avoid spurious jitter.

### F16 — Reduced Motion Accessibility
`prefers-reduced-motion` zeroes animations/transitions, bypasses the boot
sequence, disables SVG stroke drawing, steadies the status dot, and disables
scroll reveals.

### F17 — Responsive Layout & Viewports
Viewport meta in root layout; 320px mobile without overflow; tablet
(`sm:`/`md:`) grid reflow; desktop (`lg:`/`xl:`) alignment; ultrawide
constraints via `max-w-*` containers.

### F18 — Comprehensive E2E Verification
Test harness runs all 4 tiers (features, boundaries, combinations, scenarios)
and emits structured reports; assertions are deterministic (no flaky random
values); ESM (`.mjs`) test files; requirement traceability covers 100% of
functional requirements (see `TEST_INFRA.md`).

### F19 — Adversarial Hardening
Zoom resilience via relative units, rapid-scroll burst stability, No-JS
readability (full copy in initial markup), shallow DOM depth, and CSS
specificity isolation between globals and utilities.