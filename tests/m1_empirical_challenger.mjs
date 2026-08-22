/**
 * Empirical Challenger Verification Suite for Milestone 1
 * (Foundation & Design System)
 *
 * Tests:
 * 1. Build & Compilation Verification
 * 2. Dependency & Animation Library Audit (Zero-JS-Anim)
 * 3. Design System Tokens & Global CSS Grid / A11y
 * 4. Header Navigation Anchor Integrity & Targets
 * 5. Footer Email Link, Copyability & Telemetry
 * 6. GPU Performance Audit for Pulse-Dot Animation
 * 7. Bundle Footprint & Layout Integrity
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = path.resolve('.');

let passed = 0;
let failed = 0;
const results = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passed++;
    results.push({ name: testName, status: 'PASS', details });
    console.log(`  [PASS] ${testName}`);
  } else {
    failed++;
    results.push({ name: testName, status: 'FAIL', details });
    console.error(`  [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

console.log('=== Starting Empirical Challenger Suite for Milestone 1 ===\n');

// -------------------------------------------------------------
// 1. Dependency & Animation Library Audit
// -------------------------------------------------------------
console.log('--- 1. Dependency & Bundle Audit ---');
const pkgPath = path.join(ROOT_DIR, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const allDeps = {
  ...(pkg.dependencies || {}),
  ...(pkg.devDependencies || {}),
  ...(pkg.peerDependencies || {}),
};

const prohibitedLibs = [
  'gsap',
  '@gsap/shockingly',
  'framer-motion',
  'motion',
  'animejs',
  'popmotion',
  '@react-spring/web',
  'react-spring',
  'lottie-web',
  'lottie-react',
  'three',
  '@react-three/fiber',
  'locomotive-scroll',
];

const foundProhibited = prohibitedLibs.filter(lib => allDeps[lib]);
assert(
  foundProhibited.length === 0,
  'package.json contains ZERO external JS animation / heavy 3D libraries',
  foundProhibited.join(', ')
);

assert(
  Boolean(allDeps['next'] && allDeps['react'] && allDeps['react-dom'] && allDeps['tailwindcss']),
  'package.json contains required core framework dependencies (next, react, react-dom, tailwindcss)'
);

// Scan source files for forbidden imports
const sourceDirs = ['app', 'components'];
let sourceCode = '';
function scanDir(dir) {
  const fullPath = path.join(ROOT_DIR, dir);
  if (!fs.existsSync(fullPath)) return;
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(fullPath, entry.name);
    if (entry.isDirectory()) {
      scanDir(path.join(dir, entry.name));
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      sourceCode += `\n// FILE: ${entryPath}\n` + fs.readFileSync(entryPath, 'utf-8');
    }
  }
}
for (const dir of sourceDirs) {
  scanDir(dir);
}

const hasFramerImport = /from\s+['"]framer-motion['"]|import\(['"]framer-motion['"]\)/.test(sourceCode);
const hasGsapImport = /from\s+['"]gsap['"]|import\(['"]gsap['"]\)/.test(sourceCode);
const hasAnimeImport = /from\s+['"]animejs['"]|import\(['"]animejs['"]\)/.test(sourceCode);

assert(!hasFramerImport, 'Zero Framer Motion imports in app/ and components/');
assert(!hasGsapImport, 'Zero GSAP imports in app/ and components/');
assert(!hasAnimeImport, 'Zero Anime.js imports in app/ and components/');

// -------------------------------------------------------------
// 2. Design System Tokens & Global CSS Grid / A11y
// -------------------------------------------------------------
console.log('\n--- 2. Design System Tokens & CSS Architecture ---');
const globalsCss = fs.readFileSync(path.join(ROOT_DIR, 'app/globals.css'), 'utf-8');
const tailwindConfig = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf-8');

assert(
  globalsCss.includes('.tech-grid') &&
  globalsCss.includes('linear-gradient') &&
  globalsCss.includes('24px 24px'),
  'app/globals.css defines .tech-grid with 24px 24px static square grid'
);

assert(
  tailwindConfig.includes('#FAFAF9') || tailwindConfig.includes('#FBFBFB') || tailwindConfig.includes('#F7F7F5'),
  'tailwind.config.ts configures off-white canvas color token (#FAFAF9 / #FBFBFB / #F7F7F5)'
);

assert(
  tailwindConfig.includes('#0055FF') || globalsCss.includes('#0055FF'),
  'Electric Blue accent token #0055FF is defined in tailwind config or globals.css'
);

assert(
  globalsCss.includes('@media (prefers-reduced-motion: reduce)'),
  'globals.css includes @media (prefers-reduced-motion: reduce) block'
);

assert(
  globalsCss.includes('animation: none !important;') || globalsCss.includes('animation-duration: 0.01ms !important'),
  'prefers-reduced-motion block disables or zeros all animations'
);

// -------------------------------------------------------------
// 3. Header Navigation Anchor Integrity & Targets
// -------------------------------------------------------------
console.log('\n--- 3. Header Navigation Anchor Integrity ---');
const headerSrc = fs.readFileSync(path.join(ROOT_DIR, 'components/Header.tsx'), 'utf-8');
const pageSrc = fs.readFileSync(path.join(ROOT_DIR, 'app/page.tsx'), 'utf-8');

const requiredAnchors = ['#work', '#stack', '#about', '#contact'];
for (const anchor of requiredAnchors) {
  const anchorRegex = new RegExp(`href=["']${anchor}["']`);
  assert(
    anchorRegex.test(headerSrc),
    `Header contains navigation anchor link href="${anchor}"`
  );
}

// Check that target IDs exist in page.tsx
const requiredIds = ['work', 'stack', 'about', 'contact'];
for (const id of requiredIds) {
  const idRegex = new RegExp(`id=["']${id}["']`);
  assert(
    idRegex.test(pageSrc),
    `app/page.tsx contains matching target element with id="${id}"`
  );
}

// Check for duplicate IDs in page.tsx
for (const id of requiredIds) {
  const idMatches = pageSrc.match(new RegExp(`id=["']${id}["']`, 'g')) || [];
  assert(
    idMatches.length === 1,
    `Element id="${id}" is strictly unique in page.tsx (found ${idMatches.length} occurrences)`
  );
}

// Header layout & status indicator checks
assert(
  headerSrc.includes('sticky') && headerSrc.includes('top-0'),
  'Header has sticky top-0 positioning for persistent navigation'
);
assert(
  headerSrc.includes('SYSTEM // ONLINE'),
  'Header contains "SYSTEM // ONLINE" status indicator text'
);
assert(
  headerSrc.includes('animate-pulse-dot'),
  'Header status indicator uses animate-pulse-dot class'
);

// -------------------------------------------------------------
// 4. Footer Email Link, Copyability & Telemetry
// -------------------------------------------------------------
console.log('\n--- 4. Footer Component Verification ---');
const footerSrc = fs.readFileSync(path.join(ROOT_DIR, 'components/Footer.tsx'), 'utf-8');

assert(
  footerSrc.includes('<footer') && footerSrc.includes('border-t'),
  'Footer renders semantic <footer> with top border (border-t)'
);
assert(
  footerSrc.includes('ABRAHAM GRACE'),
  'Footer displays developer name "ABRAHAM GRACE"'
);
assert(
  footerSrc.includes('mailto:abrahamgrace.dev@gmail.com'),
  'Footer contains mailto:abrahamgrace.dev@gmail.com link'
);

// Check email regex validity
const emailMatch = footerSrc.match(/href=["']mailto:([^"']+)["']/);
const email = emailMatch ? emailMatch[1] : '';
const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
assert(emailValid, `Footer email address "${email}" is valid RFC format`);

// Check email copyability: ensure user-select is NOT disabled on the email link
assert(
  !footerSrc.includes('select-none') || !footerSrc.match(/<a[^>]*mailto[^>]*select-none/),
  'Footer email link does NOT have select-none (fully copyable)'
);

// Check email responsive overflow class
assert(
  footerSrc.includes('break-all') || footerSrc.includes('break-words') || footerSrc.includes('truncate'),
  'Footer email link has text wrapping protection (break-all / break-words) for mobile'
);

assert(
  footerSrc.includes('SYSTEM // ONLINE'),
  'Footer displays secondary "SYSTEM // ONLINE" telemetry badge'
);
assert(
  footerSrc.includes('animate-pulse-dot'),
  'Footer telemetry indicator uses animate-pulse-dot class'
);

// -------------------------------------------------------------
// 5. GPU Performance Audit for Pulse-Dot Animation
// -------------------------------------------------------------
console.log('\n--- 5. GPU Performance Audit (pulse-dot) ---');

// Extract @keyframes from globals.css
const keyframesMatch = globalsCss.match(/@keyframes\s+statusPulse\s*\{([^}]+)\}/s);
assert(Boolean(keyframesMatch), '@keyframes statusPulse is defined in globals.css');

if (keyframesMatch) {
  const keyframeBody = keyframesMatch[1];
  
  // Extract all property names in keyframes
  const propertyMatches = Array.from(keyframeBody.matchAll(/([a-zA-Z-]+)\s*:/g)).map(m => m[1].toLowerCase());
  const uniqueProps = [...new Set(propertyMatches)];
  
  const gpuAllowedProps = ['opacity', 'transform', 'transform-origin', 'filter', 'will-change'];
  const nonGpuProps = uniqueProps.filter(prop => !gpuAllowedProps.includes(prop));
  
  assert(
    nonGpuProps.length === 0,
    'statusPulse keyframe animates ONLY GPU-accelerated composited properties (opacity, transform)',
    `Animated properties: ${uniqueProps.join(', ')}; Non-GPU: ${nonGpuProps.join(', ')}`
  );
  
  const hasOpacity = uniqueProps.includes('opacity');
  const hasTransform = uniqueProps.includes('transform');
  assert(hasOpacity && hasTransform, 'statusPulse animates both opacity and transform (scale)');
}

// Extract tailwind.config.ts keyframes for pulse-dot
const twKeyframesMatch = tailwindConfig.match(/['"]pulse-dot['"]\s*:\s*\{([^}]+)\}/s);
if (twKeyframesMatch) {
  const twBody = twKeyframesMatch[1];
  const twProps = Array.from(twBody.matchAll(/([a-zA-Z-]+)\s*:/g)).map(m => m[1].toLowerCase());
  const uniqueTwProps = [...new Set(twProps)];
  const nonGpuTwProps = uniqueTwProps.filter(prop => !['opacity', 'transform'].includes(prop));
  assert(
    nonGpuTwProps.length === 0,
    'tailwind.config.ts pulse-dot keyframes animate ONLY opacity and transform',
    `Animated properties: ${uniqueTwProps.join(', ')}`
  );
}

// -------------------------------------------------------------
// 6. Next.js App Layout & Font Verification
// -------------------------------------------------------------
console.log('\n--- 6. App Layout & Typography Verification ---');
const layoutSrc = fs.readFileSync(path.join(ROOT_DIR, 'app/layout.tsx'), 'utf-8');

assert(
  layoutSrc.includes('next/font/google') &&
  layoutSrc.includes('Inter') &&
  layoutSrc.includes('Space_Grotesk') &&
  layoutSrc.includes('JetBrains_Mono'),
  'app/layout.tsx configures Google Fonts (Inter, Space Grotesk, JetBrains Mono) with css variables'
);

assert(
  layoutSrc.includes('<Header') && layoutSrc.includes('<Footer'),
  'app/layout.tsx integrates <Header /> and <Footer /> globally'
);

assert(
  layoutSrc.includes('tech-grid'),
  'app/layout.tsx applies .tech-grid background class to body'
);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n=============================================================');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('=============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
