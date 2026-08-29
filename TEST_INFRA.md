# TEST_INFRA.md

**Portfolio integration test infrastructure** — Abram Grace, Personal Developer Portfolio.

## Purpose

This portfolio ships with a standalone, dependency-free Node.js assertion engine
that inspects the project source at the file level. It requires no browser, no
test runner, and no network:

```bash
node tests/e2e-runner.mjs            # full suite, all 4 tiers
node tests/e2e-runner.mjs --tier=1   # run a single tier
node tests/e2e-runner.mjs --grep=F5  # run matching tests only
```

## Structure

| Tier | File | Scope |
| --- | --- | --- |
| Tier 1 | `tests/tier1_features.test.mjs` | 19 feature areas (F1–F19), 5 assertions each |
| Tier 2 | `tests/tier2_boundaries.test.mjs` | Boundary conditions (viewport extremes, grid opacity, etc.) |
| Tier 3 | `tests/tier3_combinations.test.mjs` | Feature combinations (boot sequence + scroll reveal, etc.) |
| Tier 4 | `tests/tier4_scenarios.test.mjs` | End-to-end walkthroughs (recruiter audit, search crawler / No-JS, etc.) |
| Runner | `tests/e2e-runner.mjs` | Registry, assertion primitives, structured result report |

Assertions are deterministic and source-based: they never depend on timing,
random values, or network, keeping the suite non-flaky and fast.

## Requirement Traceability Matrix

Covers 100% of the 19 functional requirements in `PROJECT.md`. Each row lists
the requirement id, the tier(s) that assert it, and verification scope.

| Requirement | Description | Verification tier(s) | Status |
| --- | --- | --- | --- |
| F1 | Next.js App Router scaffold | Tier 1 (`F1.1`–`F1.5`) | Verified |
| F2 | Design system & theme foundation | Tier 1 (`F2.1`–`F2.5`), Tier 2 (`B4.2`) | Verified |
| F3 | Header navigation component | Tier 1 (`F3.1`–`F3.5`) | Verified |
| F4 | Footer component | Tier 1 (`F4.1`–`F4.5`) | Verified |
| F5 | Hero typography & copy | Tier 1 (`F5.1`–`F5.5`), Tier 3 (`C3.2`), Tier 4 (`S1.2`, `S5.2`) | Verified |
| F6 | Custom SVG terminal schematic | Tier 1 (`F6.1`–`F6.5`) | Verified |
| F7 | SVG terminal drawing animation | Tier 1 (`F7.1`–`F7.5`), Tier 2 | Verified |
| F8 | SVG terminal text & cursor | Tier 1 (`F8.1`–`F8.5`) | Verified |
| F9 | Selected work: KAIROKU | Tier 1 (`F9.1`–`F9.5`) | Verified |
| F10 | Technical stack spec sheet | Tier 1 (`F10.1`–`F10.5`) | Verified |
| F11 | About & education section | Tier 1 (`F11.1`–`F11.5`), Tier 3 | Verified |
| F12 | Contact section | Tier 1 (`F12.1`–`F12.5`) | Verified |
| F13 | Fast boot sequence | Tier 1 (`F13.1`–`F13.5`), Tier 3 (`C3.1`–`C3.2`), Tier 4 | Verified |
| F14 | Scroll reveals & observer | Tier 1 (`F14.1`–`F14.5`), Tier 3 (`C3.2`) | Verified |
| F15 | Technical hover interactions | Tier 1 (`F15.1`–`F15.5`) | Verified |
| F16 | Reduced motion accessibility | Tier 1 (`F16.1`–`F16.5`), Tier 3 (`C3.1`), Tier 4 (`S3.1`) | Verified |
| F17 | Responsive layout & viewports | Tier 1 (`F17.1`–`F17.5`), Tier 2 (`B4.1`–`B4.3`) | Verified |
| F18 | Comprehensive E2E verification | Tier 1 (`F18.1`–`F18.5`) | Verified |
| F19 | Adversarial hardening | Tier 1 (`F19.1`–`F19.5`), Tier 4 (`S5.1`–`S5.3`) | Verified |

## Harness Invariants

1. **No flaky values** — assertions are deterministic; randomized inputs are
   rejected.
2. **No framework magic** — plain Node ESM (`.mjs`), native `node:fs`.
3. **No-JS fidelity** — tier-4 scenarios assert the full portfolio copy and
   role/name are present in static markup (crawlable without JavaScript).
4. **Exit code** — non-zero on any failure; structured report to stdout.

Any regression that removes a requirement's checkbox flips this matrix red.