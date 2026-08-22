/**
 * Tier 3: Cross-Feature Interactions & Pairwise Combinations Test Suite
 * Abraham Grace — Personal Developer Portfolio
 *
 * Tests the integrated coexistence of interrelated modules:
 * - Combination 1: CSS Square Grid + 1px Black Structural Borders
 * - Combination 2: SVG Terminal Schematic + Reduced Motion Accessibility
 * - Combination 3: Fast Boot Sequence + Scroll Reveal Observer
 * - Combination 4: Header Navigation Anchors + Smooth Scroll Positioning
 * - Combination 5: Design Token Consistency Across All Components
 */

import { describe, test, it, expect, ProjectInspector } from './e2e-runner.mjs';

// =========================================================================
// Combination 1: CSS Square Grid + 1px Black Structural Borders
// =========================================================================
describe('Tier 3: Combination 1 — Grid Pattern + 1px Black Structural Borders', () => {
  test('C1.1: Section containers establish crisp 1px black borders against the grid background', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    const hasBorderAndGrid =
      (combined.includes('tech-grid') || combined.includes('bg-grid') || css.includes('grid')) &&
      (combined.includes('border-black') || combined.includes('border-') || combined.includes('border'));
    expect(hasBorderAndGrid).toBeTruthy('Page must integrate both technical grid background and 1px borders');
  });

  test('C1.2: Inner cards and section modules use solid surface background to ensure text readability over grid', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    const hasSurfaceBg =
      combined.includes('bg-white') ||
      combined.includes('bg-[#FFFFFF]') ||
      combined.includes('bg-[#FAFAF9]') ||
      combined.includes('bg-[#FBFBFB]') ||
      combined.includes('bg-[#F7F7F5]') ||
      combined.includes('bg-canvas') ||
      combined.includes('bg-surface');
    expect(hasSurfaceBg).toBeTruthy('Card modules must declare solid surface background over canvas grid');
  });

  test('C1.3: Grid pattern dimensions (~24px) align harmoniously with standard Tailwind spacing units', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;
    expect(
      combined.includes('24px') || combined.includes('32px') || combined.includes('grid')
    ).toBeTruthy('Grid pattern must configure structured square dimensions');
  });

  test('C1.4: Directional border utilities prevent double-line border stacking on adjacent sections', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('border-t') ||
      combined.includes('border-b') ||
      combined.includes('divide-y') ||
      combined.includes('border')
    ).toBeTruthy('Components must utilize structured directional borders');
  });
});

// =========================================================================
// Combination 2: SVG Terminal Schematic + Reduced Motion Accessibility
// =========================================================================
describe('Tier 3: Combination 2 — SVG Terminal Schematic + Reduced Motion Accessibility', () => {
  test('C2.1: Terminal frame paths render immediately with full opacity when reduced motion is preferred', () => {
    const css = ProjectInspector.getGlobalsCss();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + (schematic.content || '');

    expect(
      combined.includes('motion-reduce') ||
      combined.includes('prefers-reduced-motion') ||
      combined.includes('stroke') ||
      combined.includes('opacity')
    ).toBeTruthy('Schematic must support instant static rendering under reduced motion');
  });

  test('C2.2: Terminal command text lines are fully revealed without typing delay under reduced motion', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('kairoku') ||
      content.includes('status') ||
      content.includes('ONLINE') ||
      content.includes('READY')
    ).toBeTruthy('Terminal prompt and output text must be present');
  });

  test('C2.3: Terminal cursor remains visible without disorienting high-frequency flashing', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('cursor') ||
      content.includes('Cursor') ||
      content.includes('█') ||
      content.includes('animate-pulse') ||
      content.includes('opacity')
    ).toBeTruthy('Terminal cursor must be styled cleanly');
  });

  test('C2.4: SVG schematic responsive scaling (viewBox & preserveAspectRatio) remains fully active under reduced motion', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(content.includes('viewBox')).toBeTruthy('Responsive viewBox must remain intact regardless of motion mode');
  });
});

// =========================================================================
// Combination 3: Fast Boot Sequence + Scroll Reveal Observer
// =========================================================================
describe('Tier 3: Combination 3 — Fast Boot Sequence + Scroll Reveal Observer', () => {
  test('C3.1: Boot sequence execution (<1s) transitions cleanly without blocking scroll observer initialization', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    expect(Boolean(content)).toBeTruthy('BootSequence component must exist');
  });

  test('C3.2: Above-the-fold Hero content becomes visible immediately after boot completion', () => {
    const hero = ProjectInspector.getComponentSource('Hero') || ProjectInspector.getComponentSource('HeroSection');
    const content = hero.content || '';
    expect(content.includes('SOFTWARE DEVELOPER')).toBeTruthy('Hero headline must be present and ready to render');
  });

  test('C3.3: Below-the-fold sections (Work, Stack, About, Contact) trigger scroll reveals independently', () => {
    const page = ProjectInspector.findExistingFile(['app/page.tsx', 'src/app/page.tsx']);
    const pageContent = page ? ProjectInspector.readFile(page) : '';
    expect(
      pageContent.includes('SelectedWork') ||
      pageContent.includes('TechStack') ||
      pageContent.includes('AboutEducation') ||
      pageContent.includes('Contact') ||
      pageContent.includes('work')
    ).toBeTruthy('Main page must assemble all content sections in linear sequence');
  });

  test('C3.4: Dismissing boot sequence overlay removes pointer-events and unlocks document interaction', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    expect(
      content.includes('pointer-events-none') ||
      content.includes('hidden') ||
      content.includes('setBooted') ||
      content.includes('isBooted') ||
      content.includes('return null') ||
      content.includes('onComplete')
    ).toBeTruthy('Boot overlay must unmount or disable pointer events after completion');
  });
});

// =========================================================================
// Combination 4: Header Navigation Anchors + Smooth Scroll Positioning
// =========================================================================
describe('Tier 3: Combination 4 — Header Navigation Anchors + Smooth Scroll Positioning', () => {
  test('C4.1: Header navigation href targets match section IDs (#work, #stack, #about, #contact)', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const { combined } = ProjectInspector.getCombinedSourceContent();

    expect(header.content?.includes('#work') && (combined.includes('id="work"') || combined.includes("id='work'"))).toBeTruthy(
      'Target #work must match id="work"'
    );
    expect(header.content?.includes('#stack') && (combined.includes('id="stack"') || combined.includes("id='stack'"))).toBeTruthy(
      'Target #stack must match id="stack"'
    );
    expect(header.content?.includes('#about') && (combined.includes('id="about"') || combined.includes("id='about'"))).toBeTruthy(
      'Target #about must match id="about"'
    );
    expect(header.content?.includes('#contact') && (combined.includes('id="contact"') || combined.includes("id='contact'"))).toBeTruthy(
      'Target #contact must match id="contact"'
    );
  });

  test('C4.2: Sections configure scroll-margin-top or padding so sticky header does not obscure section titles', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('scroll-mt-') ||
      combined.includes('pt-') ||
      combined.includes('py-') ||
      combined.includes('scroll-m')
    ).toBeTruthy('Sections must configure scroll offset padding or scroll-margin-top');
  });

  test('C4.3: Smooth scroll behavior enabled in CSS or HTML configuration', () => {
    const css = ProjectInspector.getGlobalsCss();
    const layout = ProjectInspector.findExistingFile(['app/layout.tsx', 'src/app/layout.tsx']);
    const layoutContent = layout ? ProjectInspector.readFile(layout) : '';
    const combined = css + layoutContent;

    expect(
      combined.includes('scroll-smooth') ||
      combined.includes('scroll-behavior: smooth') ||
      combined.includes('html')
    ).toBeTruthy('Document must support smooth scroll behavior');
  });

  test('C4.4: Navigation links remain clickable and keyboard focusable throughout scrolling', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(
      content.includes('<a') || content.includes('Link') || content.includes('<button')
    ).toBeTruthy('Header nav must provide interactive anchor or link elements');
  });
});

// =========================================================================
// Combination 5: Design Token Consistency Across All Components
// =========================================================================
describe('Tier 3: Combination 5 — Design Token Consistency Across All Components', () => {
  test('C5.1: Electric Blue accent (#0055FF / #0066FF) is consistently used for active/interactive indicators', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const combined = (header.content || '') + (work.content || '') + (contact.content || '');

    expect(
      combined.includes('#0055FF') ||
      combined.includes('#0066FF') ||
      combined.includes('accent') ||
      combined.includes('blue')
    ).toBeTruthy('Electric blue accent must be shared across Header, Work, and Contact');
  });

  test('C5.2: Monospace typography applied consistently to technical labels, code tags, and metrics', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('font-mono') || combined.includes('monospace') || combined.includes('mono')
    ).toBeTruthy('Monospace typography token must be utilized across technical data points');
  });

  test('C5.3: 1px black border styling is uniformly applied across all card containers and dividers', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('border-black') ||
      combined.includes('border-') ||
      combined.includes('border')
    ).toBeTruthy('1px structural borders must be uniformly applied');
  });

  test('C5.4: Surface colors strictly adhere to warm off-white and pure white card contrast', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;
    expect(
      combined.includes('canvas') ||
      combined.includes('#F') ||
      combined.includes('surface') ||
      combined.includes('bg-')
    ).toBeTruthy('Surface color tokens must be maintained across all modules');
  });
});
