# Technical Specification Survey & Architecture Document
**Project**: Abraham Grace — Personal Developer Portfolio  
**Target Platform**: Next.js (App Router), TypeScript, Tailwind CSS  
**Survey Date**: 2026-08-22  
**Agent**: Technical Specification Miner (`explorer_survey_technical`)

---

## 1. Executive Summary & Core Constraints

The goal is to build a high-performance, production-quality developer portfolio for **Abraham Grace** featuring a technical, industrial "hardware/product launch" aesthetic. The site operates with an off-white background, 1px solid black borders, a subtle static CSS grid, and an original animated SVG terminal schematic.

### 🔒 Non-Negotiable Architectural Constraints
1. **Framework & Language**: Next.js 14+ / 15 (App Router) + TypeScript in strict mode.
2. **Styling**: Tailwind CSS with custom theme extensions (tokens, animations, utilities).
3. **Animation Engine**: **Strictly NO GSAP, NO Framer Motion, NO external JS animation packages**. Pure CSS `@keyframes`, CSS transitions, and vanilla React Intersection Observer hooks.
4. **Performance**: Only GPU-composited CSS properties (`transform`, `opacity`, `stroke-dashoffset`). Zero layout thrashing.
5. **Boot Sequence**: Ultra-fast boot sequence on page load completing in **< 1.0 second**.
6. **Accessibility**: 100% compliance with `@media (prefers-reduced-motion: reduce)`, full keyboard navigability (`:focus-visible`), and semantic HTML.
7. **Responsiveness**: Pixel-perfect layout from **320px (mobile)** to **1440px+ (ultrawide)** with zero horizontal overflow.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error / Fallback Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|---------------------------|----------------|
| 1 | Architecture | Next.js App Router & TypeScript Foundation | Root layout, page, font loaders, metadata, and strict type definitions for all data structures. | App config, metadata objects, project data types. | SSR-rendered HTML + hydrated client islands. | Fallback to static SSR if client JS fails. | ORIGINAL_REQUEST R1 |
| 2 | Design System | Static CSS Square Grid Background | Subtle, light-gray square grid background rendered via CSS linear-gradients. | CSS custom variables / Tailwind utility (`bg-grid-pattern`). | Rendered 24px-32px grid pattern over warm off-white canvas. | Degrades to clean off-white background if gradients unsupported. | ORIGINAL_REQUEST R2 |
| 3 | Design System | 1px Black Border Precision Token System | Structural 1px solid black borders dividing sections, cards, headers, footers, and interactive elements. | Tailwind border classes (`border-black border-t border-b`). | Razor-sharp 1px black divider lines without blur or subpixel aliasing. | Standard border fallback. | ORIGINAL_REQUEST R2 |
| 4 | Design System | Technical Dual-Font Typography System | Condensed/technical sans-serif for headings and clean legible sans-serif for body copy, with monospace code tags. | Google Fonts / Next Font loaders (e.g. Space Grotesk / Inter / JetBrains Mono). | Consistent typography hierarchy with zero layout shift (FOUT/FOIT). | System sans-serif fallback stack. | ORIGINAL_REQUEST R2 |
| 5 | Component | Top Navigation Header with Pulsing Dot | Fixed/sticky top header with minimal nav (WORK, STACK, ABOUT, CONTACT) and "SYSTEM // ONLINE" pulsing blue status badge. | Nav link click / scroll position. | Fixed header with 1px border-b and pulsing blue SVG/CSS dot. | Reduced motion stops dot animation (solid blue). | ORIGINAL_REQUEST R4 |
| 6 | Component | Fast Boot Sequence Loader (<1s) | Initial load sequence transitioning "SYSTEM INITIALIZING..." -> "INTERFACE // READY" within <1000ms. | Initial page mount event. | Seamless transition from boot status banner to fully loaded hero state. | Skip boot sequence immediately if `prefers-reduced-motion` is active or SSR. | ORIGINAL_REQUEST R5 |
| 7 | Component / Motion | Custom SVG Terminal Schematic Illustration | Original responsive engineering workstation vector schematic with dimensions, crosshairs, and port labels. | SVG viewport dimensions, responsive container. | Scalable vector graphic with technical chassis and circuit lines. | Clean static SVG render if animations disabled. | ORIGINAL_REQUEST R3 |
| 8 | Motion | SVG Stroke-Dasharray Line Drawing | Vector lines of terminal frame draw progressively on page load using CSS `@keyframes`. | CSS stroke-dashoffset / stroke-dasharray parameters. | Smooth visual line-drawing effect of the workstation perimeter and internal buses. | Stroke rendered fully solid at 0 offset under reduced motion. | ORIGINAL_REQUEST R3 |
| 9 | Motion | Sequential Terminal Text Reveal & Blinking Cursor | Stepped revelation of terminal prompt commands and output logs with blinking block cursor. | CSS animation-delay steps. | Typewriter / sequential fade-in log lines ending with blinking cursor. | All text rendered visible immediately without delay in reduced motion. | ORIGINAL_REQUEST R3 |
| 10 | Component | Hero Section Typography & Technical Metadata | Large "SOFTWARE DEVELOPER" headline, Abraham Grace intro, engineering badges, and viewport telemetry. | Developer profile props. | Industrial hero presentation combining typography and terminal SVG. | Responsive wrap on small viewports. | ORIGINAL_REQUEST R4 |
| 11 | Component | Selected Work Showcase ("KAIROKU") | Single featured marquee project display with technical specs, architecture highlights, tech tags, and "OPEN SYSTEM" CTA. | Project metadata object (title, stack, description, live links). | Technical project card with 1px black containment and hover accents. | Accessible fallback link if JavaScript is inactive. | ORIGINAL_REQUEST R4 |
| 12 | Component | Technical Specification Stack Sheet | Categorized tech stack (Language, Backend, Database, Cloud, Frontend, Tools) presented as a technical data sheet. | Structured stack matrix (categories, technologies, proficiency/specs). | Multi-column technical spec sheet with monospace indices and grid alignment. | Single/two column reflow on mobile viewports. | ORIGINAL_REQUEST R4 |
| 13 | Component | About & Education Structured Text Blocks | Minimal, high-density structured text sections containing bio, engineering philosophy, and academic credentials. | About bio and education records. | Clean typography blocks with technical bullet indicators and metadata tags. | Standard responsive flow. | ORIGINAL_REQUEST R4 |
| 14 | Component | Contact Section & Technical Footer | Prominent direct email CTA with copy-to-clipboard / mailto link, footer tech stack summary, and secondary "SYSTEM // ONLINE" badge. | User click / hover interactions. | Clean contact interface without bloated forms; full system footer. | Standard mailto fallback if clipboard API is blocked. | ORIGINAL_REQUEST R4 |
| 15 | Motion | Intersection Observer Scroll Reveals | Custom hook detecting viewport entry to trigger staggered opacity & translateY reveals per section. | Scroll position, element viewport intersection. | Sections fade in and slide up smoothly (12px translation). | Immediately visible at 100% opacity without translation if reduced motion is enabled. | ORIGINAL_REQUEST R5 |
| 16 | Motion / Interaction | Technical Micro-Interaction Hover States | Minimal hover behaviors on links and buttons (electric blue `#0066FF`, 1-2px micro-translations, bracket wraps). | Pointer hover / focus events. | Crisp visual feedback reinforcing technical precision. | Transitions disabled / instant under reduced motion. | ORIGINAL_REQUEST R5 |
| 17 | Accessibility | Reduced Motion Detection & Enforcement | Global CSS and React state respecting user motion preferences via media queries. | `@media (prefers-reduced-motion: reduce)` / `window.matchMedia`. | All transitions, line draws, pulses, and scroll delays zeroed out. | Default static render. | ORIGINAL_REQUEST R6 |
| 18 | Accessibility | High-Contrast Keyboard Focus Ring System | Custom `:focus-visible` styles with electric blue 2px offset outlines. | Tab key / keyboard navigation. | Clear visual focus indicator compliant with WCAG 2.1 AA. | Default browser outline fallback. | ORIGINAL_REQUEST R6 |

---

## 3. Edge Cases & Boundary Conditions

| # | Feature | Scenario / Input | Observed / Specified Behavior | Implementation Mitigation |
|---|---------|------------------|-------------------------------|---------------------------|
| 1 | Boot Sequence | Fast page reload or navigation | Boot sequence must never block user interaction or take >1s. | Set boot timer to exactly 650ms-800ms total, auto-dismiss with `sessionStorage` or quick CSS fade. |
| 2 | Accessibility | `prefers-reduced-motion: reduce` active | User has OS-level reduced motion enabled. | Skip boot sequence immediately (0ms), set all SVG `stroke-dashoffset: 0`, disable keyframe loops, set pulse dot to static. |
| 3 | Scroll Reveal | Fast scrolling before hydration | User vigorously scrolls down immediately on page load. | IntersectionObserver initializes with `rootMargin: '0px 0px -50px 0px'` and fallback `opacity: 1` if JS is disabled or observer triggers instantly. |
| 4 | SVG Terminal | Small mobile screen (320px width) | Complex SVG schematic in narrow mobile viewport. | Use responsive `viewBox="0 0 480 320"` with `w-full h-auto max-w-full`, preserveAspectRatio="xMidYMid meet", ensure text labels inside SVG remain legible or scale gracefully. |
| 5 | Viewport Resize | Desktop to Mobile resize during session | Window width changes across breakpoints. | Static CSS grid and flex/grid containers reflow without JavaScript state changes or layout breakages. |
| 6 | Grid Background | High DPI / Retina screens | CSS grid background lines on 2x/3x pixel densities. | Use precise CSS `background-size: 24px 24px` with `linear-gradient` using subpixel color stops to prevent moiré patterns or line blurring. |
| 7 | 1px Borders | Nested border collapsing | Adjoining cards or sections creating double 2px borders. | Use structured directional borders (`border-b`, `border-t -mt-[1px]` or grid gap styling) to guarantee exact 1px line thickness throughout. |
| 8 | Contact Action | Clipboard copy in insecure context (HTTP / restricted iframe) | User clicks to copy email address on unsupported environment. | Feature-detect `navigator.clipboard`; fallback smoothly to opening `mailto:abrahamgrace@example.com` or displaying raw text. |
| 9 | High Zoom | Browser zoom at 200% - 400% | Text scaling causes container overflow or overlapping text. | Use relative units (`rem`, `em`), avoid fixed pixel heights on content containers, use `flex-wrap` and `break-words`. |
| 10 | SEO & Crawlers | Search engine bot with JavaScript disabled | Bot indexing portfolio content. | SSR via Next.js App Router ensures 100% of text, Kairoku project info, and stack sheet are fully present in initial HTML payload. |

---

## 4. Architectural & Engineering Specifications

### 4.1 Technology Stack & Directory Structure
```
Portfolio/
├── .agents/                      # Agent orchestration & specifications
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with font definitions & grid background
│   ├── page.tsx                  # Main single-page portfolio layout
│   ├── globals.css               # Global CSS, grid utilities, keyframes, reduced-motion rules
│   └── favicon.ico               # Technical favicon
├── components/
│   ├── ui/
│   │   ├── BootSequence.tsx      # <1s technical initialization sequence
│   │   ├── SystemStatusDot.tsx   # SYSTEM // ONLINE pulsing blue status indicator
│   │   └── TechnicalCard.tsx     # 1px border container with technical metadata brackets
│   ├── layout/
│   │   ├── Header.tsx            # Technical sticky nav bar with 1px border
│   │   └── Footer.tsx            # Engineering metadata footer
│   ├── sections/
│   │   ├── HeroSection.tsx       # Large headline, intro copy, and terminal illustration
│   │   ├── TerminalSchematic.tsx # Custom animated SVG engineering schematic
│   │   ├── SelectedWork.tsx      # Kairoku showcase card & specs
│   │   ├── TechStack.tsx         # Technical specification sheet
│   │   ├── AboutEducation.tsx    # Structured engineering bio & education credentials
│   │   └── ContactSection.tsx    # Direct contact & communication interface
│   └── hooks/
│       ├── useIntersectionObserver.ts # Lightweight viewport reveal hook
│       └── useReducedMotion.ts        # Client hook for motion preference detection
├── lib/
│   └── data.ts                   # Strongly-typed portfolio data (Kairoku, Stack, Bio)
├── public/                       # Static assets (favicons, manifest)
├── tailwind.config.ts            # Tailwind custom theme, colors, animations, font families
├── tsconfig.json                 # Strict TypeScript configuration
└── package.json                  # Next.js 14/15, React 18/19, Tailwind, Lucide/Icons (zero heavy animation libs)
```

### 4.2 Visual Design System & Design Tokens

#### Color Palette
- **Canvas / Background**: `#FAFAF9` (Off-white / Warm Technical White)
- **Grid Lines**: `rgba(0, 0, 0, 0.05)` (Subtle technical square grid)
- **Borders & Rules**: `#000000` (1px solid black structural lines)
- **Primary Typography**: `#0A0A0A` / `#000000` (Deep black)
- **Secondary / Metadata**: `#525252` / `#737373` (Technical slate gray)
- **Accent Color**: `#0066FF` (Electric Technical Blue) / `#0052FF`
- **Accent Muted**: `rgba(0, 102, 255, 0.08)` (Subtle blue hover tint)

#### Typography Stack
- **Display / Headings**: Condensed Technical Sans (`Space Grotesk`, `Chakra Petch`, or `Cabinet Grotesk` with `tracking-tight` / `uppercase`)
- **Body Text**: Clean Sans-Serif (`Inter` or `Geist Sans`)
- **Technical Monospace**: `JetBrains Mono` or `Geist Mono` for labels (`SYSTEM // ONLINE`, `DIM: 480x320`, `REV: 2.0.4`, code blocks)

#### Static CSS Grid Specification
```css
/* In globals.css */
.bg-technical-grid {
  background-color: #FAFAF9;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: -1px -1px;
}
```

---

## 5. Animation Engine & SVG Mechanics (NO GSAP / NO Framer Motion)

### 5.1 SVG Terminal Schematic Architecture
The Hero section includes a custom `<svg>` element representing a precision engineering workstation/terminal:
- **Dimensions & ViewBox**: `viewBox="0 0 600 400"` with responsive vector scaling.
- **Structural Elements**:
  1. Outer Chassis: Rounded-sm or bevel-corner rectangle with 1px border.
  2. Header Bar: Window controls (`[ x ] [ - ] [ + ]`), title `TERMINAL // SYS_CORE_V1`, clock/frequency indicator `FREQ: 4.2GHz`.
  3. Measurement Marks: Ruler ticks along top/side borders (`| | | | |`), crosshair target registration marks (`+`) at coordinates `(40, 40)`, `(560, 360)`.
  4. Prompt & Command Lines:
     - Line 1: `abraham@eng-node:~$ initialize --system`
     - Line 2: `[SYS] KERNEL INITIALIZED ... [OK]`
     - Line 3: `[PRJ] SELECTED_WORK: KAIROKU [ACTIVE]`
     - Line 4: `[I/O] READY FOR COMMANDS_` (with blinking cursor block `■`)

### 5.2 Pure CSS Animation Implementations

#### 1. SVG Stroke Drawing (`stroke-dasharray` / `stroke-dashoffset`)
```css
@keyframes lineDraw {
  from {
    stroke-dashoffset: 1200;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.animate-draw-frame {
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: lineDraw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-draw-sub {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: lineDraw 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}
```

#### 2. Sequential Terminal Output Reveal
```css
@keyframes termLineReveal {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.term-line-1 { animation: termLineReveal 0.3s ease-out 0.3s forwards; opacity: 0; }
.term-line-2 { animation: termLineReveal 0.3s ease-out 0.5s forwards; opacity: 0; }
.term-line-3 { animation: termLineReveal 0.3s ease-out 0.7s forwards; opacity: 0; }
.term-line-4 { animation: termLineReveal 0.3s ease-out 0.9s forwards; opacity: 0; }
```

#### 3. Terminal Cursor Blink
```css
@keyframes cursorBlink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.animate-cursor-blink {
  animation: cursorBlink 0.9s infinite steps(1);
}
```

#### 4. "SYSTEM // ONLINE" Pulsing Blue Dot
```css
@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.85);
  }
}

.animate-pulse-dot {
  animation: statusPulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transform-origin: center;
}
```

#### 5. Fast Boot Sequence (<1s)
```css
@keyframes bootFadeOut {
  0% {
    opacity: 1;
    visibility: visible;
  }
  85% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

.animate-boot-sequence {
  animation: bootFadeOut 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

#### 6. Scroll Reveal Hook & CSS Transition
```typescript
// useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect reduced motion instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
```

```css
/* In globals.css */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

#### 7. Prefers-Reduced-Motion Override Rules
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .animate-draw-frame,
  .animate-draw-sub {
    stroke-dashoffset: 0 !important;
  }

  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }

  .animate-pulse-dot {
    opacity: 1 !important;
    transform: none !important;
  }

  .term-line-1,
  .term-line-2,
  .term-line-3,
  .term-line-4 {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 6. Detailed Section Specifications & Content Breakdown

### 6.1 Header (`<Header />`)
- **Structure**: Sticky top bar, `border-b border-black bg-[#FAFAF9]/90 backdrop-blur-none`.
- **Left**: Name / Identity `ABRAHAM GRACE // ENG` or `AG.DEV`.
- **Center**: Technical Status indicator `SYSTEM // ONLINE` with the pulsing blue dot (`#0066FF`).
- **Right**: Nav Links `[ 01: WORK ]`, `[ 02: STACK ]`, `[ 03: ABOUT ]`, `[ 04: CONTACT ]`.
- **Hover**: Text turns electric blue (`text-[#0066FF]`), subtle 1px translate up.

### 6.2 Hero Section (`<HeroSection />` & `<TerminalSchematic />`)
- **Structure**: 2-column grid on desktop (`lg:grid-cols-12`), 1-column on mobile.
- **Col 1 (Headline & Copy)**:
  - Technical tag: `// ROLE: SOFTWARE DEVELOPER // SPEC: FULL-STACK & SYSTEMS`.
  - Massive Condensed Heading: `SOFTWARE DEVELOPER`.
  - Sub-copy: High-precision engineering statement highlighting Abraham Grace's focus on scalable backend architecture, intuitive frontends, and robust software craftsmanship.
  - CTAs: `[ EXPLORE WORK ]` (anchor scroll to Work) and `[ VIEW STACK ]`.
- **Col 2 (Interactive SVG Schematic)**:
  - Custom responsive SVG terminal described in Section 5.1 with real-time schematic marks and line-drawn frame.

### 6.3 Selected Work (`<SelectedWork />` — Project: "KAIROKU")
- **Structure**: Full-width technical blueprint card enclosed in a crisp 1px black border.
- **Header Bar**: `PROJECT_ID: PRJ-01 // STATUS: PRODUCTION`.
- **Project Title**: `KAIROKU`.
- **Subtitle / Architecture**: High-throughput distributed log indexing & analysis system / technical platform.
- **Tech Stack Specification Tags**: Monospace badge pills (e.g. `TypeScript`, `Next.js`, `Node.js / Go`, `PostgreSQL`, `Tailwind CSS`, `Docker`).
- **Description Copy**: Deep-dive into technical architecture, engineering trade-offs, performance metrics (e.g. sub-50ms query latency, zero-copy ingestion).
- **Action**: Direct `[ OPEN SYSTEM ↗ ]` CTA with technical hover bracket shift.

### 6.4 Tech Stack (`<TechStack />`)
- **Structure**: Technical Specification Sheet / Telemetry matrix.
- **Table / Grid Layout**: 6 primary categories:
  1. `Language`: TypeScript, JavaScript, Python, Go / C++, SQL.
  2. `Backend`: Node.js, Next.js API Routes, Express, REST / GraphQL, gRPC.
  3. `Database`: PostgreSQL, Redis, MongoDB, Prisma ORM.
  4. `Cloud & DevOps`: AWS, Docker, Vercel, CI/CD Actions, Linux.
  5. `Frontend`: React, Next.js (App Router), Tailwind CSS, HTML5/CSS3, Web APIs.
  6. `Tools & Testing`: Git, Jest / Vitest, Playwright, Postman, VS Code.
- **Visual Presentation**: Monospace index numbers (`01/`, `02/`, ...), 1px black column dividers, subtle hover row highlight.

### 6.5 About & Education (`<AboutEducation />`)
- **Structure**: Split architectural grid.
- **About Block**: Technical narrative detailing Abraham Grace's software engineering background, problem-solving philosophy, and focus on clean system design.
- **Education & Credentials Block**: Structured academic records, degree, key coursework in Computer Science & Engineering, certifications, and technical honors.

### 6.6 Contact Section & Footer (`<ContactSection />` & `<Footer />`)
- **Contact Interface**:
  - High-visibility direct contact terminal: Primary email link (`abrahamgrace...`), copy-to-clipboard button with visual `[ COPIED TO CLIPBOARD ]` feedback state.
  - Secondary social/code repositories: GitHub, LinkedIn.
  - Zero bloated or simulated forms — direct, immediate communication channels.
- **Footer**:
  - Full-width 1px black top border.
  - Left: `ABRAHAM GRACE © 2026 // ALL SYSTEMS OPERATIONAL`.
  - Center: `BUILT WITH NEXT.JS + TAILWIND // ZERO-JS MOTION ENGINE`.
  - Right: Secondary `SYSTEM // ONLINE` pulsing blue indicator.

---

## 7. Implementation Guidelines & Quality Checklist

1. **Zero External Motion Dependencies**:
   - `package.json` must NOT contain `framer-motion`, `gsap`, `@motionone/dom`, or `animejs`.
   - All animations must be in `globals.css` or Tailwind config keyframes.
2. **GPU Performance**:
   - Only `transform`, `opacity`, and `stroke-dashoffset` in animations.
   - Use `will-change: transform, opacity` prudently on active reveal elements.
3. **Responsive Verification**:
   - Test at 320px, 375px, 768px, 1024px, 1280px, 1440px.
   - Guarantee zero horizontal scroll (`overflow-x: hidden` safety on root).
4. **Accessibility Compliance**:
   - Check `prefers-reduced-motion: reduce` turns off all animations cleanly.
   - All links and interactive controls have `:focus-visible` ring (`outline-2 outline-offset-2 outline-[#0066FF]`).
   - SVG elements have proper `role="img"` and `aria-label="Engineering Workstation Terminal Schematic"`.
5. **Fast Boot Guarantee**:
   - Total duration < 1000ms.
   - Render unblocked content immediately for SSR / crawlers.

---
