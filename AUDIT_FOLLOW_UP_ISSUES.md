# Audit Follow-up Issues

## Pre-existing test defect

- `tests/security-fixes.test.mjs`: `forgot-password and recover-password use the public auth page shell instead of the protected account layout`
- Baseline: failed on checkpoint `ae71031` before the Step 1 changes.
- Cause: the assertion scans the whole utility module and rejects the normal protected-layout return even though the component branches to `ThreeMashAccountPage` for `forgot-password` and `recover-password` modes.
- Scope: test assertion needs to inspect the mode branch or use a runtime-focused test. It was not changed as part of the product fallback or responsive work.

## Pre-existing build warning

- `src/sub-components/ThreeMashProductDetailTemplate/styles.css`: `npm run build` reports a circular CSS import.
- Baseline: warning reproduced on checkpoint `ae71031`; the build still succeeds.
- Scope: resolve separately from the Step 1 content and Step 2 responsive fixes.

## Low-priority CMS contact-link cleanup

- `contactFooterLinks` in the ikas admin panel currently contains an incorrect
	`/account/recover-password` href for the email and physical-address entries.
- Code fix: `footerHrefForLabel` now derives `mailto:info@3mash.com` and the
	configured maps target from matching contact labels, so the two known links
	remain correct even when the CMS href is wrong.
- Admin action: manually inspect and correct those contactFooterLinks entries
	in the ikas panel. The stored bad href is evidence of an accidental copied
	link and should not remain as the source data.
- Future risk: a new contact type, such as a phone number, will need its own
	label-to-target rule or correct CMS href; otherwise the same copied-link
	problem could recur.
