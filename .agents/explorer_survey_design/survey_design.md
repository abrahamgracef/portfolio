# Visual Design & Section Content Specifications
**Project**: Abraham Grace — Personal Developer Portfolio & Engineering Document  
**Specification Source**: `D:/Web Projects/Portfolio/.agents/ORIGINAL_REQUEST.md`  
**Miner**: `explorer_survey_design`  
**Date**: 2026-08-22  

---

## 1. Executive Summary & Design Philosophy
The portfolio is designed as an **engineering document** and **software developer workstation interface** for **Abraham Grace**. It departs from generic web trends (no gradients, no glassmorphism/blur, no heavy drop shadows) in favor of a **"premium hardware / product launch" aesthetic**:
- **Tactile & Structural**: Crisp 1px solid black borders, precise alignment, technical grids.
- **Warm Industrial Background**: Off-white / warm white background with a subtle, static CSS square grid.
- **Electric Accent**: High-contrast black typography accented by an electric/bright blue (`#0055FF` / `#0066FF`) for active states, indicators, and links.
- **Typography Hierarchy**: High-contrast modern condensed/technical sans-serif for large display headings, paired with ultra-clean body sans-serif and monospace technical labels.
- **Mechanical Precision**: Fast, lightweight animations (frame draws, sequential terminal reveals, pulsing status indicators) that respect performance and accessibility (`prefers-reduced-motion`).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Visual System | Off-White Surface Canvas | Warm off-white base layer (`#FAFAF9` / `#F5F5F3`) providing tactile paper/hardware feel | Viewport dimensions | CSS background color token | Fallback to `#FFFFFF` | ORIGINAL_REQUEST.md § R2 |
| 2 | Visual System | CSS Square Grid Pattern | Responsive, static light-gray square grid (e.g. 24px–32px squares) | CSS linear-gradient background | Subtle 1px grid overlay | Fallback to solid background | ORIGINAL_REQUEST.md § R2, § Acceptance Criteria |
| 3 | Visual System | 1px Black Structural Borders | Crisp 1px solid black dividing lines (`#000000` / `#111111`) for containers and sections | CSS `border-black border-[1px]` | Rigid structural delineation | Standard fallback to solid border | ORIGINAL_REQUEST.md § R2 |
| 4 | Visual System | Electric Blue Accent System | High-visibility electric blue (`#0055FF` / `#0066FF`) for status badges, cursor, hover states | Hover / Active / Focus triggers | Color shifts, glowing pulses | Fallback to high-contrast blue | ORIGINAL_REQUEST.md § R2, § R5 |
| 5 | Typography | Dual Font Hierarchy | Condensed technical sans headings (large display) + clean sans body + monospace labels | Text strings & hierarchy level | Styled semantic typography | Standard web-safe font stack fallback | ORIGINAL_REQUEST.md § R2 |
| 6 | Navigation | Technical Minimal Header | Sticky top bar with 4 uppercase nav links (`WORK`, `STACK`, `ABOUT`, `CONTACT`) | User scroll / click | Smooth section navigation | Fallback to standard anchor jumps | ORIGINAL_REQUEST.md § R4 |
| 7 | Navigation | Live System Status Dot | `SYSTEM // ONLINE` badge with a slow pulsing electric blue dot | Time / CSS keyframe | Rhythmic pulsing dot animation | Static dot on `prefers-reduced-motion` | ORIGINAL_REQUEST.md § R4 |
| 8 | Hero | Large Display Typography | Massive "SOFTWARE DEVELOPER" headline with developer name & metadata | Responsive viewport | High-impact technical headline | Scales down cleanly on mobile (320px) | ORIGINAL_REQUEST.md § R4 |
| 9 | Hero | Custom Animated SVG Terminal | Technical schematic illustration with measurement marks, labels, stroke-dasharray draw, blinking cursor | Page load event | Responsive SVG terminal graphic with sequential text | Render static terminal if motion reduced | ORIGINAL_REQUEST.md § R3 |
| 10 | Hero | Boot Sequence Overlay | Fast (<1s) boot sequence (`SYSTEM INITIALIZING...` -> `INTERFACE // READY`) | Window load | Quick transition to content | Skipped immediately if motion reduced | ORIGINAL_REQUEST.md § R5 |
| 11 | Selected Work | KAIROKU Project Showcase | Featured single-project card with technical overview, architecture, tech stack tags | Project metadata & URLs | Structured project showcase block | Graceful degradation if link target unavailable | ORIGINAL_REQUEST.md § R4 |
| 12 | Selected Work | "OPEN SYSTEM" Action Link | Minimal CTA link/button with 1px border and electric blue hover displacement | User hover / click | External link activation / hover shift | Accessible standard link | ORIGINAL_REQUEST.md § R4 |
| 13 | Stack | Spec Sheet Data Grid | 6-column / structured data sheet layout: Language, Backend, Database, Cloud, Frontend, Tools | Technical stack taxonomy | Tabular / card specification sheet | Stacked columns on mobile devices | ORIGINAL_REQUEST.md § R4 |
| 14 | About | Engineering Bio Block | Structured, minimalist text blocks detailing engineering philosophy and core skills | Text content | Clean technical paragraph layout | Responsive padding & alignment | ORIGINAL_REQUEST.md § R4 |
| 15 | Education | Structured Academic Block | Modular block detailing degree, institution, timeline, and academic focus | Degree & institution data | Bordered technical credential box | Responsive text wrapping | ORIGINAL_REQUEST.md § R4 |
| 16 | Contact | Direct Email Action Link | Prominent direct email CTA without bulky forms, styled with technical aesthetic | User click | Triggers `mailto:` client | Fallback copyable email address | ORIGINAL_REQUEST.md § R4 |
| 17 | Footer | Technical Specification Footer | Comprehensive footer with Name, Role, Tech Stack, Status indicator, and copyright | Viewport & system metadata | Grid of technical footer attributes | Stacks cleanly on mobile | ORIGINAL_REQUEST.md § R4 |
| 18 | Interaction | Precise Micro-Hover Effects | 1–2px translate / blue accent shifts on interactive links, tags, and buttons | Pointer hover / focus | Tactile mechanical movement | Disabled on touch screens / reduced motion | ORIGINAL_REQUEST.md § R5 |
| 19 | Motion | Scroll Reveal Transitions | Intersection Observer-triggered translateY (16px->0px) and opacity (0->1) | Viewport scroll position | Staggered section entrance | Immediate opacity 1 if motion reduced | ORIGINAL_REQUEST.md § R5 |
| 20 | Accessibility | Reduced Motion Mode | Complete suppression of boot sequence, stroke animations, scroll transitions, and pulses | `prefers-reduced-motion: reduce` | Instant static display of all elements | Clean, zero-jank static presentation | ORIGINAL_REQUEST.md § R6 |

---

## 3. Edge Cases & Boundary Conditions

| # | Feature | Input / Condition | Observed / Required Behavior |
|---|---------|-------------------|-----------------------------|
| 1 | Viewport Width | 320px (iPhone SE / narrow mobile) | Zero horizontal scroll; terminal SVG scales down proportionally; large display headings scale with `clamp()` or wrap cleanly; Stack grid switches from 6 columns to 1-2 columns; navigation collapses to compact technical bar or horizontal scroll. |
| 2 | Viewport Width | 1440px+ (Ultra-wide / large desktop) | Max container constrained (e.g. `max-w-7xl` or full-bleed with structured 1px border gridlines); grid pattern repeats seamlessly; SVG schematic maintains crisp vector lines. |
| 3 | Accessibility | `prefers-reduced-motion: reduce` | Terminal SVG stroke renders at full opacity without drawing delays; boot sequence finishes in 0ms; scroll reveals are static (opacity 1, transform none); pulsing blue dots remain solid electric blue. |
| 4 | Terminal SVG Rendering | Slow network / JS disabled | Semantic fallback text rendered in DOM; SVG renders purely via CSS / static vectors without JS dependency. |
| 5 | Email Client | User clicks Contact CTA with no configured email client | Display text includes clear plaintext email address so user can copy directly to clipboard. |
| 6 | Sticky Header | Scrolling rapidly past multiple sections | Header background stays solid off-white with 1px black border bottom, preventing content underlap from showing through; nav active indicator updates accurately via Intersection Observer. |

---

## 4. Visual Design System & Design Tokens

### 4.1 Color Palette & Token Architecture
Strict adherence to the industrial hardware specification:

```css
:root {
  /* Surface & Canvas */
  --color-bg-canvas: #FAFAF9;        /* Warm off-white base */
  --color-bg-surface: #FFFFFF;       /* Pure white for inner card contrast */
  --color-bg-subtle: #F4F4F2;        /* Secondary technical box background */
  
  /* Grid */
  --color-grid-line: rgba(0, 0, 0, 0.05); /* Subtle 1px static square grid */
  
  /* Borders & Dividers */
  --color-border-primary: #000000;   /* 1px solid black structural borders */
  --color-border-muted: #D4D4D0;     /* 1px muted gray secondary divider */
  
  /* Typography */
  --color-text-primary: #0A0A0A;     /* Deep black text */
  --color-text-secondary: #525252;   /* Muted technical gray */
  --color-text-tertiary: #737373;    /* Tertiary metadata gray */
  
  /* Accents */
  --color-accent-blue: #0055FF;      /* Electric / Bright Blue */
  --color-accent-blue-hover: #0040CC;/* Deepened electric blue */
  --color-accent-blue-subtle: rgba(0, 85, 255, 0.08); /* Light blue tint */
}
```

### 4.2 Tailwind CSS Configuration Mapping
```javascript
// tailwind.config.ts extension
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF9',
        surface: '#FFFFFF',
        subtle: '#F4F4F2',
        borderBlack: '#000000',
        accentBlue: {
          DEFAULT: '#0055FF',
          hover: '#0040CC',
          light: '#E6EFFF',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Barlow Condensed', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'ui-monospace', 'monospace'],
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
}
```

### 4.3 Static CSS Square Grid Background
The grid is pure CSS, static, non-intrusive, and hardware-precise:
```css
.bg-technical-grid {
  background-color: var(--color-bg-canvas);
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### 4.4 Typography System
| Hierarchy | Font Family | Size (Mobile) | Size (Desktop) | Weight | Tracking | Case | Purpose |
|-----------|-------------|---------------|----------------|--------|----------|------|---------|
| **Display Title** | Condensed Sans | 2.5rem (`text-4xl`) | 5.5rem (`text-8xl`) | 800 (Bold/Extrabold) | `-0.03em` | UPPERCASE | Hero "SOFTWARE DEVELOPER" |
| **Section Header** | Condensed Sans / Mono | 1.5rem (`text-2xl`) | 2.25rem (`text-4xl`) | 700 (Bold) | `-0.01em` | UPPERCASE | Section Titles (e.g. `01 // SELECTED WORK`) |
| **Subheadings** | Clean Sans / Mono | 1.125rem (`text-lg`) | 1.25rem (`text-xl`) | 600 (Semibold) | `0.00em` | Normal/Upper | Project Titles, Category Headers |
| **Body Content** | Clean Sans | 0.9375rem (`text-base`)| 1.0rem (`text-base`) | 400 (Regular) | `0.00em` | Normal | Project narratives, Bio, Descriptions |
| **Technical Labels** | Monospace | 0.75rem (`text-xs`) | 0.8125rem (`text-xs`) | 500 (Medium) | `+0.05em` | UPPERCASE | Nav items, Status indicators, Spec keys |
| **Terminal Output** | Monospace | 0.8125rem (`text-xs`) | 0.875rem (`text-sm`) | 400 (Regular) | `0.00em` | Normal | SVG terminal commands & responses |

### 4.5 Strict Negative Design Constraints (Enforcement Rules)
1. **NO Gradients**: Absolutely no linear or radial color gradient fills on cards, text, or backgrounds. All surfaces are flat solid colors.
2. **NO Glassmorphism**: No `backdrop-filter: blur()`, no semi-transparent frosted glass panels. Cards have crisp opaque backgrounds.
3. **NO Heavy Drop Shadows**: No `box-shadow: 0 20px 25px -5px ...`. If any elevation is needed, use 1px solid black offset or flat 2px hard shadow (`box-shadow: 2px 2px 0px #000000`).
4. **NO Bloated JS Libraries**: No Framer Motion, no GSAP. Only vanilla CSS keyframes, transitions, and native Intersection Observer.

---

## 5. Section-by-Section Content & Structure Specification

### Section 1: Header & Technical Navigation
- **Placement**: Fixed / Sticky at top, `z-50`, full width, `border-b border-black`, `bg-canvas/95`.
- **Layout**: 3-part horizontal split (Left: Identity/Logo, Center: Navigation Links, Right: System Status).
- **Content Matrix**:
  - **Left**: `ABRAHAM GRACE` `[DEV_SPEC_v2.6]` (Monospace / Condensed, tracking-widest).
  - **Center**: Navigation Links:
    - `WORK` (`#work`)
    - `STACK` (`#stack`)
    - `ABOUT` (`#about`)
    - `CONTACT` (`#contact`)
    - *Hover effect*: Electric blue text color + subtle 1px underline.
  - **Right**: System Status Indicator:
    - Text: `SYSTEM // ONLINE`
    - Visual: Slow pulsing electric blue dot (`w-2 h-2 rounded-full bg-accentBlue animate-pulse`).

---

### Section 2: Hero Section (Workstation & Schematic)
- **Placement**: First viewport section, min-height `min-h-[90vh]`, padded with structural 1px borders.
- **Top Metadata Bar**:
  - `LOC: 12.9716° N, 77.5946° E` // `ARCH: FULL-STACK / SYSTEMS` // `STATUS: AVAILABLE`
- **Headline Typography**:
  - Primary Display: **`SOFTWARE DEVELOPER`** (Condensed Sans, massive scale, tracking-tight).
  - Secondary Tagline: **`ENGINEERING HIGH-PRECISION WEB SYSTEMS & CLOUD INFRASTRUCTURE.`**
- **Supporting Copy**:
  - *"Specialized in full-stack architecture, high-performance web applications, and resilient cloud systems. Building software with mathematical rigor and industrial design principles."*
- **Custom SVG Terminal Schematic Component**:
  - **Visual Elements**:
    - Outer chassis with measurement dimension callouts (e.g. `W: 640px`, `H: 380px`, `SCALE: 1:1`).
    - Crosshair coordinate marks at corners (`+`, `T-1`, `T-2`).
    - Title bar: `TERM_01 // AG_SYS_KERNEL_v2.6.4` with status indicator.
    - Terminal window content:
      - Prompt: `$ ./init_portfolio --profile=abraham_grace`
      - Sequential log output:
        - `[INIT] Loading core architectural modules... [OK]`
        - `[INIT] Connecting to Next.js App Router & TypeScript runtime... [OK]`
        - `[INIT] Verified: 0 external animation bloat (GSAP/Framer: OFF)`
        - `[INIT] Abraham Grace workstation ready.`
      - Blinking block cursor: `_` / `█` in electric blue (`#0055FF`).
  - **Animation Sequence**:
    - 0.0s – 0.5s: Chassis lines draw using `stroke-dasharray` / `stroke-dashoffset`.
    - 0.5s – 1.0s: Terminal text reveals sequentially line-by-line.
    - 1.0s+: Cursor blinks continuously.
- **Boot Sequence Banner**:
  - Initial load state: `[ SYSTEM BOOT // COMPLETE ]` with timestamp.

---

### Section 3: Selected Work (Showcase: KAIROKU)
- **Placement**: `<section id="work">`, full-width container with 1px top & bottom black borders.
- **Section Header**: `01 // SELECTED WORK`
- **Project Name**: **`KAIROKU`**
- **Project Sub-title**: *AI-Powered Knowledge & Engineering Documentation System*
- **Project Structure**:
  - **Left / Main Column**:
    - **Overview**: *"A high-performance knowledge retrieval and documentation engine engineered for developers and teams. Integrates semantic indexing, automated code analysis, and vector-search pipelines to turn complex technical repositories into interactive, instantly searchable knowledge graphs."*
    - **Key Engineering Highlights**:
      - `01`: Real-time vector similarity indexing & multi-model LLM orchestration.
      - `02`: Sub-100ms query latency via tiered caching and optimized edge runtime.
      - `03`: Type-safe full-stack architecture with strict schema validation.
    - **Tech Stack Specification Chips**:
      - `TypeScript`
      - `Next.js App Router`
      - `Tailwind CSS`
      - `PostgreSQL / pgvector`
      - `Redis`
      - `Docker`
    - **Action Button**:
      - Label: **`OPEN SYSTEM →`**
      - Style: Solid 1px black border, off-white background, hover fills with electric blue (`#0055FF`) and white text with 1px mechanical shift.
  - **Right / Schematic Preview Column**:
    - Interactive technical system diagram or UI wireframe preview with 1px border, coordinate labels, and latency benchmarks (`LATENCY: 42ms`, `UPTIME: 99.98%`).

---

### Section 4: Stack (Technical Specification Sheet)
- **Placement**: `<section id="stack">`, structured data sheet layout with grid lines.
- **Section Header**: `02 // TECHNICAL SPECIFICATIONS`
- **Layout Structure**: 6 categorized technical columns/blocks with 1px black borders dividing each cell:
  1. **`01 / LANGUAGE`**
     - `TypeScript`
     - `JavaScript (ESNext)`
     - `Python`
     - `SQL (PostgreSQL)`
     - `HTML5 / CSS3`
  2. **`02 / BACKEND`**
     - `Node.js Runtime`
     - `Next.js API & Server Actions`
     - `Express / Fastify`
     - `RESTful APIs & GraphQL`
     - `Microservices Architecture`
  3. **`03 / DATABASE`**
     - `PostgreSQL`
     - `Redis (Caching & Queues)`
     - `Supabase / Prisma ORM`
     - `Drizzle ORM`
     - `Vector Databases (pgvector)`
  4. **`04 / CLOUD & INFRA`**
     - `Vercel Edge Platform`
     - `AWS (S3, Lambda, EC2)`
     - `Docker Containers`
     - `CI/CD Pipelines (GitHub Actions)`
     - `Cloudflare Workers & DNS`
  5. **`05 / FRONTEND`**
     - `React 19 / Server Components`
     - `Next.js (App Router)`
     - `Tailwind CSS`
     - `Responsive & Accessible UI (WAI-ARIA)`
     - `Native Web APIs & Intersection Observer`
  6. **`06 / TOOLS & WORKFLOW`**
     - `Git & GitHub`
     - `VS Code / Terminal Automation`
     - `Linux / POSIX Environments`
     - `Postman / Insomnia`
     - `Jest / Playwright E2E Testing`

---

### Section 5: About & Education
- **Placement**: `<section id="about">`, 2-column modular split with 1px black center divider.
- **Section Header**: `03 // ABOUT & EDUCATION`
- **Block A: Engineering Philosophy & Profile (About)**:
  - **Title**: `ENGINEERING PROFILE`
  - **Content**:
    - *"I am Abraham Grace, a software developer focused on architecting resilient, production-ready software systems. My work bridges the gap between hardware-inspired industrial design aesthetics and scalable cloud architecture."*
    - *"I approach software engineering with an emphasis on performance, determinism, and zero-bloat principles. Every interface I design is built to be fast, accessible, and structured like an uncompromising engineering document."*
  - **Core Attributes**:
    - `DISCIPLINE`: Full-Stack Engineering & Cloud Architecture
    - `FOCUS`: Performance, Minimal Footprint, Type-Safety
    - `LOCATION`: Available Globally (Remote / Hybrid)
- **Block B: Academic Credentials (Education)**:
  - **Title**: `ACADEMIC SPECIFICATIONS`
  - **Degree Block**:
    - **Institution**: `Engineering University / Computer Science Faculty`
    - **Degree**: `Bachelor of Technology in Computer Science & Engineering`
    - **Focus**: `Distributed Systems, Algorithms, Software Architecture`
    - **Status**: `Completed / Accredited`
  - **Continuous Learning & Certifications**:
    - `Advanced Cloud Infrastructure & Systems Architecture`
    - `Modern Full-Stack Development & Type-Safe Protocols`

---

### Section 6: Contact & Footer Section
- **Placement**: `<section id="contact">` + `<footer>`, final bottom section.
- **Section Header**: `04 // INITIATE TRANSMISSION`
- **Contact Action Matrix**:
  - **Headline**: `READY TO COLLABORATE ON PRODUCTION SYSTEMS?`
  - **Subtext**: *"Available for software engineering roles, technical architecture consulting, and high-impact engineering projects."*
  - **Email Action**:
    - Text Display: `abrahamgrace.dev@gmail.com` (or configurable email)
    - Primary CTA: **`INITIATE CONTACT [EMAIL] ↗`**
    - Interaction: Directly triggers `mailto:`, copies email on right-click/long-press with tooltip feedback `[COPIED]`.
    - No large bloated forms (strictly per R4: "Highly visible email link, no large forms").
  - **Alternative Channels**:
    - `GITHUB` (`https://github.com/...`)
    - `LINKEDIN` (`https://linkedin.com/in/...`)
    - `X / TWITTER` (`https://x.com/...`)
- **Technical Footer Matrix**:
  - 1px solid black top border.
  - 4-column data grid:
    - **Column 1**: `DEVELOPER // ABRAHAM GRACE`
    - **Column 2**: `ROLE // SOFTWARE DEVELOPER`
    - **Column 3**: `ENGINE // NEXT.JS + TS + TAILWIND`
    - **Column 4**: `STATUS // SYSTEM ONLINE (●)`
  - Bottom metadata: `© 2026 ABRAHAM GRACE. SPECIFICATION ID: AG-PORTFOLIO-2026. ALL RIGHTS RESERVED.`

---

## 6. Motion, Interaction & Accessibility Specification

### 6.1 Page Load Boot Sequence (<1s)
- **Duration**: Total sequence length $\le 800\text{ms}$.
- **Stage 1 (0ms - 300ms)**: Minimal system boot badge `[SYS_BOOT: OK]`.
- **Stage 2 (300ms - 600ms)**: Header status switches to `SYSTEM // ONLINE`.
- **Stage 3 (600ms - 800ms)**: Hero typography fades and steps into view (`opacity: 0 -> 1`, `translateY: 10px -> 0px`).
- **Reduced Motion**: If `prefers-reduced-motion: reduce` is detected, all stages complete in 0ms immediately.

### 6.2 Scroll Reveals (Intersection Observer)
- **Implementation**: Pure native `IntersectionObserver` in a lightweight React hook (`useScrollReveal` or Tailwind utility classes).
- **Parameters**: `threshold: 0.15`, `rootMargin: '0px 0px -50px 0px'`.
- **CSS Animation**:
  ```css
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .reveal-on-scroll.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }
  ```

### 6.3 Hover States & Micro-interactions
- **Navigation Links**: Color transitions from `text-black` to `text-accentBlue` with `border-b border-accentBlue` in `150ms`.
- **CTAs & Buttons**: Background shifts to `bg-accentBlue`, text to `text-white`, with a `translate-x-[1px] translate-y-[-1px]` tactile displacement.
- **Stack Items**: Subtle light blue highlight (`bg-accentBlue-light` / `border-accentBlue`) on hover.
- **Pulsing Dot**: Slow 2-second ease-in-out opacity oscillation (`opacity: 0.4` to `opacity: 1.0`).

### 6.4 Strict Accessibility (`prefers-reduced-motion`) Enforcement
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
  .animate-pulse {
    animation: none !important;
    opacity: 1 !important;
  }
}
```

---

## 7. Verification & Compliance Checklist
- [x] Background is off-white (`#FAFAF9`) with static CSS square grid.
- [x] 1px solid black borders used for all structural divisions and cards.
- [x] Electric blue (`#0055FF`) accent color specified for active states and indicators.
- [x] Condensed/technical sans display font + clean sans body font hierarchy defined.
- [x] Gradients, glassmorphism, and heavy shadows strictly prohibited.
- [x] Custom SVG terminal schematic specified with measurement lines, sequential reveal, and blinking cursor.
- [x] Header contains `WORK`, `STACK`, `ABOUT`, `CONTACT` and `SYSTEM // ONLINE` with pulsing dot.
- [x] Hero features large `SOFTWARE DEVELOPER` typography, supporting copy, and schematic.
- [x] Selected Work showcases `KAIROKU` with tech stack and `OPEN SYSTEM` link.
- [x] Stack section structured as a 6-category technical specification sheet.
- [x] About & Education structured in modular technical blocks.
- [x] Contact section has visible direct email link (no large form), and footer has full technical metadata.
- [x] Fast (<1s) boot sequence, Intersection Observer scroll reveals, and micro-hover states defined.
- [x] Full `prefers-reduced-motion` compliance specified.
