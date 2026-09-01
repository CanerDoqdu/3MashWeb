# PAKET 4 — Remaining HTML Sanitization & XSS Hardening

**Status:** Ready for next implementation
**Build State:** 76/76 ✅ (Paket 3 verified)
**Date:** 2026-09-01
**Your Task:** Finish the remaining HTML sanitization pass, validate with build, and hand off the next package cleanly.

---

## Scope

Paket 3 protected routes, cookies, and redirects. Paket 4 focuses on the remaining untrusted HTML rendering surfaces that still accept user-controlled or CMS-controlled content without a strong sanitizer.

This is the next step after the first security pass. The objective is to make the remaining dangerous HTML injection paths safe without broad refactors.

---

## Goals

1. Review the remaining `dangerouslySetInnerHTML` / raw HTML render paths.
2. Centralize sanitization for any trusted/untrusted HTML string before rendering.
3. Harden JSON-LD and other script payload injection points.
4. Validate with `npx ikas-component build` at the end.

---

## Relevant files to inspect first

- `src/sub-components/ThreeMashSectionRenderer/index.tsx`
- `src/sub-components/ThreeMashProductDetailTemplate/index.tsx`
- `src/components/ThreeMashHeader/index.tsx`
- `src/components/ThreeMashLegalPage/index.tsx`
- `src/components/ThreeMashAboutUsPage/index.tsx`
- `src/components/ThreeMashAcademyPage/index.tsx`
- `src/components/ThreeMashFooter/index.tsx`
- `src/components/ThreeMashFaqPage/index.tsx`
- `src/components/ThreeMashProductDetailLive/index.tsx`
- `src/components/ThreeMashAccountLayout/index.tsx`

---

## Required implementation direction

### 1) Add a shared sanitizer
Use a strict sanitizer policy for rich text. The project already has a safe helper pattern starting with:
- `src/utils/sanitizeHtml.ts`

The next agent should check where raw HTML strings are still passed to `dangerouslySetInnerHTML` and replace them with a centrally managed helper that does a strict allowlist sanitize.

### 2) Review all render surfaces, not only obvious ones
Search for:
- `dangerouslySetInnerHTML`
- `html()` helpers returning raw markup
- JSON-LD script blocks built from interpolated strings
- `__html:` values from CMS, rich text, or external knowledge sources

### 3) Harden JSON-LD output
Any `<script type="application/ld+json">` content should use a safe serialization path. Avoid direct string interpolation with untrusted input. Escape HTML-sensitive sequences and ensure JSON is valid.

### 4) Preserve UI behavior
The sanitizer should not break legitimate formatting such as paragraphs, headings, links, emphasis, lists, or image embeds needed by store content.

### 5) Keep build validation tight
After the package work is in place, run:

```bash
cd "c:/Users/caner/3MashWeb"
npx ikas-component build
```

Stop and fix any TypeScript/build errors before continuing.

---

## Anti-patterns to avoid

- Do not reintroduce raw HTML into render paths without sanitization.
- Do not trust the old helper that strips a few inline styles and calls it safe.
- Do not broad-brush rewrite unrelated code.
- Do not touch CLI-generated files by hand.
- Do not add unrelated refactors or cleanup outside this security scope.

---

## Expected completion signal

The package is complete when:
- the remaining dangerous HTML render points are sanitized
- raw CMS-rich text is no longer trusted without filtering
- JSON-LD outputs are safe
- build passes cleanly

---

## Handoff note

This is the next security package after the redirect/cookie/token hardening. It is focused on the remaining XSS risk surface, especially rich-text and script injection paths.
