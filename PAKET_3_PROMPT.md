    # PAKET 3 — Redirect & Cookie Hardening | AI Prompt

**Status:** Ready for next implementation  
**Build State:** 76/76 ✅ (Paket 1-2 verified)  
**Date:** 2026-09-01  
**Your Task:** Implement Paket 3 completely, validate with build, hand off to next agent for Paket 4.

---

## ✅ WHAT PREVIOUS AGENT DID

### Paket 1 — XSS & JSON-LD Sanitization
- Created `src/utils/sanitizeHtml.ts` with:
  - `sanitizeHtml(raw: string): string` — uses DOMPurify, strict allowlist (p, br, strong, em, b, i, u, a[href|title|rel|target], ul, ol, li, h1-h6, blockquote, img[src|alt], etc.)
  - `safeJsonLdScript(obj: any): string` — escapes `</`, U+2028, U+2029 for `<script type="application/ld+json">` context
- Applied to:
  - `src/sub-components/ThreeMashSectionRenderer/index.tsx` — wrapped `html()` and `productJsonLd()` calls
  - `src/sub-components/ThreeMashProductDetailTemplate/index.tsx` — wrapped `html()` and schema blocks
  - `src/components/ThreeMashFooter/index.tsx` — wrapped `organizationJsonLd()`
- Result: All three files now use safe helpers instead of raw `dangerouslySetInnerHTML`.

### Paket 2 — Business Config & PII Storage
- Created `src/utils/businessConfig.ts`:
  - `businessConfig.merchantId`, `.whatsappNumber`, `.mapsQuery` (runtime-configurable from window.__THREEMASH_CONFIG__ or env vars)
  - `getWhatsAppHref(message?: string)` → encodes message, returns `https://wa.me/${number}?text=...`
  - `getGoogleMapsHref(query?: string)` → returns safe Maps query URL
  - `getMerchantImageBaseUrl()` → returns CDN image prefix
- Updated `src/components/ThreeMashOrderLineImage.ts` → imports `businessConfig`, uses `.merchantId` instead of hardcoded UUID
- Hardened `src/utils/i18n.ts` → added `Secure` flag to locale cookies when `window.location.protocol === "https:"`
- Cleaned storage in:
  - `src/components/ThreeMashAccountPage/index.tsx` — removed `tm_customer_name` write-to-sessionStorage after login success
  - `src/components/ThreeMashAccountLayout/index.tsx` — removed PII cache reads/writes from getInitialSidebarName(), effect, and logout
  - `src/components/ThreeMashHeader/index.tsx` — minimal logout cleanup (only `customer` key removal)
- Result: PII no longer persisted client-side; business data externalized; build passed 76/76.

---

## 📋 YOUR TASKS — PAKET 3

### Task 1: Safe Redirect Helper (§1.5)

**File to create:** `src/utils/safeRedirect.ts`

```typescript
/**
 * Validates and sanitizes redirect URLs.
 * 
 * Rules:
 * 1. Relative URLs starting with "/" are safe (same-origin)
 * 2. Absolute URLs must match current window.location.origin
 * 3. javascript: and data: schemes are forbidden
 * 4. If invalid, returns "/account/login" (safe fallback)
 * 
 * Usage:
 *   const safe = safeRedirect(untrustedUrl);
 *   window.location.href = safe;
 */
export function safeRedirect(url?: string): string {
  if (!url) return "/account/login";
  const trimmed = url.trim();
  
  // Relative URL (safe)
  if (trimmed.startsWith("/")) return trimmed;
  
  // Forbidden schemes
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) return "/account/login";
  
  // Absolute URL — must match origin
  try {
    const parsed = new URL(trimmed, window.location.href);
    if (parsed.origin === window.location.origin) return parsed.toString();
  } catch {
    // Invalid URL
  }
  
  return "/account/login";
}
```

**Files to update** (search for `window.location.href =` and `window.location.replace`):

| File | Lines | Old | New |
|------|-------|-----|-----|
| `src/components/ThreeMashAccountLayout/index.tsx` | 439, 524 | `window.location.replace(loginTarget)` | `window.location.replace(safeRedirect(loginTarget))` |
| `src/components/ThreeMashAccountLayout/index.tsx` | 486 | `window.history.pushState({}, "", nextHref)` | `window.history.pushState({}, "", safeRedirect(nextHref))` |
| `src/components/ThreeMashCategoryLanding/index.tsx` | 430 | `window.location.href = normalizedTargetPath` | `window.location.href = safeRedirect(normalizedTargetPath)` |
| `src/sub-components/ThreeMashPrintersSourceLanding/index.tsx` | 67 | `window.location.href = path` | `window.location.href = safeRedirect(path)` |
| `src/components/ThreeMashHeader/index.tsx` | 1126, 1629, 1633, 1931, 2449, 2477, 2776, 2794 | Various `window.location.href` | Wrap with `safeRedirect()` |
| `src/components/ThreeMashHeaderV2/index.tsx` | (same line ranges as Header) | Same | Wrap with `safeRedirect()` |

**Do NOT change:**
- `src/components/ThreeMashCartPage/index.tsx:424` — `checkoutUrl` comes from ikas API (trust boundary)
- `src/components/ThreeMashContactPage/index.tsx:138` — `mailHref` is `mailto:` (not a redirect)

---

### Task 2: Password Reset Token URL Safety (§1.6)

**File:** `src/components/ThreeMashAccountUtilityPage/index.tsx` (around line 637-686, `RecoverPasswordView`)

**Change:**
- In `RecoverPasswordView`, after reading `token` from `getQueryParam("token")`, immediately call:
  ```typescript
  useLayoutEffect(() => {
    if (token) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [token]);
  ```
  This clears the `?token=...` from the URL bar without losing the in-memory token.

**Add to page render** (top of component or in parent section):
```jsx
<head>
  <meta name="referrer" content="no-referrer" />
</head>
```
Or if you cannot modify `<head>` in Preact, add a comment noting this should be set by the ikas host on the recovery page.

**Why:** Prevents referer-leakage of the token to third-party assets (CDN, analytics, etc.).

---

### Task 3: Studio Mode Tightening (§1.7)

**File:** `src/components/ThreeMashAccountUtilityPage/index.tsx` (lines 154-165, `isStudioEnvironment`)

**Current code:**
```typescript
return (
  window.location.hostname.includes("ikasapps.com") ||
  window.location.hostname.includes("myikas.com") ||
  window.location.search.includes("studio=") ||      // ❌ Remove this
  window.location.search.includes("preview=") ||     // ❌ Remove this
  document.referrer.includes("ikasapps.com") ||       // ❌ Remove this
  document.referrer.includes("myikas.com") ||         // ❌ Remove this
  (typeof window.parent !== "undefined" && window.parent !== window)
);
```

**New code:**
```typescript
return (
  window.location.hostname.includes("ikasapps.com") ||
  window.location.hostname.includes("myikas.com") ||
  (typeof window.parent !== "undefined" && window.parent !== window)
);
```

**Why:** URL-parameter and referrer checks are attacker-controllable; hostname + iframe structural check is sufficient.

---

### Task 4: Safe URI Decode Helper (§1.11)

**File to create:** `src/utils/safeDecodeURI.ts`

```typescript
/**
 * Safely decodes a URI component.
 * 
 * Returns the input unchanged if decoding fails (invalid UTF-8).
 * This prevents DoS-by-crafted-hash (#%FF%FF%FF).
 */
export function safeDecodeURI(value: string): string {
  if (!value) return value;
  try {
    return decodeURIComponent(value);
  } catch (e) {
    // URIError — return unchanged
    return value;
  }
}
```

**Files to update** (search for `decodeURIComponent(`):

| File | Lines | Old | New |
|------|-------|-----|-----|
| `src/sub-components/ThreeMashCategoryLanding/index.tsx` | 426, 434 | `decodeURIComponent(hash.slice(1))` | `safeDecodeURI(hash.slice(1))` |
| `src/sub-components/ThreeMashCategoryLanding/presets.ts` | 10 | `decodeURIComponent(value \|\| "")` | `safeDecodeURI(value \|\| "")` |
| `src/components/ThreeMashCategoryProductsPage/index.tsx` | 16 | `decodeURIComponent(value)` | `safeDecodeURI(value)` |
| `src/components/ThreeMashHeader/index.tsx` | 1761, 2101, 2209 | `decodeURIComponent(url.hash.slice(1))` | `safeDecodeURI(url.hash.slice(1))` |
| `src/components/ThreeMashHero/index.tsx` | 183 | `decodeURIComponent(hash.slice(1))` | `safeDecodeURI(hash.slice(1))` |
| `src/utils/i18n.ts` | 25, 150 | `decodeURIComponent(value)` | `safeDecodeURI(value)` |

---

### Task 5: Add `Secure` + `HttpOnly` to Cookie Logic (§1.4)

**File:** `src/utils/i18n.ts` (line ~189-191, `setPreferredLocale`)

**Current:**
```typescript
document.cookie = `3mash_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
document.cookie = `3mash_lang=${locale}; path=/; max-age=31536000; SameSite=Lax`;
document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
```

**Change to:**
```typescript
const secureSuffix = window.location.protocol === "https:" ? "; Secure" : "";
document.cookie = `3mash_locale=${locale}; path=/; max-age=31536000; SameSite=Lax${secureSuffix}`;
// Deprecated for backward compat, but keep for migration:
document.cookie = `3mash_lang=${locale}; path=/; max-age=31536000; SameSite=Lax${secureSuffix}`;
document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax${secureSuffix}`;
```

**Why:** Prevents downgrade attacks if HTTPS is compromised.

---

### Task 6: Cookie Purge Domain Allowlist (§1.4)

**File:** `src/components/ThreeMashCookieConsent/index.tsx` (lines 69-89, cookie purge logic)

**Current code:**
```typescript
const domains = [
  "",
  "." + hostname,
  hostname,
  "." + domainParts.slice(-2).join("."),
];
for (const domain of domains) {
  for (const prefix of cookiePrefixes) {
    document.cookie = `${prefix}=; path=/; Domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
```

**Add validation:**
```typescript
const allowedDomains = ["3mash.com", "myikas.com", "ikasapps.com"];
const isAllowedDomain = allowedDomains.some(allowed => hostname.endsWith(allowed));

if (!isAllowedDomain) {
  console.warn("CookieConsent: hostname not in allowlist, skipping purge");
  return;
}

const domains = [
  "",
  "." + hostname,
  hostname,
  "." + domainParts.slice(-2).join("."),
];
for (const domain of domains) {
  for (const prefix of cookiePrefixes) {
    document.cookie = `${prefix}=; path=/; Domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
```

**Why:** Prevents attacker-controlled hostname from poisoning wrong domains.

---

### Task 7: External Link `noopener` Fix (§1.12)

**Files to update:**

| File | Lines | Current | Fix |
|------|-------|---------|-----|
| `src/components/ThreeMashContactPage/index.tsx` | 163-167, 338-339 | `rel="noreferrer"` | `rel="noopener noreferrer"` |
| `src/components/ThreeMashReferences/index.tsx` | 239-240 | `rel="noreferrer"` | `rel="noopener noreferrer"` |

**Search & replace:**
- `rel="noreferrer"` → `rel="noopener noreferrer"` in those files only.

**Verify (after changes):**
- Every `target="_blank"` on external links (different origin) should have `rel="noopener noreferrer"`.

---

## 📝 Detailed Implementation Notes

### Import Path Updates
When you add `safeRedirect()` and `safeDecodeURI()`, import them:
```typescript
import { safeRedirect } from "../../utils/safeRedirect";
import { safeDecodeURI } from "../../utils/safeDecodeURI";
```

### Build Verification
After completing each task, run:
```bash
cd "c:/Users/caner/3MashWeb"
npx ikas-component build
```

**Expected:** 76/76 ✅ components pass. If any fail, stop and fix the error before proceeding to the next task.

### Order of Implementation
1. Create `safeRedirect.ts`
2. Create `safeDecodeURI.ts`
3. Update all redirect sites to use `safeRedirect()`
4. Update all decodeURIComponent sites to use `safeDecodeURI()`
5. Tighten `isStudioEnvironment()`
6. Add `history.replaceState()` to password recovery
7. Secure locale cookies
8. Add domain allowlist to cookie purge
9. Add `noopener` to 3 external link sites
10. **Final:** `npx ikas-component build` → must be 76/76 ✅

---

## ❌ DO NOT

- ❌ Edit `ikas.config.json`, `types.ts`, `global-types.ts`, `src/components/index.ts` by hand (auto-generated)
- ❌ Use `npm`; use `pnpm` only (patch requirement)
- ❌ Change business logic, only security-related redirects
- ❌ Skip build validation between tasks
- ❌ Edit `src/sub-components/ThreeMashCategoryLanding/categoryDetection.ts` window.parent access (already safe with try/catch)

---

## ✅ DO

- ✅ Use `multi_replace_string_in_file` tool to batch edits across multiple files for efficiency
- ✅ Read file context (3-5 lines before/after) for each replace
- ✅ Run `npx ikas-component build` after every 2-3 tasks to catch errors early
- ✅ If build fails, use `get_errors` tool to see what broke
- ✅ Document changes in session memory if you need to hand off mid-paket
- ✅ After Paket 3 is done, update the plan file to mark it complete and prepare Paket 4 context

---

## Handoff Criteria (To Next Agent)

When Paket 3 is complete:
1. Build passes 76/76 ✅
2. All 7 tasks implemented and tested
3. No linting errors (if ESLint available)
4. Git commit: `"Paket 3: Redirect allowlist, token URL safety, studio tightening, URI decode, cookie hardening"`
5. Create a new context file for Paket 4 (HTML sanitization of remaining 20+ sites)

---

## Reference Files

- Audit source: `C:\Users\caner\.local\share\kilo\plans\1788249229623-3mashweb-scan-plan.md` (§1.4-1.7, §1.11-1.12)
- Paket 1-2 context: Captured in this file (sections above)
- Build baseline: 76/76 components (verified 2026-09-01 post-Paket-2)
- ikas framework docs: [CLAUDE.md](../../CLAUDE.md) in project root

Good luck! 🚀
