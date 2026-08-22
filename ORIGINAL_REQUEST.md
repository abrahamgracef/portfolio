# Original User Request

## Initial Request — 2026-08-22T13:41:25Z

# Teamwork Project Prompt — Draft

> Status: Launched.
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: [none — teamwork routes from the description]

A premium, production-quality personal developer portfolio for Abraham Grace, acting as both an engineering document and a software developer portfolio. It must use a specific technical, industrial design language featuring an off-white background, 1px black borders, a subtle grid, and a custom SVG terminal schematic. The portfolio must incorporate subtle, premium, mechanical animations that make it feel like high-end software coming online, while respecting performance and accessibility.

Working directory: D:/Web Projects/Portfolio
Integrity mode: development

## Requirements

### R1. Tech Stack & Architecture
Build a frontend application using Next.js (App Router), TypeScript, and Tailwind CSS. Use CSS transitions, keyframes, and Intersection Observer for animations. Do NOT use heavy JS animation libraries like GSAP or Framer Motion.

### R2. Visual Design Language
Implement a "premium hardware/product launch" aesthetic. This strictly requires:
- Off-white/warm white background with a subtle, light-gray static CSS-based square grid.
- Thin 1px black borders for structural lines and horizontal section divisions.
- Black typography with an electric/bright blue accent color.
- A modern condensed/technical sans-serif font for large headings, and a clean sans-serif for body content. No gradients, glassmorphism, or heavy shadows.

### R3. Custom SVG Terminal Schematic & Animation
Create an original, responsive SVG illustration in the Hero section representing a minimal engineering terminal/workstation. It must look like a technical schematic with structural lines, measurement marks, and technical labels.
Animate the SVG: the terminal frame should draw itself quickly (e.g., stroke-dasharray), text should reveal sequentially (command then output), and a subtle blinking cursor should be present.

### R4. Required Sections & Content
Implement the following structured sections:
- **Header**: Minimal technical nav (WORK, STACK, ABOUT, CONTACT) and "SYSTEM // ONLINE" indicator (with a slow pulsing blue dot).
- **Hero**: Large "SOFTWARE DEVELOPER" typography, supporting copy, and the custom SVG terminal.
- **Selected Work**: Showcase exactly one project ("KAIROKU") with specified tech stack and "OPEN SYSTEM" link.
- **Stack**: Displayed as a technical specification sheet (Language, Backend, Database, Cloud, Frontend, Tools) using typography and columns.
- **About & Education**: Minimal, structured text blocks containing the provided copy.
- **Contact & Footer**: Highly visible email link, no large forms. Footer with name, role, stack, and online status.

### R5. Motion, Interaction & Scroll Reveals
- **Page Load**: A very short (<1s) boot sequence (e.g., "SYSTEM INITIALIZING..." -> "INTERFACE // READY"), followed by staggered reveal of hero text and metadata.
- **Scroll Reveals**: Sections and the Kairoku project reveal sequentially on scroll (opacity 0->1, short translateY).
- **Hover States**: Navigation, CTAs, and Stack items should have precise, minimal hover effects (blue accent, slight 1-2px shifts).

### R6. Responsive Design & Accessibility
The layout must maintain its technical aesthetic and visual hierarchy across all devices.
Animations must be lightweight (opacity, transform) and strictly respect `prefers-reduced-motion` by disabling page-load, SVG drawing, scroll reveals, and pulsing animations when active.

## Acceptance Criteria

### Technical Foundation & Performance
- [ ] Project is built with Next.js App Router, TypeScript, and Tailwind CSS without GSAP or Framer Motion.
- [ ] Animations use GPU-friendly properties (transform, opacity) and avoid expensive JS loops.
- [ ] Page is responsive and renders cleanly at mobile (320px) and desktop (1440px) widths without horizontal overflow.

### Visual & Stylistic Enforcement
- [ ] Background is off-white and includes a static, responsive CSS-based grid pattern.
- [ ] Section dividers and structural elements use 1px solid black borders.
- [ ] Typography uses a discernible contrast between large, condensed headings and clean body copy.

### Content, Components & Interaction
- [ ] The Hero section contains an `<svg>` terminal schematic where the frame draws on load and text reveals sequentially with a blinking cursor.
- [ ] A fast (<1s) boot sequence plays on initial page load before revealing hero content.
- [ ] Sections reveal smoothly on scroll using short opacity and translate transitions.
- [ ] Navigation links and CTAs feature subtle, technical hover states using the blue accent color.
- [ ] Header and Footer contain the "SYSTEM // ONLINE" text with a slowly pulsing blue dot.

### Accessibility
- [ ] All animations are completely disabled when `prefers-reduced-motion` is active.

## Follow-up — 2026-08-22T13:50:30Z

The user has noted that they only have 6% of their weekly API credits remaining. Please optimize for token usage, avoid unnecessary back-and-forth or excessive iterations, and aim to complete the remaining milestones as efficiently as possible while maintaining the core requirements.
