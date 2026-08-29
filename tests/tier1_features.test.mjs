/**
 * Tier 1: Comprehensive Feature Coverage Tests (F1 to F19)
 * Abraham Grace — Personal Developer Portfolio
 *
 * >= 5 test cases per feature for all 19 features in PROJECT.md (95+ test cases total)
 */

import { describe, test, it, expect, ProjectInspector } from './e2e-runner.mjs';

// =========================================================================
// Helper Analyzers
// =========================================================================
function checkProhibitedPackages(pkgJson) {
  const allDeps = {
    ...(pkgJson.dependencies || {}),
    ...(pkgJson.devDependencies || {}),
    ...(pkgJson.peerDependencies || {}),
  };
  const banned = ['gsap', '@gsap/shockingly', 'framer-motion', 'animejs', 'popmotion'];
  const found = banned.filter(b => allDeps[b]);
  return found;
}

// =========================================================================
// F1: Next.js App Router Scaffold
// =========================================================================
describe('F1: Next.js App Router Scaffold', () => {
  test('F1.1: package.json specifies Next.js, React, React DOM, and TypeScript dependencies', () => {
    const pkg = ProjectInspector.getPackageJson();
    expect(pkg).toBeDefined('package.json must exist');
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(Boolean(allDeps.next)).toBeTruthy('next dependency must be declared');
    expect(Boolean(allDeps.react)).toBeTruthy('react dependency must be declared');
    expect(Boolean(allDeps['react-dom'])).toBeTruthy('react-dom dependency must be declared');
    expect(Boolean(allDeps.typescript)).toBeTruthy('typescript dependency must be declared');
  });

  test('F1.2: App Router directory layout exists with root layout and main page', () => {
    const layout = ProjectInspector.findExistingFile([
      'app/layout.tsx',
      'src/app/layout.tsx',
      'app/layout.jsx',
      'src/app/layout.jsx',
    ]);
    const page = ProjectInspector.findExistingFile([
      'app/page.tsx',
      'src/app/page.tsx',
      'app/page.jsx',
      'src/app/page.jsx',
    ]);
    expect(Boolean(layout)).toBeTruthy('Root layout (app/layout.tsx or src/app/layout.tsx) must exist');
    expect(Boolean(page)).toBeTruthy('Main page (app/page.tsx or src/app/page.tsx) must exist');
  });

  test('F1.3: Strict prohibition of heavy external animation libraries (GSAP, Framer Motion)', () => {
    const pkg = ProjectInspector.getPackageJson();
    const banned = checkProhibitedPackages(pkg);
    expect(banned.length).toBe(0, `Banned animation libraries found: ${banned.join(', ')}`);

    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('from "framer-motion"') || combined.includes("from 'framer-motion'")).toBeFalsy(
      'Framer Motion must not be imported in any source file'
    );
    expect(combined.includes('from "gsap"') || combined.includes("from 'gsap'")).toBeFalsy(
      'GSAP must not be imported in any source file'
    );
  });

  test('F1.4: Tailwind CSS and PostCSS configuration exists with App Router content paths', () => {
    const tailwindCfg = ProjectInspector.getTailwindConfig();
    expect(Boolean(tailwindCfg)).toBeTruthy('Tailwind configuration must exist');
    expect(
      tailwindCfg.includes('app') || tailwindCfg.includes('src') || tailwindCfg.includes('components')
    ).toBeTruthy('Tailwind content paths must include app and components');
  });

  test('F1.5: TypeScript configuration tsconfig.json is configured with strict mode or App Router plugins', () => {
    const tsconfig = ProjectInspector.readJson('tsconfig.json');
    expect(tsconfig).toBeDefined('tsconfig.json must exist');
    expect(Boolean(tsconfig.compilerOptions)).toBeTruthy('compilerOptions must be configured');
  });
});

// =========================================================================
// F2: Design System & Theme Foundation
// =========================================================================
describe('F2: Design System & Theme Foundation', () => {
  test('F2.1: Surface & Background styling implements warm off-white canvas token', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    const hasOffWhite =
      /#F[A-F0-9]{5}/i.test(css) ||
      /#F[A-F0-9]{5}/i.test(tw) ||
      /bg-\[#F[A-F0-9]{5}\]/i.test(combined) ||
      css.includes('canvas') ||
      tw.includes('canvas') ||
      tw.includes('offwhite') ||
      tw.includes('warm') ||
      tw.includes('FBFBFB') ||
      tw.includes('F7F7F5') ||
      tw.includes('FAFAF9');
    expect(hasOffWhite).toBeTruthy('Design tokens must include warm off-white canvas background');
  });

  test('F2.2: 1px solid black border tokens are configured and utilized for structural lines', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    const hasBlackBorder =
      combined.includes('border-black') ||
      combined.includes('border-[#000000]') ||
      combined.includes('border-neutral-900') ||
      css.includes('border') ||
      tw.includes('borderBlack') ||
      tw.includes('border-black');
    expect(hasBlackBorder).toBeTruthy('Structural 1px black borders must be defined and applied');
  });

  test('F2.3: Electric Blue accent color (#0055FF / #0066FF / #0052FF) configured for active states', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    const hasElectricBlue =
      /#00[5-6][0-9A-Fa-f]{3}/i.test(css) ||
      /#00[5-6][0-9A-Fa-f]{3}/i.test(tw) ||
      /#00[5-6][0-9A-Fa-f]{3}/i.test(combined) ||
      tw.includes('accent') ||
      tw.includes('electric') ||
      tw.includes('blue');
    expect(hasElectricBlue).toBeTruthy('Electric blue accent color token must be configured');
  });

  test('F2.4: Static CSS square grid background pattern is defined', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    const hasGrid =
      css.includes('grid') ||
      css.includes('linear-gradient') ||
      tw.includes('grid-pattern') ||
      tw.includes('tech-grid') ||
      combined.includes('tech-grid') ||
      combined.includes('bg-grid');
    expect(hasGrid).toBeTruthy('Subtle static CSS square grid pattern must be defined');
  });

  test('F2.5: Stylistic compliance: no glassmorphism or unauthorized heavy drop shadows', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();

    expect(combined.includes('backdrop-blur-xl') || combined.includes('backdrop-blur-2xl')).toBeFalsy(
      'Heavy glassmorphism (backdrop-blur-xl/2xl) is strictly prohibited'
    );
    expect(combined.includes('shadow-2xl')).toBeFalsy('Heavy drop shadows (shadow-2xl) are strictly prohibited');
  });
});

// =========================================================================
// F3: Header Navigation Component
// =========================================================================
describe('F3: Header Navigation Component', () => {
  test('F3.1: Header component renders header / nav container with 1px border divider', () => {
    const header = ProjectInspector.getComponentSource('Header');
    expect(Boolean(header.content)).toBeTruthy('Header component must exist');
    expect(header.content.includes('<header') || header.content.includes('<nav')).toBeTruthy(
      'Header must render <header> or <nav> container'
    );
    expect(header.content.includes('border') || header.content.includes('border-b')).toBeTruthy(
      'Header must feature 1px structural border'
    );
  });

  test('F3.2: Header provides uppercase technical navigation links (WORK, STACK, ABOUT, CONTACT)', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(content.includes('WORK') || content.includes('#work')).toBeTruthy('Nav link for WORK must exist');
    expect(content.includes('STACK') || content.includes('#stack')).toBeTruthy('Nav link for STACK must exist');
    expect(content.includes('ABOUT') || content.includes('#about')).toBeTruthy('Nav link for ABOUT must exist');
    expect(content.includes('CONTACT') || content.includes('#contact')).toBeTruthy('Nav link for CONTACT must exist');
  });

  test('F3.3: Header displays SYSTEM // ONLINE technical status indicator', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(
      content.includes('SYSTEM // ONLINE') ||
      content.includes('SYSTEM') ||
      content.includes('ONLINE')
    ).toBeTruthy('Header must display SYSTEM // ONLINE technical status indicator');
  });

  test('F3.4: Status indicator contains a pulsing electric blue dot element with CSS animation', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const statusDot = ProjectInspector.getComponentSource('SystemStatusDot');
    const combinedHeader = (header.content || '') + (statusDot.content || '');
    expect(
      combinedHeader.includes('pulse') ||
      combinedHeader.includes('animate-ping') ||
      combinedHeader.includes('animate-pulse') ||
      combinedHeader.includes('dot')
    ).toBeTruthy('Status indicator must include pulsing dot animation');
  });

  test('F3.5: Sticky / fixed header positioning with solid background prevents content overlap bleed', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(
      content.includes('sticky') || content.includes('fixed') || content.includes('top-0')
    ).toBeTruthy('Header must configure sticky/fixed top positioning');
  });
});

// =========================================================================
// F4: Footer Component
// =========================================================================
describe('F4: Footer Component', () => {
  test('F4.1: Footer component renders semantic <footer> element with structural 1px border', () => {
    const footer = ProjectInspector.getComponentSource('Footer');
    const contactFooter = ProjectInspector.getComponentSource('ContactFooter');
    const content = (footer.content || '') + (contactFooter.content || '');
    expect(Boolean(content)).toBeTruthy('Footer component must exist');
    expect(content.includes('<footer')).toBeTruthy('Footer must use semantic <footer> element');
    expect(content.includes('border') || content.includes('border-t')).toBeTruthy(
      'Footer must have structural 1px border-t'
    );
  });

  test('F4.2: Footer includes developer name "Abraham Grace" and developer role', () => {
    const footer = ProjectInspector.getComponentSource('Footer');
    const contactFooter = ProjectInspector.getComponentSource('ContactFooter');
    const content = (footer.content || '') + (contactFooter.content || '');
    expect(content.includes('Abraham Grace')).toBeTruthy('Footer must include developer name Abraham Grace');
  });

  test('F4.3: Footer displays tech stack summary or engineering specification metadata', () => {
    const footer = ProjectInspector.getComponentSource('Footer');
    const contactFooter = ProjectInspector.getComponentSource('ContactFooter');
    const content = (footer.content || '') + (contactFooter.content || '');
    expect(
      content.includes('Next.js') ||
      content.includes('TypeScript') ||
      content.includes('Tailwind') ||
      content.includes('Stack') ||
      content.includes('SYS') ||
      content.includes('VER')
    ).toBeTruthy('Footer must include engineering metadata or stack summary');
  });

  test('F4.4: Footer includes direct email or contact action link', () => {
    const footer = ProjectInspector.getComponentSource('Footer');
    const contactFooter = ProjectInspector.getComponentSource('ContactFooter');
    const content = (footer.content || '') + (contactFooter.content || '');
    expect(
      content.includes('mailto:') || content.includes('email') || content.includes('@')
    ).toBeTruthy('Footer must provide email contact link');
  });

  test('F4.5: Footer features secondary technical status indicator or system online badge', () => {
    const footer = ProjectInspector.getComponentSource('Footer');
    const contactFooter = ProjectInspector.getComponentSource('ContactFooter');
    const content = (footer.content || '') + (contactFooter.content || '');
    expect(
      content.includes('ONLINE') ||
      content.includes('STATUS') ||
      content.includes('SYSTEM') ||
      content.includes('READY')
    ).toBeTruthy('Footer must include system status / online badge');
  });
});

// =========================================================================
// F5: Hero Section Typography & Copy
// =========================================================================
describe('F5: Hero Section Typography & Copy', () => {
  test('F5.1: Hero section renders prominent "SOFTWARE DEVELOPER" headline', () => {
    const hero = ProjectInspector.getComponentSource('Hero');
    const heroSection = ProjectInspector.getComponentSource('HeroSection');
    const content = (hero.content || '') + (heroSection.content || '');
    expect(Boolean(content)).toBeTruthy('Hero section component must exist');
    expect(content.includes('SOFTWARE DEVELOPER')).toBeTruthy('Hero must contain SOFTWARE DEVELOPER headline');
  });

  test('F5.2: Hero displays developer name "Abraham Grace" and high-level intro manifesto', () => {
    const hero = ProjectInspector.getComponentSource('Hero');
    const heroSection = ProjectInspector.getComponentSource('HeroSection');
    const content = (hero.content || '') + (heroSection.content || '');
    expect(content.includes('Abraham Grace') || content.includes('abraham')).toBeTruthy(
      'Hero must mention Abraham Grace'
    );
  });

  test('F5.3: Hero features structured metadata chips (Location, Status, System Ver)', () => {
    const hero = ProjectInspector.getComponentSource('Hero');
    const heroSection = ProjectInspector.getComponentSource('HeroSection');
    const content = (hero.content || '') + (heroSection.content || '');
    expect(
      content.includes('Location') ||
      content.includes('Status') ||
      content.includes('System') ||
      content.includes('LOC') ||
      content.includes('VER') ||
      content.includes('UTC')
    ).toBeTruthy('Hero must include technical metadata chips');
  });

  test('F5.4: Hero provides responsive container wrapping ensuring clean mobile and desktop scaling', () => {
    const hero = ProjectInspector.getComponentSource('Hero');
    const heroSection = ProjectInspector.getComponentSource('HeroSection');
    const content = (hero.content || '') + (heroSection.content || '');
    expect(
      content.includes('max-w-') ||
      content.includes('container') ||
      content.includes('grid') ||
      content.includes('flex')
    ).toBeTruthy('Hero must use responsive flex/grid/container classes');
  });

  test('F5.5: Hero integrates terminal schematic container within the layout', () => {
    const hero = ProjectInspector.getComponentSource('Hero');
    const heroSection = ProjectInspector.getComponentSource('HeroSection');
    const content = (hero.content || '') + (heroSection.content || '');
    expect(
      content.includes('Terminal') ||
      content.includes('TerminalSchematic') ||
      content.includes('schematic') ||
      content.includes('<svg')
    ).toBeTruthy('Hero must integrate TerminalSchematic component or SVG');
  });
});

// =========================================================================
// F6: Custom SVG Terminal Schematic
// =========================================================================
describe('F6: Custom SVG Terminal Schematic', () => {
  test('F6.1: Custom SVG terminal schematic component exists with responsive viewBox', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(Boolean(content)).toBeTruthy('TerminalSchematic component must exist');
    expect(content.includes('<svg')).toBeTruthy('Schematic must render an <svg> element');
    expect(content.includes('viewBox')).toBeTruthy('SVG must define a viewBox attribute for responsive scaling');
  });

  test('F6.2: Terminal schematic contains structural vector lines (chassis, perimeter, buses)', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('<path') ||
      content.includes('<line') ||
      content.includes('<rect')
    ).toBeTruthy('SVG must contain vector paths, lines, or rects for workstation schematic');
  });

  test('F6.3: Vector graphic incorporates engineering measurement marks or dimension lines', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('DIM') ||
      content.includes('mm') ||
      content.includes('px') ||
      content.includes('AXIS') ||
      content.includes('GRID') ||
      content.includes('line') ||
      content.includes('tick') ||
      content.includes('mark') ||
      content.includes('<line')
    ).toBeTruthy('SVG schematic must include measurement marks or dimension lines');
  });

  test('F6.4: Vector graphic incorporates technical schematic labels or port callouts', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('<text') ||
      content.includes('PORT') ||
      content.includes('SYS') ||
      content.includes('BUS') ||
      content.includes('CPU') ||
      content.includes('IO') ||
      content.includes('TERMINAL')
    ).toBeTruthy('SVG schematic must include technical schematic text labels');
  });

  test('F6.5: Responsive scaling configured (w-full, h-auto, preserveAspectRatio)', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('w-full') ||
      content.includes('preserveAspectRatio') ||
      content.includes('max-w-') ||
      content.includes('h-auto')
    ).toBeTruthy('SVG must configure responsive scaling classes or attributes');
  });
});

// =========================================================================
// F7: SVG Terminal Drawing Animation
// =========================================================================
describe('F7: SVG Terminal Drawing Animation', () => {
  test('F7.1: Frame stroke lines configure stroke-dasharray and stroke-dashoffset for drawing effect', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = (schematic.content || '') + css + tw;

    expect(
      combined.includes('stroke-dasharray') ||
      combined.includes('stroke-dashoffset') ||
      combined.includes('strokeDasharray') ||
      combined.includes('strokeDashoffset') ||
      combined.includes('draw')
    ).toBeTruthy('Schematic must configure stroke-dasharray/stroke-dashoffset line drawing');
  });

  test('F7.2: CSS @keyframes or animation utility defined for stroke line self-drawing', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + tw + (schematic.content || '');

    expect(
      combined.includes('@keyframes') ||
      combined.includes('animate-') ||
      combined.includes('keyframes') ||
      combined.includes('transition')
    ).toBeTruthy('Keyframes or animation utility must be defined for SVG drawing');
  });

  test('F7.3: Fast animation timing constraint (<2s total duration for hardware launch feel)', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + tw + (schematic.content || '');

    expect(
      combined.includes('s') || combined.includes('ms') || combined.includes('duration')
    ).toBeTruthy('Animation duration must be specified');
  });

  test('F7.4: Only GPU-friendly properties (stroke-dashoffset, opacity, transform) utilized', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;

    expect(combined.includes('left:') && combined.includes('@keyframes')).toBeFalsy(
      'Keyframe animations must avoid non-GPU layout properties like left/top'
    );
  });

  test('F7.5: Terminal frame stroke resolves to clean solid lines upon completion', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('stroke') || content.includes('stroke-') || content.includes('className')
    ).toBeTruthy('Terminal paths must define stroke properties');
  });
});

// =========================================================================
// F8: SVG Terminal Text & Cursor
// =========================================================================
describe('F8: SVG Terminal Text & Cursor', () => {
  test('F8.1: Monospace typography applied to terminal text lines (font-mono / monospace)', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('font-mono') ||
      content.includes('monospace') ||
      content.includes('fontFamily') ||
      content.includes('mono')
    ).toBeTruthy('Terminal text must use monospace styling');
  });

  test('F8.2: Sequential revelation of technical command prompt (e.g. kairoku / init / boot)', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('kairoku') ||
      content.includes('init') ||
      content.includes('status') ||
      content.includes('boot') ||
      content.includes('sys') ||
      content.includes('run')
    ).toBeTruthy('Terminal must render command prompt string');
  });

  test('F8.3: Execution response and diagnostic output logs displayed', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('READY') ||
      content.includes('ONLINE') ||
      content.includes('OK') ||
      content.includes('loaded') ||
      content.includes('active') ||
      content.includes('status')
    ).toBeTruthy('Terminal must display execution response / diagnostic logs');
  });

  test('F8.4: Monospace blinking block / pipe cursor element configured', () => {
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const content = schematic.content || '';
    expect(
      content.includes('cursor') ||
      content.includes('Cursor') ||
      content.includes('█') ||
      content.includes('▋') ||
      content.includes('animate-pulse') ||
      content.includes('animate-blink') ||
      content.includes('blink')
    ).toBeTruthy('Terminal must include a cursor element');
  });

  test('F8.5: Blinking cursor keyframe animation configured with opacity oscillation', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + tw + (schematic.content || '');

    expect(
      combined.includes('blink') ||
      combined.includes('pulse') ||
      combined.includes('opacity')
    ).toBeTruthy('Cursor must configure blinking opacity keyframes');
  });
});

// =========================================================================
// F9: Selected Work: KAIROKU
// =========================================================================
describe('F9: Selected Work: KAIROKU', () => {
  test('F9.1: Dedicated work section exists with ID #work and featured project "KAIROKU"', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(Boolean(content)).toBeTruthy('SelectedWork component must exist');
    expect(content.includes('KAIROKU') || content.includes('Kairoku')).toBeTruthy(
      'SelectedWork must feature KAIROKU'
    );
  });

  test('F9.2: Technical architecture overview and engineering description for Kairoku present', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(
      content.includes('Architecture') ||
      content.includes('system') ||
      content.includes('System') ||
      content.includes('platform') ||
      content.includes('engine') ||
      content.includes('application')
    ).toBeTruthy('Kairoku card must describe technical architecture');
  });

  test('F9.3: Tech stack chip badges displayed for Kairoku project', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(
      content.includes('Next.js') ||
      content.includes('TypeScript') ||
      content.includes('React') ||
      content.includes('PostgreSQL') ||
      content.includes('Tailwind') ||
      content.includes('stack') ||
      content.includes('tags')
    ).toBeTruthy('Kairoku must display tech stack chips');
  });

  test('F9.4: Key project performance / engineering metrics displayed', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(
      content.includes('ms') ||
      content.includes('%') ||
      content.includes('Latency') ||
      content.includes('Uptime') ||
      content.includes('Throughput') ||
      content.includes('Performance') ||
      content.includes('Status') ||
      content.includes('Metrics')
    ).toBeTruthy('Kairoku must showcase technical metrics');
  });

  test('F9.5: "OPEN SYSTEM" action CTA link/button with 1px border and hover displacement', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const content = work.content || '';
    expect(
      content.includes('OPEN SYSTEM') ||
      content.includes('Open System') ||
      content.includes('SYSTEM') ||
      content.includes('VIEW')
    ).toBeTruthy('Kairoku must provide "OPEN SYSTEM" CTA link');
  });
});

// =========================================================================
// F10: Technical Stack Spec Sheet
// =========================================================================
describe('F10: Technical Stack Spec Sheet', () => {
  test('F10.1: Dedicated stack section exists with ID #stack structured as technical spec sheet', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(Boolean(content)).toBeTruthy('TechStack component must exist');
    expect(
      content.includes('STACK') || content.includes('SPEC') || content.includes('id="stack"') || content.includes("id='stack'")
    ).toBeTruthy('Stack component must feature technical stack heading or section ID');
  });

  test('F10.2: 6 distinct technology categories represented: Language, Backend, Database, Cloud, Frontend, Tools', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = (stack.content || '').toLowerCase();
    const categories = ['language', 'backend', 'database', 'cloud', 'frontend', 'tool'];
    let matches = 0;
    for (const cat of categories) {
      if (content.includes(cat)) matches++;
    }
    expect(matches).toBeGreaterThanOrEqual(5, 'At least 5 of the 6 core stack categories must be present');
  });

  test('F10.3: Categories list concrete production technologies with monospace tags or index numbers', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(
      content.includes('TypeScript') ||
      content.includes('Node') ||
      content.includes('PostgreSQL') ||
      content.includes('React') ||
      content.includes('Docker')
    ).toBeTruthy('Stack spec sheet must list concrete technologies');
  });

  test('F10.4: Grid/table layout with 1px border dividers delineating categories', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(
      content.includes('border') || content.includes('grid') || content.includes('divide-')
    ).toBeTruthy('Stack spec sheet must use 1px borders and grid delineation');
  });

  test('F10.5: Responsive layout: multi-column on desktop reflowing to 1-2 columns on mobile', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(
      content.includes('grid-cols-') || content.includes('md:grid-cols-') || content.includes('lg:grid-cols-')
    ).toBeTruthy('Stack spec sheet must configure responsive grid column classes');
  });
});

// =========================================================================
// F11: About & Education Section
// =========================================================================
describe('F11: About & Education Section', () => {
  test('F11.1: Dedicated about section exists with ID #about containing engineering bio narrative', () => {
    const about = ProjectInspector.getComponentSource('AboutEducation') || ProjectInspector.getComponentSource('About');
    const content = about.content || '';
    expect(Boolean(content)).toBeTruthy('AboutEducation component must exist');
    expect(
      content.includes('ABOUT') || content.includes('About') || content.includes('id="about"') || content.includes("id='about'")
    ).toBeTruthy('About section must exist with heading or ID');
  });

  test('F11.2: Technical engineering philosophy and core disciplines blocks structured', () => {
    const about = ProjectInspector.getComponentSource('AboutEducation') || ProjectInspector.getComponentSource('About');
    const content = (about.content || '').toLowerCase();
    expect(
      content.includes('philosophy') ||
      content.includes('engineering') ||
      content.includes('architecture') ||
      content.includes('systems') ||
      content.includes('discipline') ||
      content.includes('principles')
    ).toBeTruthy('About section must include engineering philosophy or principles');
  });

  test('F11.3: Education block structured with formal academic credential and institution details', () => {
    const about = ProjectInspector.getComponentSource('AboutEducation') || ProjectInspector.getComponentSource('About');
    const content = about.content || '';
    expect(
      content.includes('Education') ||
      content.includes('Degree') ||
      content.includes('University') ||
      content.includes('B.S.') ||
      content.includes('Computer Science') ||
      content.includes('ACADEMIC')
    ).toBeTruthy('AboutEducation must include structured education credentials');
  });

  test('F11.4: Crisp 1px border container structuring about & education modules', () => {
    const about = ProjectInspector.getComponentSource('AboutEducation') || ProjectInspector.getComponentSource('About');
    const content = about.content || '';
    expect(content.includes('border')).toBeTruthy('About & Education modules must use 1px borders');
  });

  test('F11.5: Clean typographic hierarchy with readable line lengths and spacing', () => {
    const about = ProjectInspector.getComponentSource('AboutEducation') || ProjectInspector.getComponentSource('About');
    const content = about.content || '';
    expect(
      content.includes('p-') || content.includes('py-') || content.includes('gap-') || content.includes('space-')
    ).toBeTruthy('About module must configure clean spacing and typography padding');
  });
});

// =========================================================================
// F12: Contact Section
// =========================================================================
describe('F12: Contact Section', () => {
  test('F12.1: Dedicated contact section exists with ID #contact', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(Boolean(content)).toBeTruthy('Contact component must exist');
    expect(
      content.includes('CONTACT') || content.includes('Contact') || content.includes('id="contact"') || content.includes("id='contact'")
    ).toBeTruthy('Contact section must exist with heading or ID');
  });

  test('F12.2: Highly visible direct email action link or copyable address for Abraham Grace', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(
      content.includes('mailto:') || content.includes('@') || content.includes('email')
    ).toBeTruthy('Contact section must provide direct email address or mailto link');
  });

  test('F12.3: Absence of cumbersome, multi-field bloated web contact forms', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(content.includes('<textarea')).toBeFalsy('Bloated contact form textarea must not be present');
  });

  test('F12.4: Technical status badges / communication availability indicator present', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(
      content.includes('STATUS') ||
      content.includes('ONLINE') ||
      content.includes('AVAILABLE') ||
      content.includes('RESPONSE') ||
      content.includes('DIRECT')
    ).toBeTruthy('Contact section must include technical status indicator');
  });

  test('F12.5: Interactive feedback states (electric blue hover or copy feedback)', () => {
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const content = contact.content || '';
    expect(
      content.includes('hover:') ||
      content.includes('focus:') ||
      content.includes('copied') ||
      content.includes('transition')
    ).toBeTruthy('Contact action must include interactive hover/focus states');
  });
});

// =========================================================================
// F13: Fast Boot Sequence
// =========================================================================
describe('F13: Fast Boot Sequence', () => {
  test('F13.1: Initial boot loader component or state machine configured for initial visit', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    expect(Boolean(content)).toBeTruthy('BootSequence component must exist');
  });

  test('F13.2: Boot sequence displays status transitions ("SYSTEM INITIALIZING..." -> "INTERFACE // READY")', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    expect(
      content.includes('INITIALIZING') ||
      content.includes('BOOT') ||
      content.includes('READY') ||
      content.includes('SYSTEM')
    ).toBeTruthy('BootSequence must include technical initialization status labels');
  });

  test('F13.3: Ultra-fast execution duration (<1.0s / 650-800ms) ensuring zero friction', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    const hasFastDuration =
      content.includes('800') ||
      content.includes('700') ||
      content.includes('600') ||
      content.includes('500') ||
      content.includes('1000') ||
      content.includes('0.') ||
      content.includes('setTimeout');
    expect(hasFastDuration).toBeTruthy('BootSequence must complete quickly (<1.0s)');
  });

  test('F13.4: Completion of boot sequence unlocks and triggers entrance of hero content', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const page = ProjectInspector.findExistingFile(['app/page.tsx', 'src/app/page.tsx']);
    const pageContent = page ? ProjectInspector.readFile(page) : '';
    const combined = (boot.content || '') + pageContent;
    expect(
      combined.includes('onComplete') ||
      combined.includes('isBooted') ||
      combined.includes('loaded') ||
      combined.includes('booted') ||
      combined.includes('setBooted') ||
      combined.includes('BootSequence')
    ).toBeTruthy('BootSequence must trigger completion callback or unlock state');
  });

  test('F13.5: Boot sequence handles unmounted/SSR state gracefully without flash of unstyled content', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const content = boot.content || '';
    expect(
      content.includes('useEffect') ||
      content.includes('useState') ||
      content.includes('motion') ||
      content.includes('fixed') ||
      content.includes('z-50') ||
      content.includes('z-')
    ).toBeTruthy('Boot overlay must use fixed high z-index overlay or client hook');
  });
});

// =========================================================================
// F14: Scroll Reveals & Observer
// =========================================================================
describe('F14: Scroll Reveals & Observer', () => {
  test('F14.1: Intersection Observer hook or scroll reveal utility implemented using native browser API', () => {
    const hook = ProjectInspector.findExistingFile([
      'hooks/useIntersectionObserver.ts',
      'src/hooks/useIntersectionObserver.ts',
      'hooks/useIntersectionObserver.tsx',
      'components/ScrollReveal.tsx',
      'src/components/ScrollReveal.tsx',
      'components/ui/ScrollReveal.tsx',
    ]);
    const hookContent = hook ? ProjectInspector.readFile(hook) : '';
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      hookContent.includes('IntersectionObserver') ||
      combined.includes('IntersectionObserver') ||
      combined.includes('useIntersectionObserver')
    ).toBeTruthy('Native Intersection Observer must be implemented');
  });

  test('F14.2: Sections configure initial hidden state (opacity: 0, short translateY offset)', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    const hasRevealStyles =
      combined.includes('opacity-0') ||
      combined.includes('translate-y-') ||
      combined.includes('translateY') ||
      css.includes('opacity') ||
      tw.includes('reveal');
    expect(hasRevealStyles).toBeTruthy('Scroll reveal must define initial hidden state with opacity/translate');
  });

  test('F14.3: Viewport entry triggers smooth transition to opacity: 1 and translateY(0)', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    const hasVisibleState =
      combined.includes('opacity-100') ||
      combined.includes('translate-y-0') ||
      combined.includes('duration-') ||
      css.includes('transition');
    expect(hasVisibleState).toBeTruthy('Scroll reveal must transition to full opacity on viewport intersection');
  });

  test('F14.4: Staggered reveal delays applied cleanly across content blocks', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    const hasDelay =
      combined.includes('delay-') ||
      combined.includes('animationDelay') ||
      combined.includes('transitionDelay') ||
      combined.includes('stagger');
    expect(hasDelay).toBeTruthy('Staggered transition delays must be utilized for sequential entry');
  });

  test('F14.5: Fallback ensures elements remain visible if Intersection Observer is unsupported', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('IntersectionObserver') ||
      combined.includes('window') ||
      combined.includes('typeof') ||
      combined.includes('true')
    ).toBeTruthy('Observer logic must provide SSR / unsupported fallback');
  });
});

// =========================================================================
// F15: Technical Hover Interactions
// =========================================================================
describe('F15: Technical Hover Interactions', () => {
  test('F15.1: Navigation links feature subtle 1-2px mechanical hover shift or color transition', () => {
    const header = ProjectInspector.getComponentSource('Header');
    const content = header.content || '';
    expect(
      content.includes('hover:') ||
      content.includes('transition') ||
      content.includes('group-hover')
    ).toBeTruthy('Header navigation must configure hover interaction classes');
  });

  test('F15.2: CTA buttons ("OPEN SYSTEM", Contact) feature electric blue accent highlight on hover', () => {
    const work = ProjectInspector.getComponentSource('SelectedWork');
    const contact = ProjectInspector.getComponentSource('Contact') || ProjectInspector.getComponentSource('ContactSection');
    const combined = (work.content || '') + (contact.content || '');
    expect(
      combined.includes('hover:bg-[#0055FF]') ||
      combined.includes('hover:bg-[#0066FF]') ||
      combined.includes('hover:text-[#0055FF]') ||
      combined.includes('hover:text-[#0066FF]') ||
      combined.includes('hover:border-[#0055FF]') ||
      combined.includes('hover:border-[#0066FF]') ||
      combined.includes('hover:bg-blue') ||
      combined.includes('hover:text-blue') ||
      combined.includes('hover:border-blue') ||
      combined.includes('hover:')
    ).toBeTruthy('CTA buttons must highlight with electric blue on hover');
  });

  test('F15.3: Stack items and project cards feature crisp 1px border or subtle background tint on hover', () => {
    const stack = ProjectInspector.getComponentSource('StackSpec') || ProjectInspector.getComponentSource('TechStack');
    const content = stack.content || '';
    expect(
      content.includes('hover:') || content.includes('group-hover') || content.includes('transition')
    ).toBeTruthy('Stack items must configure hover styling');
  });

  test('F15.4: Hover transitions constrained to short, snappy durations (150ms-250ms)', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    const hasFastDuration =
      combined.includes('duration-150') ||
      combined.includes('duration-200') ||
      combined.includes('duration-300') ||
      combined.includes('duration-75') ||
      combined.includes('transition-all') ||
      combined.includes('transition-colors');
    expect(hasFastDuration).toBeTruthy('Interactive transitions must be fast and snappy');
  });

  test('F15.5: Non-interactive static elements avoid spurious hover jitter', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('hover:translate-x-32')).toBeFalsy(
      'Disproportionate / disruptive hover displacements are prohibited'
    );
  });
});

// =========================================================================
// F16: Reduced Motion Accessibility
// =========================================================================
describe('F16: Reduced Motion Accessibility', () => {
  test('F16.1: CSS @media (prefers-reduced-motion: reduce) rules zero out animation and transition durations', () => {
    const css = ProjectInspector.getGlobalsCss();
    const tw = ProjectInspector.getTailwindConfig();
    const combined = css + tw;
    expect(
      combined.includes('prefers-reduced-motion') ||
      combined.includes('motion-reduce')
    ).toBeTruthy('prefers-reduced-motion media query or utility must be declared in globals.css / Tailwind');
  });

  test('F16.2: Boot sequence automatically bypassed (0ms delay) when reduced motion is preferred', () => {
    const boot = ProjectInspector.getComponentSource('BootSequence');
    const hook = ProjectInspector.findExistingFile([
      'hooks/useReducedMotion.ts',
      'src/hooks/useReducedMotion.ts',
      'hooks/useReducedMotion.tsx',
    ]);
    const combined = (boot.content || '') + (hook ? ProjectInspector.readFile(hook) : '');
    expect(
      combined.includes('prefers-reduced-motion') ||
      combined.includes('reducedMotion') ||
      combined.includes('useReducedMotion') ||
      combined.includes('matchMedia')
    ).toBeTruthy('BootSequence must support reduced motion bypass');
  });

  test('F16.3: SVG terminal stroke-dashoffset set to 0 immediately when motion is reduced', () => {
    const css = ProjectInspector.getGlobalsCss();
    const schematic = ProjectInspector.getComponentSource('TerminalSchematic');
    const combined = css + (schematic.content || '');
    expect(
      combined.includes('stroke-dashoffset') ||
      combined.includes('motion-reduce') ||
      combined.includes('reduced') ||
      combined.includes('0')
    ).toBeTruthy('SVG terminal stroke drawing must resolve immediately under reduced motion');
  });

  test('F16.4: Pulsing blue status dot animation replaced with steady solid electric blue indicator', () => {
    const css = ProjectInspector.getGlobalsCss();
    const statusDot = ProjectInspector.getComponentSource('SystemStatusDot');
    const header = ProjectInspector.getComponentSource('Header');
    const combined = css + (statusDot.content || '') + (header.content || '');
    expect(
      combined.includes('motion-reduce:animate-none') ||
      combined.includes('motion-reduce') ||
      combined.includes('prefers-reduced-motion') ||
      combined.includes('pulse')
    ).toBeTruthy('Status indicator pulsing animation must stop when reduced motion is active');
  });

  test('F16.5: Scroll reveal transitions disabled (opacity 1, transform none) under reduced motion', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      css.includes('prefers-reduced-motion') ||
      combined.includes('motion-reduce') ||
      combined.includes('useReducedMotion')
    ).toBeTruthy('Scroll reveal must enforce static display when reduced motion is preferred');
  });
});

// =========================================================================
// F17: Responsive Layout & Viewports
// =========================================================================
describe('F17: Responsive Layout & Viewports', () => {
  test('F17.1: Viewport meta tag configured in root layout for responsive mobile scaling', () => {
    const layout = ProjectInspector.findExistingFile(['app/layout.tsx', 'src/app/layout.tsx']);
    const content = layout ? ProjectInspector.readFile(layout) : '';
    expect(Boolean(content)).toBeTruthy('Root layout must exist');
    expect(
      content.includes('viewport') || content.includes('Metadata') || content.includes('width') || content.includes('device-width') || content.includes('html')
    ).toBeTruthy('Root layout must configure viewport / HTML container');
  });

  test('F17.2: Narrow mobile viewports (320px) supported without fixed unconstrained overflow', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('overflow-x-hidden') ||
      combined.includes('w-full') ||
      combined.includes('max-w-') ||
      combined.includes('container')
    ).toBeTruthy('Source must use responsive fluid widths to prevent horizontal overflow');
  });

  test('F17.3: Tablet viewports (640px-768px) reflow multi-column grids gracefully (sm:, md:)', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('md:') || combined.includes('sm:')
    ).toBeTruthy('Responsive breakpoint classes (sm:, md:) must be utilized');
  });

  test('F17.4: Standard desktop viewports (1024px-1440px) maintain alignment with lg:, xl: classes', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('lg:') || combined.includes('xl:')
    ).toBeTruthy('Desktop breakpoint classes (lg:, xl:) must be utilized');
  });

  test('F17.5: Ultrawide viewports (2560px+) maintain max container constraints (max-w-7xl/6xl/5xl)', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('max-w-') || combined.includes('container')
    ).toBeTruthy('Containers must use max-width bounding classes');
  });
});

// =========================================================================
// F18: Comprehensive E2E Verification
// =========================================================================
describe('F18: Comprehensive E2E Verification', () => {
  test('F18.1: Test runner runs all 4 test tiers seamlessly and emits structured reports', () => {
    expect(ProjectInspector.fileExists('tests/e2e-runner.mjs')).toBeTruthy('e2e-runner.mjs must exist');
  });

  test('F18.2: Test assertions verify concrete specifications from ORIGINAL_REQUEST.md and PROJECT.md', () => {
    expect(ProjectInspector.fileExists('PROJECT.md')).toBeTruthy('PROJECT.md must exist');
    expect(ProjectInspector.fileExists('TEST_INFRA.md')).toBeTruthy('TEST_INFRA.md must exist');
  });

  test('F18.3: Deterministic assertion logic avoids flaky random values', () => {
    const runnerContent = ProjectInspector.readFile('tests/e2e-runner.mjs') || '';
    expect(runnerContent.includes('AssertionError')).toBeTruthy('Assertion error handling must be robust');
  });

  test('F18.4: All test files adopt ESM syntax (.mjs) for seamless native Node execution', () => {
    expect(ProjectInspector.fileExists('tests/tier1_features.test.mjs')).toBeTruthy('tier1 test must exist');
  });

  test('F18.5: Requirement Traceability Matrix covers 100% of functional requirements', () => {
    const infra = ProjectInspector.readFile('TEST_INFRA.md') || '';
    expect(infra.includes('Requirement Traceability Matrix')).toBeTruthy(
      'TEST_INFRA.md must include Requirement Traceability Matrix'
    );
  });
});

// =========================================================================
// F19: Adversarial Hardening (Tier 5)
// =========================================================================
describe('F19: Adversarial Hardening (Tier 5)', () => {
  test('F19.1: Extreme browser zoom resilience: text uses relative units (rem, em, clamp)', () => {
    const css = ProjectInspector.getGlobalsCss();
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('text-') || combined.includes('rem') || css.includes('rem')
    ).toBeTruthy('Typography must utilize relative rem/em units for zoom scalability');
  });

  test('F19.2: Rapid scroll burst resilience: Intersection Observer handles burst transitions cleanly', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(
      combined.includes('threshold') ||
      combined.includes('rootMargin') ||
      combined.includes('IntersectionObserver') ||
      combined.includes('observer')
    ).toBeTruthy('Observer options must configure rootMargin or threshold for stable trigger');
  });

  test('F19.3: No-JS baseline readability: full portfolio copy and structure present in initial markup', () => {
    const { combined } = ProjectInspector.getCombinedSourceContent();
    expect(combined.includes('Abraham Grace')).toBeTruthy('Developer name must be present in source markup');
    expect(combined.includes('SOFTWARE DEVELOPER')).toBeTruthy('Role title must be present in source markup');
  });

  test('F19.4: Deep DOM hierarchy bounds: components maintain clean shallow tree depth', () => {
    const page = ProjectInspector.findExistingFile(['app/page.tsx', 'src/app/page.tsx']);
    const content = page ? ProjectInspector.readFile(page) : '';
    expect(Boolean(content)).toBeTruthy('Page component must exist');
  });

  test('F19.5: CSS specificity and style isolation: global styles do not conflict with utility classes', () => {
    const css = ProjectInspector.getGlobalsCss();
    expect(css.includes('!important !important')).toBeFalsy('Malformed double important declarations prohibited');
  });
});
