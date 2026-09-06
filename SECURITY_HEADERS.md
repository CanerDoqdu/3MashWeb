# Production Security Headers

This project is an ikas Code Components project. Components cannot set HTTP response headers, so these controls must be configured in the ikas storefront/hosting layer.

## Candidate headers

Apply the non-CSP headers to `https://3mash.com/*` and the English locale routes. Start the CSP in report-only mode, collect real violations on representative storefront, account, cart, checkout, and recovery routes, then tighten the policy from observed resources rather than deploying this example unchanged:

```text
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy-Report-Only: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self' https://*.ikasapps.com https://*.myikas.com; script-src 'self' https://www.googletagmanager.com https://connect.facebook.net https://static.zohocdn.com https://js.zohostatic.com; connect-src 'self' https://*.ikas.com https://*.myikas.com https://*.facebook.com https://*.google-analytics.com https://*.googletagmanager.com https://*.zoho.eu https://*.zohopublic.eu; img-src 'self' data: https://cdn.myikas.com https://*.facebook.com https://*.google-analytics.com https://*.zoho.eu; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; frame-src 'self' https://*.ikasapps.com https://*.myikas.com; media-src 'self' https://cdn.myikas.com; form-action 'self' https:;
```

Use `Referrer-Policy: no-referrer` specifically on password recovery routes if the platform supports per-route headers. Review CSP violations before enforcement, then change the validated policy to `Content-Security-Policy`. Do not add `unsafe-eval` or broad wildcard sources.

The current components emit inline critical CSS and a first-paint announcement script. A strict enforced CSP therefore needs a platform-provided nonce or a narrowly reviewed `unsafe-inline` exception for the current theme output. Keep this in Report-Only until ikas supports the required nonce flow.

## Consent and third-party scripts

The repository does not load Meta, Google, Zoho PageSense, or Zoho SalesIQ scripts. It only sends consent signals and removes accessible non-consented cookies. Configure those scripts in ikas so that:

- Meta Pixel, Google Analytics/GTM, Zoho PageSense, and Zoho SalesIQ are not loaded before the matching consent category is granted.
- Existing integrations use the site's consent event/state: `tm_cookie_consent_updated` and `window.__tmCookieConsent`.
- Password recovery routes do not load analytics, chat, or marketing scripts.
- Cookies that are `HttpOnly` or set by third-party origins cannot be deleted by this component; they must be prevented at script/integration load time.

## Verification

After applying the headers and integration settings, verify with:

```text
curl -I https://3mash.com/
```

Then run a clean browser session with no stored consent and confirm that no Meta, Google Analytics, Zoho PageSense, or Zoho SalesIQ request/cookie occurs before the user grants the relevant category.
