# 3MASH Lighthouse Full-Site Audit

## What's here
- `urls.txt`                 - Flat list of all 96 discovered URLs to audit
- `url-inventory.json`      - Summary of URL counts by category
- `run-lighthouse-audit.ps1` - The audit runner script
- `reports/`                 - Output directory for all Lighthouse HTML + JSON reports
- `audit-log.txt`            - Created when audit runs; tracks pass/fail for every URL

## URL Inventory Summary (78 primary public pages)
| Category            | Count |
|---------------------|-------|
| Homepage            |     1 |
| Category Pages      |    10 |
| Brand Pages         |     7 |
| Product Pages       |    40 |
| Static Pages        |    13 |
| Blog Listing        |     1 |
| Blog Posts (sample) |    16 |
| Utility Pages       |     3 |
| **Total**           | **91** |

### Discovery Sources
- `https://xfxfu-3mashstore.myikas.com/pages.xml` — 14 static pages
- `https://xfxfu-3mashstore.myikas.com/products.xml` — 40 product pages
- `https://xfxfu-3mashstore.myikas.com/blogs.xml` — 56 blog posts (16 in main audit, all 56 slugs in url-inventory.json)
- `https://dev-caner1.ikas.shop/collections.xml` — 17 collection/brand/category pages
- Project source code (`src/components/`, `src/sub-components/ThreeMashSectionRenderer/`) — navigation routes
- `ROUTES_AND_SEO_AUDIT.md` — documented routes
- `tmp/product-videos.json` + `tmp/products.xml` — confirmed product slugs

### Skipped Routes (with reasons)
| Route                    | Reason                                              |
|--------------------------|-----------------------------------------------------|
| /account/orders          | Requires authenticated session                      |
| /account/addresses       | Requires authenticated session                      |
| /account/favorites       | Requires authenticated session                      |
| /account/register        | Auth utility page                                   |
| /account/forgot-password | Auth utility page                                   |
| /account/logout          | Redirect action endpoint, not a page                |
| /pages/hesaplama         | In ROUTES_AND_SEO_AUDIT.md but NOT in live sitemap  |
| All 56 blog posts        | 16 representative ones included; rest are in slugs  |

## How to run the audit

Open a terminal in the project root and run:

```powershell
pwsh -File .\lighthouse-audit\run-lighthouse-audit.ps1
```

Or with custom options:
```powershell
pwsh -File .\lighthouse-audit\run-lighthouse-audit.ps1 `
  -UrlFile ".\lighthouse-audit\urls.txt" `
  -ReportDir ".\lighthouse-audit\reports" `
  -LogFile ".\lighthouse-audit\audit-log.txt" `
  -Categories "performance,accessibility,best-practices,seo"
```

## Report naming convention
Reports are named: `{index:D3}_{url-slug}.report.html` and `{index:D3}_{url-slug}.report.json`

Examples:
- `001_homepage.report.html` → Homepage
- `019_mash-p16l-385nm-16k-dental-3d-yazici.report.html` → MASH P16L product page
- `062_pages_about-us.report.html` → About Us page

## Expected duration
~96 pages × ~60 sec each = **~96 minutes** total (approximately 1.5 hours)
Running unattended in a terminal is recommended.
