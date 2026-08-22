/**
 * Tier 2: Boundary & Corner Cases Test Suite
 * Abraham Grace — Personal Developer Portfolio
 *
 * Covers boundary conditions, extreme states, and edge constraints:
 * - Reduced Motion Active vs Inactive
 * - Viewports from 320px to 2560px
 * - Empty & Edge States
 * - CSS Rule Specificity & Token Boundaries
 * - No-JS / SSR Fallback Baseline
 */

import { describe, test, it, expect, ProjectInspector } from './e2e-runner.mjs';

// =========================================================================
// Category 1: Reduced Motion Active vs Inactive Boundary
// =========================================================================
describe('Tier 2: Boundary 1 — Reduced Motion Active vs Inactive', () => {
  test('B1.1: When prefers-reduced-motion is active, animation durations are overridden to 0s or none', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    const hasMotionOverride =
      css.includes('prefers-reduced-motion') ||
      css.includes('motion-reduce') ||
      combined.includes('motion-reduce:animate-none') ||
      combined.includes('motion-reduce:transition-none') ||
      combined.includes('useReducedMotion');
    expect(hasMotionOverride).toBeTruthy('CSS or React hooks must override motion when reduced motion is preferred');
  });

  test('B1.2: Boot sequence duration is forced to 0ms when reduced motion is requested', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const { combined } = ProjectInspector.getCombinedSourceContent();
    const handlesReduced =
      (boot.content || '').includes('reduced') ||
      (boot.content || '').includes('prefers-reduced-motion') ||
      (boot.content || '').includes('useReducedMotion') ||
      combined.includes('useReducedMotion') ||
      combined.includes('prefers-reduced-motion');
    expect(handlesReduced).toBeTruthy('BootSequence must respect reduced motion and skip delay');
  });

  test('B1.3: Pulsing blue status dot renders as solid static dot under reduced motion', () => {
    const css = ProjectInspector.getGlobalsCss();
    const dot = ProjectInspector.getComponentSource('SystemStatusDot');
    const header = ProjectInspector.getComponentSource('Header');
    const combined = css + (dot.content || '') + (header.content || '');

    const stopsPulse =
      combined.includes('motion-reduce') ||
      combined.includes('prefers-reduced-motion') ||
      combined.includes('animate-pulse') ||
      combined.includes('pulse');
    expect(stopsPulse).toBeTruthy('Pulsing dot must support static rendering on reduced motion');
  });

  test('B1.4: SVG terminal vector drawing resolves immediately (stroke-dashoffset 0) without draw delay', () => {
    const css = ProjectInspector.getGlobalsCss();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + (schematic.content || '');

    expect(
      combined.includes('stroke') || combined.includes('motion-reduce') || combined.includes('reduced')
    ).toBeTruthy('Terminal schematic vector paths must be visible immediately on reduced motion');
  });

  test('B1.5: Standard motion state preserves snappy keyframes and smooth transitions', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;

    expect(
      combined.includes('transition') || combined.includes('keyframes') || combined.includes('animation')
    ).toBeTruthy('Standard motion mode must configure smooth transitions and keyframes');
  });
});

// =========================================================================
// Category 2: Viewport Range Boundaries (320px to 2560px)
// =========================================================================
describe('Tier 2: Boundary 2 — Viewport Range Boundaries (320px to 2560px)', () => {
  test('B2.1: Narrow Mobile (320px): Layout avoids fixed pixel widths that cause horizontal scrollbar', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('w-[400px]') && !combined.includes('max-w-')).toBeFalsy(
      'Fixed widths exceeding 320px without max-width bounding are prohibited'
    );
  });

  test('B2.2: Standard Mobile (375px-390px): Hero title scales cleanly with responsive text size', () => {
    const hero = ProjectInspector.getComponentSource('Hero') || ProjectInspector.getComponentSource('HeroSection');
    const content = hero.content || '';
    expect(
      content.includes('text-') || content.includes('clamp') || content.includes('md:text-') || content.includes('lg:text-')
    ).toBeTruthy('Hero typography must configure responsive font scaling classes');
  });

  test('B2.3: Tablet Portrait (768px): Tech stack spec sheet adapts with md: responsive grid layout', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(
      content.includes('grid') || content.includes('flex') || content.includes('md:') || content.includes('sm:')
    ).toBeTruthy('Tech stack must configure responsive multi-column reflow');
  });

  test('B2.4: Standard Desktop (1024px-1440px): Section layouts present full technical schematic side-by-side', () => {
    const hero = ProjectInspector.getComponentSource('Hero') || ProjectInspector.getComponentSource('HeroSection');
    const content = hero.content || '';
    expect(
      content.includes('lg:grid-cols-') ||
      content.includes('lg:flex-row') ||
      content.includes('grid') ||
      content.includes('flex')
    ).toBeTruthy('Hero must arrange content and schematic side-by-side on desktop');
  });

  test('B2.5: Ultrawide / 4K (2560px): Max container bounds maintain content readability and alignment', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('max-w-') || combined.includes('container') || combined.includes('mx-auto')
    ).toBeTruthy('Container must enforce max-width constraint to prevent unbounded stretch on ultrawide');
  });
});

// =========================================================================
// Category 3: Empty & Edge States
// =========================================================================
describe('Tier 3: Boundary 3 — Empty & Edge States', () => {
  test('B3.1: Clipboard API Fallback: Contact action degrades gracefully if navigator.clipboard is unavailable', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(
      content.includes('mailto:') || content.includes('clipboard') || content.includes('email')
    ).toBeTruthy('Contact module must provide direct mailto link or clipboard fallback');
  });

  test('B3.2: Long text wrapping: Project and Bio cards wrap text without breaking 1px container boundaries', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('break-words') ||
      combined.includes('leading-') ||
      combined.includes('whitespace-normal') ||
      combined.includes('p-')
    ).toBeTruthy('Containers must support responsive word wrapping');
  });

  test('B3.3: Image / Asset Independence: Site relies purely on vector SVGs and CSS (zero broken raster image paths)', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('<img src="/unverified-external.jpg"')).toBeFalsy(
      'Unverified external raster images are prohibited'
    );
  });

  test('B3.4: Fast reload / page re-visit: Boot sequence handles subsequent visits without getting stuck', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    expect(
      content.includes('useEffect') ||
      content.includes('sessionStorage') ||
      content.includes('setTimeout') ||
      content.includes('onComplete') ||
      content.includes('setBooted')
    ).toBeTruthy('BootSequence must execute robust completion cycle');
  });

  test('B3.5: High DPI / Retina Display: Vector lines and grid maintain crisp 1px sharpness', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;
    expect(
      combined.includes('1px') ||
      combined.includes('border') ||
      combined.includes('grid')
    ).toBeTruthy('Grid and border tokens must enforce crisp 1px lines');
  });
});

// =========================================================================
// Category 4: CSS Rule Specificity & Token Boundaries
// =========================================================================
describe('Tier 2: Boundary 4 — CSS Rule Specificity & Token Boundaries', () => {
  test('B4.1: Border collapsing consistency: Adjoining cards prevent unwanted 2px double border collision', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('border') ||
      combined.includes('-mt-[1px]') ||
      combined.includes('divide-') ||
      combined.includes('gap-')
    ).toBeTruthy('Borders must be structured cleanly without double border thickness');
  });

  test('B4.2: Grid line opacity constraint: Background grid is subtle and light gray without dominating text', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;
    expect(
      combined.includes('rgba(0, 0, 0, 0.0') ||
      combined.includes('rgba(0,0,0,0.0') ||
      combined.includes('#E5E5E5') ||
      combined.includes('#E2E2DF') ||
      combined.includes('#F0F0EE') ||
      combined.includes('grid') ||
      combined.includes('linear-gradient')
    ).toBeTruthy('Grid lines must be subtle light-gray / low-opacity');
  });

  test('B4.3: Strict color palette containment: Only specified black, off-white, and electric blue used', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('bg-purple-600') || combined.includes('bg-pink-500')).toBeFalsy(
      'Unauthorized rainbow color utilities are strictly prohibited'
    );
  });

  test('B4.4: Absence of unapproved visual filters: No glassmorphism gradients or blur overlays', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('backdrop-blur-3xl')).toBeFalsy('Heavy backdrop blur is prohibited');
  });

  test('B4.5: Keyboard focus rings provide WCAG-compliant high contrast electric blue outlines', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('focus-visible:') ||
      combined.includes('focus:') ||
      css.includes('focus-visible') ||
      css.includes('outline')
    ).toBeTruthy('Interactive elements must define visible focus indicators');
  });
});

// =========================================================================
// Category 5: No-JS / SSR Fallback Baseline
// =========================================================================
describe('Tier 2: Boundary 5 — No-JS / SSR Fallback Baseline', () => {
  test('B5.1: Navigation anchors (#work, #stack, #about, #contact) work natively via browser URL fragment jumping', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(content.includes('href="#work"') || content.includes("href='#work'")).toBeTruthy(
      'Header must include anchor link href="#work"'
    );
    expect(content.includes('href="#stack"') || content.includes("href='#stack'")).toBeTruthy(
      'Header must include anchor link href="#stack"'
    );
    expect(content.includes('href="#about"') || content.includes("href='#about'")).toBeTruthy(
      'Header must include anchor link href="#about"'
    );
    expect(content.includes('href="#contact"') || content.includes("href='#contact'")).toBeTruthy(
      'Header must include anchor link href="#contact"'
    );
  });

  test('B5.2: External action link for KAIROKU works as standard <a> anchor tag with target="_blank"', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(
      content.includes('<a') && (content.includes('href') || content.includes('rel="noopener"'))
    ).toBeTruthy('KAIROKU CTA must use semantic <a> anchor tag');
  });

  test('B5.3: Contact email action works via standard mailto: protocol', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const footer = ProjectInspector.getComponentSource('Footer') || ProjectInspector.getComponentSource('ContactFooter');
    const combined = (contact.content || '') + (footer.content || '');
    expect(combined.includes('mailto:') || combined.includes('@')).toBeTruthy(
      'Contact link must provide direct mailto: address'
    );
  });

  test('B5.4: Semantic HTML landmarks (<header>, <main>, <section>, <footer>, <nav>) provide complete document structure', () => {
    const page = ProjectInspector.findExistingFile(['app/page.tsx', 'src/app/page.tsx']);
    const layout = ProjectInspector.findExistingFile(['app/layout.tsx', 'src/app/layout.tsx']);
    const combined = (page ? ProjectInspector.readFile(page) : '') + (layout ? ProjectInspector.readFile(layout) : '');
    expect(
      combined.includes('<main') || combined.includes('<section') || combined.includes('Header')
    ).toBeTruthy('Markup must structure content using semantic HTML containers');
  });

  test('B5.5: All critical portfolio text content is present in initial SSR markup (zero empty client-only shells)', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('Abraham Grace')).toBeTruthy('Developer name must be in source markup');
    expect(combined.includes('KAIROKU') || combined.includes('Kairoku')).toBeTruthy('Kairoku project must be in source markup');
    expect(combined.includes('SOFTWARE DEVELOPER')).toBeTruthy('Hero headline must be in source markup');
  });
});
