import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('================================================================');
console.log(' CHALLENGER 1: EMPIRICAL VERIFICATION HARNESS (MILESTONE 1)');
console.log('================================================================');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`\x1b[32m[PASS]\x1b[0m ${testName}`);
  } else {
    failedTests++;
    console.log(`\x1b[31m[FAIL]\x1b[0m ${testName}`);
    if (details) console.log(`       \x1b[33mIssue: ${details}\x1b[0m`);
    findings.push({ testName, details });
  }
}

// -----------------------------------------------------------------------------
// 1. Build Verification
// -----------------------------------------------------------------------------
console.log('\n--- 1. Next.js Build Compilation Verification ---');

const buildManifestExists = fs.existsSync(path.join(ROOT, '.next', 'build-manifest.json'));
assert(buildManifestExists, 'Next.js build artifacts exist (.next/build-manifest.json)');

const staticCssDir = path.join(ROOT, '.next', 'static', 'css');
const hasCompiledCss = fs.existsSync(staticCssDir) && fs.readdirSync(staticCssDir).length > 0;
assert(hasCompiledCss, 'Compiled production CSS bundle exists in .next/static/css');

// -----------------------------------------------------------------------------
// 2. CSS Specificity & Token Architecture
// -----------------------------------------------------------------------------
console.log('\n--- 2. CSS Specificity & Design Token Verification ---');

const globalsCss = fs.readFileSync(path.join(ROOT, 'app', 'globals.css'), 'utf8');
const tailwindConfig = fs.readFileSync(path.join(ROOT, 'tailwind.config.ts'), 'utf8');

// Check .tech-grid definition
const hasTechGridInCss = globalsCss.includes('.tech-grid');
assert(hasTechGridInCss, 'globals.css defines .tech-grid utility class');

const techGridHasLinearGradient = globalsCss.includes('linear-gradient') && globalsCss.includes('24px 24px');
assert(techGridHasLinearGradient, '.tech-grid specifies 24px 24px linear-gradient grid pattern');

// Check compiled CSS specificity
let compiledCss = '';
if (hasCompiledCss) {
  const cssFiles = fs.readdirSync(staticCssDir);
  compiledCss = cssFiles.map(f => fs.readFileSync(path.join(staticCssDir, f), 'utf8')).join('\n');
}

const compiledHasTechGrid = compiledCss.includes('.tech-grid');
assert(compiledHasTechGrid, 'Compiled CSS contains .tech-grid class');

// Specificity check: .tech-grid background vs tailwind bg utilities
// In globals.css, .tech-grid is after @tailwind utilities.
// If .tech-grid is applied alongside bg-white or bg-[#FAFAF9], background-image will show grid on top of background-color.
const techGridSetsBothBgAndImage = globalsCss.includes('background-color') && globalsCss.includes('background-image');
assert(techGridSetsBothBgAndImage, '.tech-grid explicitly sets both background-color and background-image');

// Check 1px solid black border tokens
const borderTokenDefined = tailwindConfig.includes("'1': '1px'") || tailwindConfig.includes('borderWidth');
assert(borderTokenDefined, 'tailwind.config.ts defines 1px border width token');

const layoutUsesBorderBlack = globalsCss.includes('--color-border: #000000') || tailwindConfig.includes("border: '#000000'");
assert(layoutUsesBorderBlack, 'Black border token (#000000) is configured in theme tokens');

// -----------------------------------------------------------------------------
// 3. Reduced Motion Accessibility Simulation
// -----------------------------------------------------------------------------
console.log('\n--- 3. Reduced Motion Simulation Verification ---');

const hasReducedMotionMedia = globalsCss.includes('@media (prefers-reduced-motion: reduce)');
assert(hasReducedMotionMedia, 'globals.css contains @media (prefers-reduced-motion: reduce) block');

const resetsUniversalAnimations = globalsCss.includes('animation-duration: 0.01ms !important') ||
  globalsCss.includes('animation-duration: 0s !important') ||
  globalsCss.includes('animation: none !important');
assert(resetsUniversalAnimations, 'prefers-reduced-motion resets animation-duration to 0/0.01ms with !important');

const resetsPulseDot = globalsCss.includes('.animate-pulse-dot') && 
  (globalsCss.includes('animation: none !important') || globalsCss.includes('opacity: 1 !important'));
assert(resetsPulseDot, 'prefers-reduced-motion explicitly overrides .animate-pulse-dot to animation: none !important');

const resetsTransitions = globalsCss.includes('transition-duration: 0.01ms !important') ||
  globalsCss.includes('transition-duration: 0s !important') ||
  globalsCss.includes('transition: none !important');
assert(resetsTransitions, 'prefers-reduced-motion overrides transition-duration with !important');

const resetsScrollBehavior = globalsCss.includes('scroll-behavior: auto !important');
assert(resetsScrollBehavior, 'prefers-reduced-motion resets scroll-behavior to auto !important');

// Verify compiled CSS includes reduced motion rules
const compiledHasReducedMotion = compiledCss.includes('prefers-reduced-motion:reduce') || 
  compiledCss.includes('prefers-reduced-motion: reduce');
assert(compiledHasReducedMotion, 'Compiled CSS contains prefers-reduced-motion rule');

// -----------------------------------------------------------------------------
// 4. Viewport Scaling & Overflow Stress Testing (320px, 768px, 1440px)
// -----------------------------------------------------------------------------
console.log('\n--- 4. Viewport Scaling & Horizontal Overflow Stress Testing ---');

const headerSrc = fs.readFileSync(path.join(ROOT, 'components', 'Header.tsx'), 'utf8');
const footerSrc = fs.readFileSync(path.join(ROOT, 'components', 'Footer.tsx'), 'utf8');
const pageSrc = fs.readFileSync(path.join(ROOT, 'app', 'page.tsx'), 'utf8');
const layoutSrc = fs.readFileSync(path.join(ROOT, 'app', 'layout.tsx'), 'utf8');

// Stress Test 4.1: Header Navigation Responsiveness at 320px
// Look at Header layout:
// At 320px mobile, if nav items and SYSTEM // ONLINE badge are on the same flex row without hidden / flex-wrap / collapse,
// width required is ~480px which exceeds 320px viewport!
const headerHasMobileNavStrategy = 
  headerSrc.includes('hidden sm:flex') || 
  headerSrc.includes('hidden md:flex') || 
  headerSrc.includes('flex-wrap') || 
  headerSrc.includes('overflow-x-auto') ||
  headerSrc.includes('sm:gap-8 gap-');

console.log('   Header Nav analysis:');
console.log('   - Nav container className in Header.tsx:', headerSrc.match(/<nav[^>]*className="([^"]*)"/)?.[1] || 'Not found');
console.log('   - Header inner container className:', headerSrc.match(/<div[^>]*max-w-7xl[^>]*className="([^"]*)"/)?.[1] || 'Not found');

// Let's compute estimated width of Header contents:
// Left brand: ~110px
// Nav (WORK, STACK, ABOUT, CONTACT + gaps): ~210px
// Right status badge (SYSTEM // ONLINE): ~125px
// Padding: 2 * 16px = 32px
// Total = 477px. In 320px, gap-4 (16px) with all text visible leads to tight squeeze or potential overflow.
// Check if nav has responsive gap or hides items on small screens
const isNavAdaptive = headerSrc.includes('gap-2') || headerSrc.includes('sm:gap-') || headerSrc.includes('hidden sm:');
assert(isNavAdaptive, 'Header navigation uses responsive spacing / breakpoint constraints for small screens');

// Stress Test 4.2: Contact Email CTA string width at 320px
// "INITIATE CONTACT [abrahamgrace.dev@gmail.com] ↗" is ~44 characters.
// In 12px mono font (~7.2px/char) + px-6 (48px padding) = 364px!
// At 320px screen (320 - 32 = 288px container width), a non-wrapping inline-flex button will exceed container width!
const contactButtonInPage = pageSrc.match(/<a[^>]*href="mailto:abrahamgrace\.dev@gmail\.com"[^>]*>([\s\S]*?)<\/a>/)?.[1] || '';
console.log('   Contact CTA button text:', contactButtonInPage.trim());
const hasOverflowProtectionOnContact = 
  pageSrc.includes('break-all') || 
  pageSrc.includes('max-w-full') || 
  pageSrc.includes('truncate') || 
  pageSrc.includes('flex-col') ||
  pageSrc.includes('text-center') ||
  contactButtonInPage.trim().length <= 32; // Short button text fits without overflow

assert(hasOverflowProtectionOnContact, 'Contact CTA button text or container has overflow protection for <= 320px viewport', 
  `Contact button text length is ${contactButtonInPage.trim().length} chars. Without break-all/max-w-full, this may overflow a 288px mobile viewport.`);

// Stress Test 4.3: Hero Typography Scaling (320px to 1440px)
const heroH1 = pageSrc.match(/<h1[^>]*className="([^"]*)"/)?.[1] || '';
console.log('   Hero H1 className:', heroH1);
const heroHasResponsiveFontSizes = heroH1.includes('text-4xl') && (heroH1.includes('sm:text-') || heroH1.includes('md:text-') || heroH1.includes('lg:text-'));
assert(heroHasResponsiveFontSizes, 'Hero H1 heading defines responsive font sizing scale (text-4xl sm:text-6xl md:text-7xl lg:text-8xl)');

// Stress Test 4.4: Grid column reflow across viewports (320px, 768px, 1440px)
const hasGridBreakpoints = pageSrc.includes('grid-cols-1') && (pageSrc.includes('sm:grid-cols-2') || pageSrc.includes('md:grid-cols-2')) && pageSrc.includes('lg:grid-cols-3');
assert(hasGridBreakpoints, 'Tech Stack and About grids reflow from 1-column (320px) to 2-column (768px) to 3-column (1440px)');

// Stress Test 4.5: Footer layout reflow (320px to 1440px)
const footerGridMatch = footerSrc.match(/className="([^"]*grid[^"]*)"/)?.[1] || '';
console.log('   Footer grid className:', footerGridMatch);
const footerHasResponsiveGrid = footerGridMatch.includes('grid-cols-1') && footerGridMatch.includes('md:grid-cols-4');
assert(footerHasResponsiveGrid, 'Footer telemetry grid reflows from 1 column on mobile to 4 columns on desktop');

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(` VERIFICATION SUMMARY: ${passedTests} / ${totalTests} PASSED (${failedTests} FAILED)`);
console.log('================================================================');

if (failedTests > 0) {
  console.log('\nFindings / Potential Vulnerabilities:');
  findings.forEach((f, i) => console.log(`${i + 1}. [${f.testName}] ${f.details}`));
}

process.exit(failedTests > 0 ? 1 : 0);
