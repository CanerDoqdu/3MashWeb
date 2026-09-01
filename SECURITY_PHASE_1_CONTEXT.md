# Security Phase 1 — Context for Next AI / Reset Session

## Goal

Start with the first package: P0 Security Hardening.

This package is about removing the immediate XSS and unsafe HTML injection risks before moving to storage, redirect, or refactor cleanup.

## Status

### Done / confirmed
- The project has many `dangerouslySetInnerHTML` usages.
- The highest risk hotspots are:
  - `src/sub-components/ThreeMashSectionRenderer/index.tsx`
  - `src/sub-components/ThreeMashProductDetailTemplate/index.tsx`
  - `src/components/ThreeMashHeader/index.tsx`
  - `src/components/ThreeMashAccountLayout/index.tsx`
  - `src/components/ThreeMashAboutUsPage/index.tsx`
  - `src/components/ThreeMashAcademyPage/index.tsx`
  - `src/components/ThreeMashLegalPage/index.tsx`
- A shared pattern exists where HTML is passed through without strict sanitization before rendering.
- `src/sub-components/ThreeMashSectionRenderer/index.tsx` includes a helper that strips some inline style attributes, but it does not sanitize untrusted HTML.
- `src/sub-components/ThreeMashProductDetailTemplate/index.tsx` also injects JSON-LD via raw HTML strings.
- The build is currently healthy; the last known verification command succeeded:
  - `npx ikas-component build`

### Not done yet
- No HTML sanitizer is implemented.
- No centralized safe rendering helper exists.
- JSON-LD injection is not hardened.
- No CSP-oriented protection is added.

## First work package: P0 Security Hardening

### Scope

Only this package is in scope until complete:
1. sanitize untrusted HTML before `dangerouslySetInnerHTML`
2. centralize safe HTML rendering logic
3. harden JSON-LD script injection
4. validate build after each meaningful fix

### Do not do in this package
- Do not start refactor of giant components.
- Do not move hardcoded data into config yet.
- Do not touch localStorage/sessionStorage cleanup yet.
- Do not change routes or redirect logic yet.
- Do not broaden scope into linting or tests until this package is verified.

## Required implementation direction

### 1) Add a strict sanitizer
Use a clear sanitizer strategy such as:
- DOMPurify, or
- `sanitize-html`

Prefer the least risky option that works well with Preact and the project setup.

Important rule:
- The sanitizer must be applied to any value that can come from CMS content, rich text props, or externally sourced content.
- Do not trust `html()`/`inlineHtml()` helpers that only strip inline styles.

### 2) Centralize the safe helper
Create a small shared utility (or a single internal helper in the main risky file) that follows this pattern:
- receive raw HTML string
- sanitize it
- return safe string for `dangerouslySetInnerHTML`

This should be reused where rich text is rendered rather than ad-hoc sanitization per component.

### 3) JSON-LD protection
For `<script type="application/ld+json">` blocks:
- serialize with safe JSON output
- escape HTML-sensitive characters consistently
- avoid unsafe raw string injection

The current pattern is close to a risk surface; it should be wrapped in a dedicated helper and carefully reviewed.

### 4) Keep validation tight
After each fix or after the package is done, run:
- `npx ikas-component build`

If TypeScript or build errors appear, fix them before continuing.

## Relevant files

Primary files to inspect first:
- `src/sub-components/ThreeMashSectionRenderer/index.tsx`
- `src/sub-components/ThreeMashProductDetailTemplate/index.tsx`
- `src/components/ThreeMashHeader/index.tsx`
- `src/components/ThreeMashLegalPage/index.tsx`
- `src/components/ThreeMashAboutUsPage/index.tsx`
- `src/components/ThreeMashAcademyPage/index.tsx`

Secondary / follow-up files after the core fix:
- `src/components/ThreeMashFooter/index.tsx`
- `src/components/ThreeMashFaqPage/index.tsx`
- `src/components/ThreeMashProductDetailLive/index.tsx`
- `src/components/ThreeMashAccountLayout/index.tsx`

## Execution order for the next AI

1. Inspect the sanitizer risk in `ThreeMashSectionRenderer` and `ThreeMashProductDetailTemplate`.
2. Add a safe shared HTML sanitization path.
3. Replace unsafe raw HTML injection in the most critical render points.
4. Review JSON-LD injection sites.
5. Validate with build.
6. Stop when the P0 package is stable and documented.

## Completion criteria for this package

This package is complete when:
- all critical `dangerouslySetInnerHTML` render paths are sanitized or explicitly safe
- raw article/CMS HTML is no longer trusted without sanitization
- JSON-LD script output is safe and reviewed
- `npx ikas-component build` passes

## Notes for future tasks

The next packages will be:
1. Hardcoded data + storage cleanup
2. Redirect and auth flow validation
3. Test setup + empty catch cleanup
4. Refactor + lint + maintainability

Do not start those until this package is closed.

## Important repo rule

This project has generated files and CLI-managed config. Never manually edit generated outputs such as:
- `ikas.config.json`
- `src/global-types.ts`
- `src/components/index.ts`

Only fix source component code directly.
