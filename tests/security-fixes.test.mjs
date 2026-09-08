import test from 'node:test';
import assert from 'node:assert/strict';

import { safeCheckoutHref, safeNavigationHref } from '../src/utils/safeRedirect.ts';
import { safeJsonLdScript, sanitizeHtml } from '../src/utils/sanitizeHtml.ts';
import { isStudioEnvironment } from '../src/utils/isStudioEnvironment.ts';

test('safeNavigationHref blocks protocol-relative external paths', () => {
  assert.equal(safeNavigationHref('///evil.com', '/'), '/');
  assert.equal(safeNavigationHref('//evil.com', '/'), '/');
});

test('safeNavigationHref keeps valid protocol links while blocking dangerous schemes', () => {
  assert.equal(safeNavigationHref('mailto:test@example.com', '/'), 'mailto:test@example.com');
  assert.equal(safeNavigationHref('tel:+123456789', '/'), 'tel:+123456789');
  assert.equal(safeNavigationHref('sms:+123456789', '/'), 'sms:+123456789');
  assert.equal(safeNavigationHref('whatsapp://send?text=hello', '/'), 'whatsapp://send?text=hello');
  assert.equal(safeNavigationHref('javascript:alert(1)', '/'), '/');
  assert.equal(safeNavigationHref('data:text/html;base64,PHNjcmlwdD4=', '/'), '/');
});

test('safeCheckoutHref only allows relative or HTTPS checkout destinations', () => {
  assert.equal(safeCheckoutHref('/checkout'), '/checkout');
  assert.equal(safeCheckoutHref('https://checkout.ikas.com/session/123'), 'https://checkout.ikas.com/session/123');
  assert.equal(safeCheckoutHref('javascript:alert(1)'), '');
  assert.equal(safeCheckoutHref('data:text/html,alert(1)'), '');
  assert.equal(safeCheckoutHref('http://checkout.ikas.com/session/123'), '');
  assert.equal(safeCheckoutHref('//evil.example/checkout'), '');
});

test('isStudioEnvironment only trusts ikas host boundaries', () => {
  const originalWindow = globalThis.window;
  try {
    globalThis.window = { location: { hostname: 'preview.ikasapps.com' } };
    assert.equal(isStudioEnvironment(), true);
    globalThis.window = { location: { hostname: 'evilikasapps.com' } };
    assert.equal(isStudioEnvironment(), false);
    globalThis.window = { location: { hostname: 'preview.myikas.com' } };
    assert.equal(isStudioEnvironment(), true);
    globalThis.window = { location: { hostname: 'evilmyikas.com' } };
    assert.equal(isStudioEnvironment(), false);
  } finally {
    globalThis.window = originalWindow;
  }
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

test('sanitizeHtml fallback strips executable URL schemes', () => {
  const sanitized = sanitizeHtml('<a href="javascript:alert(1)">bad</a><a href="data:image/svg+xml,<svg><script>alert(1)</script></svg>">svg</a><img src="data:text/html,alert(1)">');
  assert.ok(!sanitized.includes('javascript:'));
  assert.ok(!sanitized.includes('data:image/svg+xml'));
  assert.ok(!sanitized.includes('data:text/html'));
});

test('sanitizeHtml strips executable URL schemes separated by control whitespace', () => {
  const input = '<a href="java' + String.fromCharCode(10) + 'script:alert(1)">bad</a>';
  assert.ok(!sanitizeHtml(input).includes('java'));
});

test('sanitizeHtml fallback removes forbidden elements and dangerous attributes', () => {
  const sanitized = sanitizeHtml(
    '<iframe src="https://evil.example"></iframe><object data="x"></object><form action="javascript:alert(1)"><input></form><svg><foreignObject><p>bad</p></foreignObject></svg>',
  );
  assert.ok(!sanitized.includes('<iframe'));
  assert.ok(!sanitized.includes('<object'));
  assert.ok(!sanitized.includes('<form'));
  assert.ok(!sanitized.includes('<input'));
  assert.ok(!sanitized.includes('<foreignObject'));
  assert.ok(!sanitized.includes('javascript:'));
});
