#!/usr/bin/env node
/**
 * Standalone E2E Test Runner & Assertion Engine
 * Abraham Grace — Personal Developer Portfolio
 *
 * Usage:
 *   node tests/e2e-runner.mjs
 *   node tests/e2e-runner.mjs --tier=1
 *   node tests/e2e-runner.mjs --grep="F6"
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ==========================================
// Test Registry & State
// ==========================================
class TestSuiteRegistry {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
    this.stats = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      durationMs: 0,
    };
    this.failures = [];
  }

  describe(name, fn) {
    const parentSuite = this.currentSuite;
    const suite = {
      name,
      parent: parentSuite,
      tests: [],
      beforeAllFns: [],
      afterAllFns: [],
      beforeEachFns: [],
      afterEachFns: [],
    };

    if (parentSuite) {
      parentSuite.suites = parentSuite.suites || [];
      parentSuite.suites.push(suite);
    } else {
      this.suites.push(suite);
    }

    this.currentSuite = suite;
    try {
      fn();
    } finally {
      this.currentSuite = parentSuite;
    }
  }

  test(name, fn, options = {}) {
    if (!this.currentSuite) {
      this.describe('Default Suite', () => {
        this.currentSuite.tests.push({ name, fn, options });
      });
    } else {
      this.currentSuite.tests.push({ name, fn, options });
    }
  }

  beforeAll(fn) {
    if (this.currentSuite) this.currentSuite.beforeAllFns.push(fn);
  }

  afterAll(fn) {
    if (this.currentSuite) this.currentSuite.afterAllFns.push(fn);
  }

  beforeEach(fn) {
    if (this.currentSuite) this.currentSuite.beforeEachFns.push(fn);
  }

  afterEach(fn) {
    if (this.currentSuite) this.currentSuite.afterEachFns.push(fn);
  }
}

export const registry = new TestSuiteRegistry();
export const describe = (name, fn) => registry.describe(name, fn);
export const test = (name, fn, options) => registry.test(name, fn, options);
export const it = test;
export const beforeAll = (fn) => registry.beforeAll(fn);
export const afterAll = (fn) => registry.afterAll(fn);
export const beforeEach = (fn) => registry.beforeEach(fn);
export const afterEach = (fn) => registry.afterEach(fn);

// ==========================================
// Expectation & Assertion Library
// ==========================================
class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function expect(actual) {
  return {
    toBe(expected, msg = '') {
      if (actual !== expected) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`,
          actual,
          expected
        );
      }
    },
    toEqual(expected, msg = '') {
      const actualStr = JSON.stringify(actual);
      const expectedStr = JSON.stringify(expected);
      if (actualStr !== expectedStr) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected deep equality:\nActual: ${actualStr}\nExpected: ${expectedStr}`,
          actual,
          expected
        );
      }
    },
    toBeTruthy(msg = '') {
      if (!actual) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${JSON.stringify(actual)} to be truthy`,
          actual,
          true
        );
      }
    },
    toBeFalsy(msg = '') {
      if (actual) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${JSON.stringify(actual)} to be falsy`,
          actual,
          false
        );
      }
    },
    toBeDefined(msg = '') {
      if (actual === undefined) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected value to be defined, received undefined`,
          actual,
          'defined'
        );
      }
    },
    toBeNull(msg = '') {
      if (actual !== null) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected null, received ${JSON.stringify(actual)}`,
          actual,
          null
        );
      }
    },
    toContain(expected, msg = '') {
      if (typeof actual === 'string') {
        if (!actual.includes(expected)) {
          const preview = actual.length > 200 ? actual.slice(0, 200) + '...' : actual;
          throw new AssertionError(
            `${msg ? msg + ': ' : ''}Expected string to contain ${JSON.stringify(expected)}.\nContent preview:\n${preview}`,
            actual,
            expected
          );
        }
      } else if (Array.isArray(actual)) {
        if (!actual.includes(expected) && !actual.some(item => JSON.stringify(item) === JSON.stringify(expected))) {
          throw new AssertionError(
            `${msg ? msg + ': ' : ''}Expected array to contain item ${JSON.stringify(expected)}`,
            actual,
            expected
          );
        }
      } else {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}toContain target must be string or array, got ${typeof actual}`,
          actual,
          expected
        );
      }
    },
    toNotContain(expected, msg = '') {
      if (typeof actual === 'string' && actual.includes(expected)) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected string NOT to contain ${JSON.stringify(expected)}`,
          actual,
          `NOT ${expected}`
        );
      } else if (Array.isArray(actual) && actual.includes(expected)) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected array NOT to contain ${JSON.stringify(expected)}`,
          actual,
          `NOT ${expected}`
        );
      }
    },
    toMatch(regex, msg = '') {
      const r = typeof regex === 'string' ? new RegExp(regex) : regex;
      if (!r.test(String(actual))) {
        const preview = String(actual).length > 200 ? String(actual).slice(0, 200) + '...' : String(actual);
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected string to match pattern ${regex}.\nContent preview:\n${preview}`,
          actual,
          regex.toString()
        );
      }
    },
    toNotMatch(regex, msg = '') {
      const r = typeof regex === 'string' ? new RegExp(regex) : regex;
      if (r.test(String(actual))) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected string NOT to match pattern ${regex}`,
          actual,
          `NOT ${regex}`
        );
      }
    },
    toBeGreaterThan(expected, msg = '') {
      if (!(actual > expected)) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${actual} > ${expected}`,
          actual,
          `> ${expected}`
        );
      }
    },
    toBeGreaterThanOrEqual(expected, msg = '') {
      if (!(actual >= expected)) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${actual} >= ${expected}`,
          actual,
          `>= ${expected}`
        );
      }
    },
    toBeLessThan(expected, msg = '') {
      if (!(actual < expected)) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${actual} < ${expected}`,
          actual,
          `< ${expected}`
        );
      }
    },
    toBeLessThanOrEqual(expected, msg = '') {
      if (!(actual <= expected)) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected ${actual} <= ${expected}`,
          actual,
          `<= ${expected}`
        );
      }
    },
    toHaveLength(expected, msg = '') {
      const len = actual?.length ?? actual?.size ?? 0;
      if (len !== expected) {
        throw new AssertionError(
          `${msg ? msg + ': ' : ''}Expected length ${expected}, received ${len}`,
          len,
          expected
        );
      }
    },
  };
}

// ==========================================
// Project File & Inspection Utilities
// ==========================================
export const ProjectInspector = {
  rootDir: ROOT_DIR,

  resolvePath(relPath) {
    return path.resolve(ROOT_DIR, relPath);
  },

  fileExists(relPath) {
    return fs.existsSync(this.resolvePath(relPath));
  },

  findExistingFile(possiblePaths) {
    for (const p of possiblePaths) {
      if (this.fileExists(p)) return p;
    }
    return null;
  },

  readFile(relPath) {
    const fullPath = this.resolvePath(relPath);
    if (!fs.existsSync(fullPath)) return null;
    return fs.readFileSync(fullPath, 'utf8');
  },

  readJson(relPath) {
    const content = this.readFile(relPath);
    if (!content) return null;
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  },

  getAllSourceFiles(dir = ROOT_DIR, extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.mjs']) {
    const results = [];
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next' || entry.name === '.agents') {
        continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...this.getAllSourceFiles(full, extensions));
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        results.push(path.relative(ROOT_DIR, full).replace(/\\/g, '/'));
      }
    }
    return results;
  },

  getCombinedSourceContent(extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.html']) {
    const files = this.getAllSourceFiles(ROOT_DIR, extensions);
    let combined = '';
    for (const f of files) {
      combined += `\n/* --- FILE: ${f} --- */\n` + (this.readFile(f) || '');
    }
    return { files, combined };
  },

  getGlobalsCss() {
    const p = this.findExistingFile([
      'app/globals.css',
      'src/app/globals.css',
      'styles/globals.css',
      'src/styles/globals.css',
    ]);
    return p ? this.readFile(p) : '';
  },

  getTailwindConfig() {
    const p = this.findExistingFile([
      'tailwind.config.ts',
      'tailwind.config.js',
      'tailwind.config.mjs',
    ]);
    return p ? this.readFile(p) : '';
  },

  getPackageJson() {
    return this.readJson('package.json') || {};
  },

  getComponentSource(componentName) {
    const variations = [
      `components/${componentName}.tsx`,
      `components/${componentName}.jsx`,
      `components/${componentName}.ts`,
      `components/${componentName}.js`,
      `src/components/${componentName}.tsx`,
      `src/components/${componentName}.jsx`,
      `components/sections/${componentName}.tsx`,
      `src/components/sections/${componentName}.tsx`,
      `components/layout/${componentName}.tsx`,
      `src/components/layout/${componentName}.tsx`,
      `components/ui/${componentName}.tsx`,
      `src/components/ui/${componentName}.tsx`,
      `app/${componentName}.tsx`,
      `src/app/${componentName}.tsx`,
    ];
    for (const v of variations) {
      const content = this.readFile(v);
      if (content) return { path: v, content };
    }
    return { path: null, content: null };
  },
};

// ==========================================
// Test Execution Engine
// ==========================================
async function runSuite(suite, filterGrep = null, depth = 0) {
  const indent = '  '.repeat(depth);
  console.log(`\n${indent}\x1b[1m\x1b[36m▶ ${suite.name}\x1b[0m`);

  // Run beforeAll hooks
  for (const hook of suite.beforeAllFns) {
    await hook();
  }

  // Run tests in current suite
  for (const t of suite.tests) {
    if (filterGrep && !t.name.includes(filterGrep) && !suite.name.includes(filterGrep)) {
      registry.stats.skipped++;
      continue;
    }

    registry.stats.total++;
    const testStart = Date.now();

    try {
      // Run beforeEach hooks
      for (const hook of suite.beforeEachFns) {
        await hook();
      }

      await t.fn();

      // Run afterEach hooks
      for (const hook of suite.afterEachFns) {
        await hook();
      }

      const dur = Date.now() - testStart;
      registry.stats.passed++;
      console.log(`${indent}  \x1b[32m✔\x1b[0m ${t.name} \x1b[90m(${dur}ms)\x1b[0m`);
    } catch (err) {
      const dur = Date.now() - testStart;
      registry.stats.failed++;
      registry.failures.push({
        suite: suite.name,
        test: t.name,
        error: err,
        duration: dur,
      });
      console.log(`${indent}  \x1b[31m✖\x1b[0m ${t.name} \x1b[90m(${dur}ms)\x1b[0m`);
      console.log(`${indent}    \x1b[31m${err.message}\x1b[0m`);
    }
  }

  // Run nested suites
  if (suite.suites && suite.suites.length > 0) {
    for (const nested of suite.suites) {
      await runSuite(nested, filterGrep, depth + 1);
    }
  }

  // Run afterAll hooks
  for (const hook of suite.afterAllFns) {
    await hook();
  }
}

// ==========================================
// Main CLI Runner Entry
// ==========================================
export async function runAllTests() {
  const args = process.argv.slice(2);
  const tierArg = args.find(a => a.startsWith('--tier='));
  const grepArg = args.find(a => a.startsWith('--grep='));

  const requestedTier = tierArg ? tierArg.split('=')[1] : null;
  const filterGrep = grepArg ? grepArg.split('=')[1] : null;

  console.log('\x1b[1m\x1b[35m============================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m   Abraham Grace Portfolio — E2E Test Suite Engine           \x1b[0m');
  console.log('\x1b[1m\x1b[35m============================================================\x1b[0m');
  console.log(`Working Directory: ${ROOT_DIR}`);
  console.log(`Execution Mode: Native ESM Engine`);
  if (requestedTier) console.log(`Active Tier Filter: Tier ${requestedTier}`);
  if (filterGrep) console.log(`Active Grep Pattern: "${filterGrep}"`);

  // Dynamically load test tier suites
  const tierFiles = [
    { tier: '1', file: './tier1_features.test.mjs', name: 'Tier 1: Feature Coverage' },
    { tier: '2', file: './tier2_boundaries.test.mjs', name: 'Tier 2: Boundary & Corner Cases' },
    { tier: '3', file: './tier3_combinations.test.mjs', name: 'Tier 3: Cross-Feature Interactions' },
    { tier: '4', file: './tier4_scenarios.test.mjs', name: 'Tier 4: Real-World Workload Scenarios' },
  ];

  const overallStart = Date.now();

  for (const tf of tierFiles) {
    if (requestedTier && requestedTier !== tf.tier) continue;

    const fullPath = path.resolve(__dirname, tf.file);
    if (fs.existsSync(fullPath)) {
      try {
        await import(`file://${fullPath}?update=${Date.now()}`);
      } catch (importErr) {
        console.error(`\x1b[31mFailed to load test suite ${tf.file}:\x1b[0m`, importErr);
        registry.stats.failed++;
        registry.failures.push({
          suite: tf.name,
          test: `Load ${tf.file}`,
          error: importErr,
          duration: 0,
        });
      }
    } else {
      console.warn(`\x1b[33mWarning: Test file ${tf.file} not found.\x1b[0m`);
    }
  }

  // Execute registered suites
  for (const suite of registry.suites) {
    await runSuite(suite, filterGrep);
  }

  registry.stats.durationMs = Date.now() - overallStart;

  // Print Summary
  console.log('\n\x1b[1m\x1b[35m============================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m   Test Execution Summary                                    \x1b[0m');
  console.log('\x1b[1m\x1b[35m============================================================\x1b[0m');
  console.log(`Total Tests Run: \x1b[1m${registry.stats.total}\x1b[0m`);
  console.log(`Passed:         \x1b[32m${registry.stats.passed}\x1b[0m`);
  console.log(`Failed:         \x1b[31m${registry.stats.failed}\x1b[0m`);
  console.log(`Skipped:        \x1b[33m${registry.stats.skipped}\x1b[0m`);
  console.log(`Total Duration: ${registry.stats.durationMs}ms`);

  if (registry.failures.length > 0) {
    console.log('\n\x1b[1m\x1b[31mFailure Breakdown:\x1b[0m');
    registry.failures.forEach((f, idx) => {
      console.log(`\n\x1b[31m${idx + 1}) [${f.suite}] > ${f.test}\x1b[0m`);
      console.log(`   ${f.error.stack || f.error.message}`);
    });
    console.log('\n\x1b[31m❌ TEST SUITE FAILED.\x1b[0m\n');
    process.exit(1);
  } else {
    console.log('\n\x1b[32m✔ ALL TEST TIERS PASSED PERFECTLY (Exit code 0).\x1b[0m\n');
    process.exit(0);
  }
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runAllTests();
}
