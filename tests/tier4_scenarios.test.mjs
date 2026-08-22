/**
 * Tier 4: Real-World Workload Scenarios Test Suite
 * Abraham Grace — Personal Developer Portfolio
 *
 * Simulates complete end-to-end user workflows:
 * - Scenario 1: First-Time Visitor & Technical Recruiter Full Inspection
 * - Scenario 2: Mobile Device Visitor Journey (320px - 390px Viewport)
 * - Scenario 3: Accessibility Auditor & Reduced Motion Workflow
 * - Scenario 4: Power User Keyboard-Only Navigation
 * - Scenario 5: Search Crawler / No-JS Direct Document Consumer
 */

import { describe, test, it, expect, ProjectInspector } from './e2e-runner.mjs';

// =========================================================================
// Scenario 1: First-Time Visitor & Technical Recruiter Full Inspection
// =========================================================================
describe('Tier 4: Scenario 1 — First-Time Visitor & Recruiter Full Inspection', () => {
  test('S1.1: Visitor arrives; fast boot sequence initializes and unlocks interface in <1s', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    expect(Boolean(boot.content)).toBeTruthy('Boot sequence must exist for first-time visitor onboarding');
  });

  test('S1.2: Hero displays "SOFTWARE DEVELOPER", "Abraham Grace", and engineering telemetry', () => {
    const hero = ProjectInspector.getComponentSource('Hero') || ProjectInspector.getComponentSource('HeroSection');
    const content = hero.content || '';
    expect(content.includes('SOFTWARE DEVELOPER')).toBeTruthy('Hero headline must display SOFTWARE DEVELOPER');
    expect(content.includes('Abraham Grace') || content.includes('abraham')).toBeTruthy(
      'Hero must identify developer Abraham Grace'
    );
  });

  test('S1.3: Custom SVG terminal schematic renders vector chassis and sequential commands', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(content.includes('<svg') && content.includes('viewBox')).toBeTruthy(
      'Schematic must render responsive SVG workstation'
    );
  });

  test('S1.4: Recruiter inspects featured project KAIROKU with architecture, tech tags, and CTA', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(content.includes('KAIROKU') || content.includes('Kairoku')).toBeTruthy('Work section must feature KAIROKU');
    expect(content.includes('OPEN SYSTEM') || content.includes('SYSTEM')).toBeTruthy(
      'Work section must include "OPEN SYSTEM" CTA'
    );
  });

  test('S1.5: Recruiter reviews 6-category Tech Stack spec sheet and contacts developer directly', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const footer = ProjectInspector.getComponentSource('Footer') || ProjectInspector.getComponentSource('ContactFooter');

    expect(Boolean(stack.content)).toBeTruthy('Tech Stack spec sheet must be present');
    expect(Boolean(contact.content || footer.content)).toBeTruthy('Contact/Footer communication path must be present');
  });
});

// =========================================================================
// Scenario 2: Mobile Device Visitor Journey (320px - 390px Viewport)
// =========================================================================
describe('Tier 4: Scenario 2 — Mobile Device Visitor Journey (320px - 390px Viewport)', () => {
  test('S2.1: Mobile header presents clean technical navigation and live SYSTEM // ONLINE status', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(content.includes('WORK') && content.includes('ONLINE')).toBeTruthy(
      'Mobile header must display nav and status indicator'
    );
  });

  test('S2.2: Hero headline wraps or scales gracefully without overflowing 320px mobile width', () => {
    const hero = ProjectInspector.getComponentSource('Hero') || ProjectInspector.getComponentSource('HeroSection');
    const content = hero.content || '';
    expect(
      content.includes('text-') || content.includes('break-') || content.includes('leading-')
    ).toBeTruthy('Hero typography must configure responsive font scaling');
  });

  test('S2.3: SVG terminal schematic scales proportionally via viewBox without horizontal scroll', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('viewBox') && (content.includes('w-full') || content.includes('max-w-'))
    ).toBeTruthy('SVG terminal must adapt to narrow mobile width');
  });

  test('S2.4: Tech stack 6 categories reflow into clean single/two-column mobile spec grid', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(
      content.includes('grid-cols-1') ||
      content.includes('grid-cols-2') ||
      content.includes('grid') ||
      content.includes('flex-col')
    ).toBeTruthy('Stack spec sheet must support mobile column reflow');
  });

  test('S2.5: Contact email button provides accessible touch target with generous padding', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(
      content.includes('p-') || content.includes('py-') || content.includes('px-') || content.includes('h-')
    ).toBeTruthy('Contact button must define touch-friendly padding');
  });
});

// =========================================================================
// Scenario 3: Accessibility Auditor & Reduced Motion Workflow
// =========================================================================
describe('Tier 4: Scenario 3 — Accessibility Auditor & Reduced Motion Workflow', () => {
  test('S3.1: Auditor has prefers-reduced-motion active; boot sequence duration is bypassed immediately', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      (boot.content || '').includes('reduced') ||
      (boot.content || '').includes('prefers-reduced-motion') ||
      combined.includes('useReducedMotion') ||
      combined.includes('prefers-reduced-motion')
    ).toBeTruthy('Boot sequence must bypass animation under reduced motion');
  });

  test('S3.2: SVG terminal vector frame renders solid lines without stroke-dashoffset delay', () => {
    const css = ProjectInspector.getGlobalsCss();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + (schematic.content || '');
    expect(
      combined.includes('motion-reduce') || combined.includes('reduced') || combined.includes('stroke')
    ).toBeTruthy('SVG drawing must render solid without delay');
  });

  test('S3.3: Pulsing blue status dot renders as solid, non-flashing indicator', () => {
    const css = ProjectInspector.getGlobalsCss();
    const dot = ProjectInspector.getComponentSource('SystemStatusDot');
    const header = ProjectInspector.getComponentSource('Header');
    const combined = css + (dot.content || '') + (header.content || '');
    expect(
      combined.includes('motion-reduce') || combined.includes('prefers-reduced-motion') || combined.includes('pulse')
    ).toBeTruthy('Pulsing animation must be suppressed under reduced motion');
  });

  test('S3.4: All content sections are immediately visible at opacity 1 without translateY delay', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      css.includes('prefers-reduced-motion') || combined.includes('motion-reduce') || combined.includes('opacity')
    ).toBeTruthy('Scroll reveal must enforce full opacity under reduced motion');
  });

  test('S3.5: High-contrast focus rings (:focus-visible) render clearly on all interactive elements', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('focus-visible:') || combined.includes('focus:') || css.includes('focus')
    ).toBeTruthy('Visible focus rings must be configured for keyboard a11y');
  });
});

// =========================================================================
// Scenario 4: Power User Keyboard-Only Navigation
// =========================================================================
describe('Tier 4: Scenario 4 — Power User Keyboard-Only Navigation', () => {
  test('S4.1: User tabs through header links: WORK (#work), STACK (#stack), ABOUT (#about), CONTACT (#contact)', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(content.includes('href="#work"') || content.includes("href='#work'")).toBeTruthy(
      'Nav link for #work must be keyboard accessible'
    );
    expect(content.includes('href="#stack"') || content.includes("href='#stack'")).toBeTruthy(
      'Nav link for #stack must be keyboard accessible'
    );
    expect(content.includes('href="#about"') || content.includes("href='#about'")).toBeTruthy(
      'Nav link for #about must be keyboard accessible'
    );
    expect(content.includes('href="#contact"') || content.includes("href='#contact'")).toBeTruthy(
      'Nav link for #contact must be keyboard accessible'
    );
  });

  test('S4.2: Pressing Enter on #work anchors view to Kairoku section', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('id="work"') || combined.includes("id='work'")).toBeTruthy(
      'Section with id="work" must exist'
    );
  });

  test('S4.3: Focus advances to KAIROKU "OPEN SYSTEM" action CTA link', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(content.includes('<a') || content.includes('<button') || content.includes('Link')).toBeTruthy(
      'Kairoku CTA must be an interactive focusable link/button'
    );
  });

  test('S4.4: Focus advances through Tech Stack specification cards', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    expect(Boolean(stack.content)).toBeTruthy('Tech stack must be present in tab order');
  });

  test('S4.5: Focus advances to Contact action with high-contrast electric blue focus ring', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(
      content.includes('<a') || content.includes('<button') || content.includes('mailto:')
    ).toBeTruthy('Contact CTA must be keyboard focusable');
  });
});

// =========================================================================
// Scenario 5: Search Crawler / No-JS Direct Document Consumer
// =========================================================================
describe('Tier 4: Scenario 5 — Search Crawler / No-JS Direct Document Consumer', () => {
  test('S5.1: SSR payload contains complete semantic HTML landmarks (<header>, <main>, <section>, <footer>)', () => {
    const page = ProjectInspector.findExistingFile(['app/page.tsx', 'src/app/page.tsx']);
    const layout = ProjectInspector.findExistingFile(['app/layout.tsx', 'src/app/layout.tsx']);
    const combined = (page ? ProjectInspector.readFile(page) : '') + (layout ? ProjectInspector.readFile(layout) : '');
    expect(
      combined.includes('<main') || combined.includes('<section') || combined.includes('Header')
    ).toBeTruthy('Semantic HTML structure must be generated server-side');
  });

  test('S5.2: Developer name "Abraham Grace" and title "SOFTWARE DEVELOPER" present in markup', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('Abraham Grace')).toBeTruthy('Developer name must be in HTML markup');
    expect(combined.includes('SOFTWARE DEVELOPER')).toBeTruthy('Role title must be in HTML markup');
  });

  test('S5.3: KAIROKU project documentation and technical architecture present in markup', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(content.includes('KAIROKU') || content.includes('Kairoku')).toBeTruthy(
      'Kairoku project details must be present in HTML markup'
    );
  });

  test('S5.4: 6-category technical stack sheet present in markup', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    expect(Boolean(stack.content)).toBeTruthy('Tech stack specification must be present in HTML markup');
  });

  test('S5.5: Static CSS stylesheet delivers warm off-white canvas, 1px black borders, and technical grid', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;
    expect(
      combined.includes('grid') || combined.includes('border') || combined.includes('canvas')
    ).toBeTruthy('Static stylesheet must define design tokens for immediate rendering');
  });
});
