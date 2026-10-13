---
name: mashp16l-product-page-switch
description: "Use when creating, editing, or visually matching a custom product detail page in this ikas Preact/TypeScript storefront, including section-by-section work from a reference, alternate product-page layouts, Studio switches, responsive measurements, media, and animations."
---

# Custom Product Page Workflow

Use this skill for custom product-page work in this repository. Work incrementally:
inspect the real page composition, preserve its existing purchase flow, then implement
and compare one requested section at a time. Do not call a rough visual approximation
"identical"; measure it in the browser at the same viewport before claiming a match.

## How product pages are structured here

- A product page is composed in ikas Studio from registered section placements. The
  registry, generated prop types, and exports are managed by `ikas.config.json` and the
  ikas CLI; do not hand-edit generated configuration or type files.
- The product hero/purchase section is the registered `ThreeMashSingleProduct`
  component. Its entry delegates to `ThreeMashProductDetailLive` with `renderMode: "hero"`.
  The live renderer resolves the current product and builds the existing product,
  variant, price, gallery, and cart experience.
- Internal, page-specific sections belong under `src/sub-components/<Name>/` with their
  own `index.tsx` and `styles.css`. Use this when a design is intentionally controlled by
  one root placement and should not become an independently placed Studio section.
- Sections intended to be independently added, removed, reordered, or configured in
  Studio belong in registered `src/components/<Name>/` components, created and configured
  through the ikas CLI. Inspect the actual page placements before deciding which model
  applies; do not move or duplicate the existing product purchase section.
- Existing downstream product sections are separate placements. A prop on the hero does
  not automatically control them. The MASH P16L implementation currently publishes its
  product-scoped alternate-mode state from `ThreeMashProductDetailLive` through
  `ThreeMashProductDetailData`; legacy lower sections subscribe and return `null` while
  that mode is active. Preserve this explicit propagation if that architecture is used.
- The current switch is `enableAlternateMASHPage` on `ThreeMashSingleProduct`, defaults
  off, and is restricted in the renderer to product key
  `mash-p16l-385nm-16k-dental-3d-yazici`. Its Studio control is in `👁️ Görünürlük`.
  Verify placement-specific values in Studio; a shared component schema does not itself
  prove that the prop is scoped to one product.

Key implementation files:

- `src/components/ThreeMashSingleProduct/index.tsx`
- `src/components/ThreeMashProductDetailLive/index.tsx`
- `src/sub-components/ThreeMashProductDetailData/index.ts`
- `src/sub-components/MashP16LAlternatePage/index.tsx`
- `src/sub-components/MashP16LAlternatePage/styles.css`
- `src/global.css` for project theme tokens
- `reference-assets.json` for the collected reference-page asset inventory

## Workflow

### 1. Establish scope and preserve the existing page

1. Identify the exact product, route/key, active Studio template, component placement
   order, and which section renders each visible region. Read the existing source, config
   registration, generated types, and styles before editing.
2. Mark the fixed boundaries with the user. For the current P16L design, the navbar,
   existing product/purchase hero, and footer remain the original render paths; the
   alternate design replaces only the content after the product hero.
3. Confirm whether the user wants an inline alternate design or independently editable
   Studio sections. Do not restructure the page or its Studio schema on assumption.
4. Make a recoverable backup of the relevant config and source before changing render
   behavior. Do not overwrite the original implementation.
5. Confirm the user has rights to use any supplied/reference media or copied wording.
   Prefer authorized media and original implementation; never represent third-party
   source code as user-owned.

### 2. Inspect the reference, section by section

For each section the user asks to match, inspect the live page and record evidence before
coding:

- Capture the section screenshot and bounding box at desktop, tablet, and mobile sizes.
  A useful baseline is 1440×900, 768×1024, and 390×844; also test the actual breakpoints
  and any viewport the user identifies.
- Record section width/height, aspect ratio, content bounds and alignment, padding,
  image crop/object-position, text strings and line breaks, font family/size/weight/
  line-height/letter spacing, button dimensions, colors, and responsive changes.
- Inspect actual image/video sources, intrinsic dimensions, poster, object fit, loading,
  overlays, and which source is active at each breakpoint. Use
  `reference-assets.json` as an inventory, then verify the live asset and intended use.
- Inspect interactive behavior and motion in the browser: scroll-triggered reveal,
  animation duration/delay/easing, modal/video behavior, hover, and reduced-motion
  behavior. Capture computed styles and DOM measurements rather than guessing from a
  screenshot.
- Keep a small per-section checklist of requested content and explicit changes (for
  example, text preserved, CTA removed, underline recolored). Do not silently omit a
  media item or rewrite requested copy.

Implement only the section currently requested. Compare its result at the same viewport
sizes, fix the measured differences, and only then move to the next section.

### 3. Implement with the storefront architecture

- Keep the existing hero, purchase controls, navbar, cart behavior, and footer intact
  unless the user explicitly asks to change one. Never create a second product form or
  purchase control in the alternate content.
- For a whole-page design switch, add one default-off BOOLEAN to the existing first
  product-detail placement using the ikas CLI. Verify from actual product data that the
  alternate can activate only on the intended product. If the schema/placement cannot
  safely express this, stop and explain before implementing a global change.
- Render the alternate content at the real common boundary. If other lower sections are
  sibling Studio placements, explicitly propagate the mode and unmount the inactive
  sections; do not leave them in the DOM behind CSS visibility rules.
- Put internal section markup and styles in `src/sub-components/<Name>/`. Put reusable
  sub-components there too. Register a section only when it should be a separately
  manageable Studio placement.
- Use the project's theme font and design tokens instead of importing the reference
  site's font or replacing site-wide tokens. Current tokens include
  `--tm-theme-font-body` (Inter) and `--tm-theme-accent` (theme lime, `#DBFA37`).
- Keep desktop/mobile media distinct when the reference uses different compositions.
  Use the correct image per viewport, preserve aspect ratios/crops, and provide meaningful
  alt text. Do not stretch one image to stand in for missing source artwork.
- Recreate visual motion in our own code using the measured behavior. Prefer CSS or
  existing project helpers, respect `prefers-reduced-motion`, and keep text and controls
  available if animation does not run. Never copy an entire third-party page's source.
- Keep accessible headings, labels, keyboard interaction, focus, video controls, loading
  behavior, and visible fallbacks intact. Remove only controls the user explicitly asks
  to remove.

### 4. Studio and build workflow

- Use the ikas CLI for prop/config mutations; never hand-edit `ikas.config.json`,
  generated `types.ts`, `global-types.ts`, or `src/components/index.ts`.
- After changing props, verify the prop is on the intended registered component, has a
  clear Turkish Studio label, the right group, and a default that preserves the old page.
  Re-read the config and generated types after the CLI mutation.
- Build with `pnpm run build`. For Studio preview, use `pnpm run dev`. If port 5201 is
  already occupied, identify its process first; never kill an unknown process or start a
  second server on that port. Restart the project-owned dev server after config changes.
- If the Studio import is stale, publish a fresh complete package to a distinct output
  path (do not overwrite a multi-component package with a one-component publish). Verify
  the package contains the expected component ID, prop, default, and group before
  importing it.
- A successful type-check/build is not visual verification. Test the actual MASH placement
  with the switch off and on, and test a non-P16L product to confirm the shared template
  remains unchanged.

## Section 1 reference example: reveal banner

This is a measured example for the lower-page reveal banner in the UniFormation reference,
not the existing product purchase hero. Apply the user-requested differences: use the
site's Inter font, make the hand-drawn green underline use the site's lime accent, and
remove the `WATCH VIDEO` control. Preserve the reference copy unless the user asks to
change it:

- Heading: `UniFormation GK3 Pro`
- Emphasized line: `385nm Light Source`
- Remaining copy: `High-Precision` and `Pro-level Light Control for Sharper Results`

Measured reference at a 1440×900 browser viewport:

- Banner: about 1425×570 CSS px (2.5:1); desktop artwork is 3000×1200.
- Content occupies the left half; text box is about 572 px wide, beginning about 70 px
  from the left edge and vertically centered.
- Heading: Poppins 40/48 px; body: Poppins 20/28 px. In this project use Inter at the
  same measured sizes, not Poppins.
- Desktop copy is white; the drawn underline beneath `385nm Light Source` is green in
  the reference. Use `var(--tm-theme-accent)` for the requested theme-lime underline.
- Reference reveal applies opacity/translateY motion to successive content items, with
  staggered delays (about 0.2s increments); the underline stroke draws over about 1.3s.
  Recreate this on the banner only, without importing the Shopify theme's global scripts.

Measured at 390×844:

- Banner: about 375×517 CSS px (roughly 0.725:1), using a separate portrait source whose
  intrinsic dimensions are about 1228×1694 (the browser may deliver a resized variant).
- Content is centered, about 345 px wide with 15 px side inset, and sits at the bottom
  of the banner with 30 px top/bottom content padding.
- Heading: 28/33.6 px; body: 18/25.2 px; paragraph centered.
- Mobile image uses `object-fit: cover`; verify crop and focal position against the live
  reference, not only the asset dimensions.

Tablet was also observed at 768×1024: the landscape banner remains 2.5:1 and the copy
stays in the left half. Recheck wrapping and alignment around the actual 750 px breakpoint.
The old alternate hero CSS is not this measured layout; replace its section-specific rules
when implementing the reveal banner rather than treating its current 520–840 px min-height
as the reference.

## Completion checklist

- [ ] Correct product, active template, render order, and fixed hero/footer boundaries
      verified.
- [ ] Original config/source backed up before any render-path change.
- [ ] Current section measured at desktop, tablet, mobile, and relevant breakpoints.
- [ ] All requested copy, media, crop, controls, interactions, and motion accounted for.
- [ ] Section compared against the reference at matching viewport sizes; discrepancies
      corrected or explicitly reported.
- [ ] Off mode preserves the existing page; on mode replaces only intended lower content.
- [ ] Other products remain unchanged; live Studio verification is reported honestly.
- [ ] Keyboard, accessibility, media loading, and reduced-motion behavior checked.
- [ ] `pnpm run build` passes; Studio import/preview status is stated separately.
