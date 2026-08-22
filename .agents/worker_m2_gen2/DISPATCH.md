## 2026-08-22T13:47:50Z
You are the Milestone 2 Worker (Hero & SVG Terminal Schematic) - Generation 2 for the Abraham Grace Developer Portfolio.
Your working directory is D:/Web Projects/Portfolio/.agents/worker_m2_gen2/
You MUST read:
1. D:/Web Projects/Portfolio/.agents/ORIGINAL_REQUEST.md
2. D:/Web Projects/Portfolio/PROJECT.md
3. D:/Web Projects/Portfolio/tests/tier1_features.test.mjs

Your exclusive write ownership:
- components/Hero.tsx
- components/TerminalSchematic.tsx
- app/globals.css
- app/page.tsx
- .agents/worker_m2_gen2/

MANDATORY INTEGRITY WARNING:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

CRITICAL INSTRUCTIONS:
You MUST immediately write the actual code files to disk using `write_to_file` (omit `ArtifactMetadata`):
1. Write `D:/Web Projects/Portfolio/components/TerminalSchematic.tsx`:
   - An original, responsive technical SVG workstation schematic with measurement marks, dimension lines (`1024x640`), coordinate labels, CPU load / memory specs, structural lines (1px).
   - SVG self-drawing stroke animation via `stroke-dasharray` and `stroke-dashoffset` keyframes.
   - Sequential terminal text reveal (command -> output logs).
   - Monospace blinking cursor (`█` or `▋` with opacity oscillation).
   - Must use `viewBox="0 0 800 480"` and `w-full h-auto`.
2. Write `D:/Web Projects/Portfolio/components/Hero.tsx`:
   - Display headline `SOFTWARE DEVELOPER` in condensed uppercase sans font.
   - Supporting engineering manifesto text.
   - Technical metadata chips (Location, Role, Status: AVAILABLE).
   - Embed `<TerminalSchematic />`.
3. Update `D:/Web Projects/Portfolio/app/globals.css`:
   - Add keyframes: `drawTerminalFrame`, `drawGridLines`, `termLineFade`, `termCursorBlink`.
   - Add `@media (prefers-reduced-motion: reduce)` overrides disabling all animation durations and delays.
4. Update `D:/Web Projects/Portfolio/app/page.tsx` to import and render `<Hero />`.
5. Execute `npm run build` and `node tests/e2e-runner.mjs` using `run_command`.
6. Write handoff report to `D:/Web Projects/Portfolio/.agents/worker_m2_gen2/handoff.md` and send completion message to parent.
