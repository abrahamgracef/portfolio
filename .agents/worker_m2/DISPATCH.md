## 2026-08-22T13:46:28Z
You are the Milestone 2 Worker (Hero & SVG Terminal Schematic) for the Abraham Grace Developer Portfolio project.
Your working directory is D:/Web Projects/Portfolio/.agents/worker_m2/
You MUST read:
1. D:/Web Projects/Portfolio/.agents/ORIGINAL_REQUEST.md
2. D:/Web Projects/Portfolio/PROJECT.md
3. D:/Web Projects/Portfolio/TEST_INFRA.md
4. D:/Web Projects/Portfolio/TEST_READY.md

Your exclusive write ownership:
- components/Hero.tsx
- components/TerminalSchematic.tsx
- app/page.tsx (updating Hero integration)
- app/globals.css (adding SVG stroke-dasharray and terminal keyframes)
- Your working directory: D:/Web Projects/Portfolio/.agents/worker_m2/

MANDATORY INTEGRITY WARNING:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task for Milestone 2:
1. Build an original, responsive, highly detailed `<svg>` Terminal Schematic component in `components/TerminalSchematic.tsx` (or within `components/Hero.tsx`):
   - Designed like a technical engineering workstation schematic: 1px crisp stroke lines, measurement ticks, dimension markers, corner brackets, technical telemetry labels (e.g. SYSTEM TELEMETRY, CPU LOAD: 0.12%, ARCH: ARM64/X86_64, BUS_FREQ: 3.8GHz).
   - Self-drawing frame animation via `stroke-dasharray` and `stroke-dashoffset` CSS keyframe transitions.
   - Sequential terminal text reveal (command executed -> delay -> response log output).
   - Monospace blinking cursor (`step-end` infinite keyframe).
   - Must scale responsively from 320px mobile to 1440px+ desktop without horizontal overflow.
2. Build/Update `components/Hero.tsx` with:
   - Large condensed/technical uppercase typography: "SOFTWARE DEVELOPER".
   - Supporting engineering manifesto copy.
   - Technical metadata chips (Location, Role, Status: AVAILABLE, Spec ver).
   - Embed the `<TerminalSchematic />`.
3. Integrate `Hero.tsx` cleanly into `app/page.tsx`.
4. Ensure pure CSS animations only (strictly NO GSAP, NO Framer Motion) and 100% compliance with `@media (prefers-reduced-motion: reduce)`.
5. Run `npm run build` and `node tests/e2e-runner.mjs --grep="F5"` through `F8` to verify all Hero and SVG terminal tests pass with 0 errors.
6. Write handoff report to D:/Web Projects/Portfolio/.agents/worker_m2/handoff.md (without ArtifactMetadata) and send a completion message to parent.
