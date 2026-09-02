import test from 'node:test';
import assert from 'node:assert/strict';

import { safeNavigationHref } from '../src/utils/safeRedirect.ts';
import { safeJsonLdScript, sanitizeHtml } from '../src/utils/sanitizeHtml.ts';

test('safeNavigationHref blocks protocol-relative external paths', () => {
  assert.equal(safeNavigationHref('///evil.com', '/'), '/');
  assert.equal(safeNavigationHref('//evil.com', '/'), '/');
});

test('safeJsonLdScript escapes script-breaking characters', () => {
  const value = safeJsonLdScript({ text: '</script><script>alert(1)</script>' });
  assert.ok(!value.includes('</script>'));
  assert.ok(value.includes('\\u003c'));
});

test('sanitizeHtml strips script and event handler payloads from svg-like markup', () => {
  const sanitized = sanitizeHtml('<svg onload="alert(1)"><script>alert(1)</script><circle /></svg>');
  assert.ok(!sanitized.includes('onload'));
  assert.ok(!sanitized.includes('<script'));
  assert.ok(sanitized.includes('<circle'));
});
