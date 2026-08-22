# Project: Abraham Grace Personal Developer Portfolio

## Architecture
- **Framework**: Next.js 14/15 (App Router) with TypeScript
- **Styling & Design System**: Tailwind CSS with custom CSS variables & utility classes for technical styling
- **Motion & Interaction**: Pure CSS keyframes, CSS transitions, and Intersection Observer API (strictly NO GSAP / Framer Motion)
- **Aesthetic**: Premium hardware/product launch technical schematic:
  - Background: Warm off-white (`#FBFBFB` / `#F7F7F5`) with static CSS-based light-gray square grid (`#E5E5E5` 24px)
  - Structural Lines: 1px solid black (`#000000`) borders for all section and card boundaries
  - Typography: Condensed technical sans for headings, clean sans for body, monospace for code/tags
  - Accents: Electric Blue (`#0055FF`)
  - Rules: No gradients, no glassmorphism, no heavy drop shadows
- **Core Visual Highlight**: Original responsive SVG engineering terminal / workstation schematic in Hero with stroke-dasharray frame drawing, sequential command/response reveal, and blinking monospace cursor.
- **Boot Sequence**: Fast (<1s) initial boot loader ("SYSTEM INITIALIZING..." -> "INTERFACE // READY").
- **Accessibility**: 100% compliant `prefers-reduced-motion` support disabling all motion loops, drawing, delays, and transforms.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---|---|---|---|
| F1 | Next.js App Router Scaffold | Clean Next.js + TS + Tailwind CSS + ESLint project setup | M1 | R1 |
| F2 | Design System & Theme Foundation | Off-white background, static CSS square grid, 1px black border tokens, typography, electric blue accents, no gradients/glassmorphism | M1 | R2 |
| F3 | Header Navigation Component | Minimal technical nav (WORK, STACK, ABOUT, CONTACT) + SYSTEM // ONLINE indicator with pulsing blue dot | M1 | R4 |
| F4 | Footer Component | Technical footer with Abraham Grace name, role, tech stack, email link, and SYSTEM // ONLINE status | M1 | R4 |
| F5 | Hero Section Typography & Copy | Large condensed SOFTWARE DEVELOPER title, engineering manifesto, metadata chips (Location, Status, System Ver) | M2 | R4 |
| F6 | Custom SVG Terminal Schematic | Original responsive SVG technical workstation schematic with measurement marks, dimension lines, structural labels | M2 | R3 |
| F7 | SVG Terminal Drawing Animation | Stroke-dasharray / stroke-dashoffset self-drawing frame animation | M2 | R3 |
| F8 | SVG Terminal Text & Cursor | Monospace sequential text reveal (command -> execution -> output) and blinking cursor keyframe | M2 | R3 |
| F9 | Selected Work: KAIROKU | Featured project showcase with technical specs, architecture summary, tech stack chips, key metrics, and OPEN SYSTEM CTA link | M3 | R4 |
| F10 | Technical Stack Spec Sheet | 6-column / categorized technical specification sheet (Languages, Backend, Database, Cloud, Frontend, Tools) | M3 | R4 |
| F11 | About & Education Section | Minimal structured technical blocks for background, engineering philosophy, formal education, and core disciplines | M3 | R4 |
| F12 | Contact Section | Prominent copyable/clickable email contact module with technical interactive feedback and links | M3 | R4 |
| F13 | Fast Boot Sequence | Initial <1s boot sequence overlay ("SYSTEM INITIALIZING..." -> "INTERFACE // READY") triggering staggered hero reveal | M4 | R5 |
| F14 | Scroll Reveals & Observer | Intersection Observer revealing sections smoothly on scroll (opacity 0->1, short translateY) | M4 | R5 |
| F15 | Technical Hover Interactions | 1-2px subtle mechanical shift and electric blue highlight on buttons, nav links, and interactive spec cards | M4 | R5 |
| F16 | Reduced Motion Accessibility | Complete disablement of all animations, transitions, pulses, and boot delays under `prefers-reduced-motion` | M4 | R6 |
| F17 | Responsive Layout & Viewports | Pixel-perfect layout from 320px mobile to 1440px+ desktop with zero horizontal overflow | M4 | R6 |
| F18 | Comprehensive E2E Verification | 100% pass of E2E test suite (Tiers 1-4) across all features and scenarios | M5 | Acceptance Criteria |
| F19 | Adversarial Hardening (Tier 5) | White-box stress testing, edge-case hardening, and zero-defect validation | M5 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M1 | Foundation & Design System | Scaffolding, Tailwind config, CSS grid, 1px borders, typography, Header & Footer with SYSTEM // ONLINE pulse | none | DONE |
| M2 | Hero & SVG Terminal Schematic | Hero typography, custom responsive SVG terminal schematic, stroke-dasharray animation, sequential text reveal, blinking cursor | M1 | DONE |
| M3 | Content Sections (Work, Stack, About, Contact) | Kairoku showcase, 6-category Stack spec sheet, About & Education blocks, Contact module | M1 | DONE |
| M4 | Motion, Transitions, Boot & A11y | <1s Boot sequence, Intersection Observer scroll reveals, hover states, `prefers-reduced-motion` disablement, responsive tuning (320px-1440px) | M2, M3 | DONE |
| M5 | E2E Test Pass & Hardening | 100% test pass on 4-tier E2E suite, adversarial challenger hardening, final forensic audit | M4 | DONE |

## Interface Contracts
### Design Tokens & CSS Utilities (`app/globals.css`, `tailwind.config.ts`)
- Background: `bg-[#FBFBFB]` / `bg-[#F7F7F5]`
- Borders: `border border-black` (1px solid `#000000`)
- Accents: `text-[#0055FF]`, `bg-[#0055FF]`, `border-[#0055FF]`
- Grid Background Class: `.tech-grid` (`background-size: 24px 24px`, `linear-gradient(...)`)
- Motion Reducer: `@media (prefers-reduced-motion: reduce)` overrides all animation durations to `0s !important` and opacities to `1 !important`.

### Component Interface Layout (`components/`)
- `Header.tsx`: Navigation links (`#work`, `#stack`, `#about`, `#contact`), `SYSTEM // ONLINE` badge with pulsing dot.
- `Hero.tsx`: Typography, metadata grid, `<TerminalSchematic />` container.
- `TerminalSchematic.tsx`: Responsive SVG technical drawing with self-drawing strokes, sequential commands, blinking cursor.
- `SelectedWork.tsx`: Project card for "KAIROKU", architecture details, tags, "OPEN SYSTEM" link.
- `StackSpec.tsx`: Technical specification sheet table/grid for 6 technology categories.
- `AboutEducation.tsx`: Technical layout for engineering background, philosophy, education.
- `Contact.tsx`: Email contact card, status badge, direct action button.
- `Footer.tsx`: Technical footer with online status, copyright, and metadata.
- `BootSequence.tsx`: Client-side boot overlay that runs for ~800ms before unlocking main view.
- `ScrollReveal.tsx`: Intersection Observer wrapper applying reveal classes.

## Code Layout
```
D:/Web Projects/Portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── TerminalSchematic.tsx
│   ├── SelectedWork.tsx
│   ├── StackSpec.tsx
│   ├── AboutEducation.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── BootSequence.tsx
│   └── ScrollReveal.tsx
├── public/
│   └── (static assets if any)
├── tests/
│   ├── e2e/
│   │   ├── tier1_features.test.ts (or runner scripts)
│   │   ├── tier2_boundaries.test.ts
│   │   ├── tier3_combinations.test.ts
│   │   └── tier4_scenarios.test.ts
│   └── test-runner.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── PROJECT.md
├── TEST_INFRA.md
└── TEST_READY.md
```
