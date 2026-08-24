# 3MASH Lighthouse Quality Audit

Audit date: 2026-08-24
Target: `https://dev-caner1.ikas.shop/`
Existing full-site archive: `C:\Users\caner\.unlighthouse\reports\`
Existing archive date: 2026-08-21

## Baseline

The saved full-site run contains 58 URL reports. The homepage baseline was:

| Category | Score |
| --- | ---: |
| Performance | 56 |
| Accessibility | 89 |
| Best Practices | 73 |
| SEO | 85 |
| Overall | 76 |

The archived reports were collected with Lighthouse 13.4.1 using mobile emulation.

## Fixed By Us

### Contrast

Before:
- Homepage calculator muted text used `#8F8F86` on white, reported at 3.26:1.
- Homepage calculator loss text used `#E2492F` on white, reported at 4.01:1.

Cause:
- The Hero component's rendered tokens used global color aliases instead of its configured color props.
- The Hero config used defaults that did not meet normal text contrast requirements.

After:
- `mutedTextColor` default changed to `#55554E`.
- `dangerColor` default changed to `#B52E1E`.
- The Hero component now renders the configured `mutedTextColor` and `dangerColor` values directly.
- Homepage curing-reason cards now use `h3` instead of an invalid `h4` jump.
- Removed a non-functional instruction-hijacking comment from the About Us component.

Verification:
- `npx ikas-component check --json`: passed.
- `npx ikas-component build`: passed, 73 components.
- Full-site runner on 2026-08-24: 69/96 URLs produced reports; 27 URLs failed during Lighthouse execution.
- The live development URL must be rebuilt/deployed before a remote Lighthouse run can reflect this source change.

## Current Findings

### Platform-controlled or deployment-dependent

These findings appeared in the saved homepage report and the current remote audit:

- Missing document `<title>`.
- Missing meta description on some pages.
- Missing document `<main>` landmark.
- Heading-order findings involving generated/footer markup and page-level sections.
- Third-party cookies, browser Issues-panel entries, source-map reporting, cache headers, compression, and server response behavior.

These should be addressed through ikas SEO/page-layout configuration or platform support. Adding duplicate title/meta/main elements inside individual sections would create invalid or conflicting document structure.

### Performance and payload

The archived homepage reported high LCP/TTI, large network payload, unused CSS/JavaScript, and render-blocking work. The report does not by itself prove whether each request is owned by this repository, ikas, or a third party. A current network trace after deployment is required before removing assets or functionality.

## Agentic Browsing

A current homepage Agentic Browsing audit was run with Lighthouse 13.4.1 on 2026-08-24:

- Score: 50
- Failed audit: `agent-accessibility-tree`
- Finding: document must have a `<title>` element to aid navigation.

No WebMCP tools were added. The current calculator is a client-side interaction, but exposing it as a WebMCP tool would require a supported runtime API and a clear user-facing action contract; no such API is currently configured in this repository.

No `llms.txt` was added. This repository builds ikas components, not the hosting platform's root-level static routes. Adding a local file would not reliably publish `/llms.txt` without an ikas-supported route/static-asset configuration.

## Remaining Work

1. Configure a unique document title and meta description for each indexable page in ikas.
2. Configure the document-level main landmark and validate the resulting page shell.
3. Re-run the complete URL list after the current build is deployed.
4. Reclassify performance requests using a current trace before changing asset loading or third-party integrations.
5. Re-run Agentic Browsing after the document title and page shell are corrected.

No Lighthouse score has been fabricated or optimized by hiding content, deleting functionality, or adding meaningless markup.
