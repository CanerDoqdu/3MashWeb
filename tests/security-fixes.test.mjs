import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { safeCheckoutHref, safeNavigationHref, safeRedirect, safeWhatsAppHref } from '../src/utils/safeRedirect.ts';
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

test('safeRedirect blocks external absolute URLs', () => {
  assert.equal(safeRedirect('https://evil.example/account'), '/account/login');
  assert.equal(safeRedirect('//evil.example/account'), '/account/login');
  assert.equal(safeRedirect('/account/login'), '/account/login');
});

test('safeWhatsAppHref only allows approved WhatsApp hosts', () => {
  assert.equal(safeWhatsAppHref('https://wa.me/905314326577?text=hello'), 'https://wa.me/905314326577?text=hello');
  assert.equal(safeWhatsAppHref('https://api.whatsapp.com/send?phone=905314326577'), 'https://api.whatsapp.com/send?phone=905314326577');
  assert.equal(safeWhatsAppHref('https://evil.example/phishing'), 'https://wa.me/905314326577');
  assert.equal(safeWhatsAppHref('javascript:alert(1)'), 'https://wa.me/905314326577');
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

test('systems category filter is restricted to the two target products', () => {
  const categoryFilePath = fileURLToPath(new URL('../src/sub-components/ThreeMashCategoryLanding/index.tsx', import.meta.url));
  const categoryText = readFileSync(categoryFilePath, 'utf8');

  assert.match(categoryText, /const systemSignals = \[/);
  assert.match(categoryText, /if \(kind === "systems"\) return matchesAny\(systemSignals\);/);
  assert.match(categoryText, /"trasformer comp flow"/);
  assert.match(categoryText, /"light glass mufla sistemi"/);
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

test('spare-part category filtering excludes non-spare products and keeps the English title casing correct', () => {
  const categoryFilePath = fileURLToPath(new URL('../src/sub-components/ThreeMashCategoryLanding/index.tsx', import.meta.url));
  const categoryText = readFileSync(categoryFilePath, 'utf8');
  const presetFilePath = fileURLToPath(new URL('../src/sub-components/ThreeMashCategoryLanding/presets.ts', import.meta.url));
  const presetText = readFileSync(presetFilePath, 'utf8');

  assert.match(categoryText, /if \(kind === "spares"\) return matchesAny\(spareSignals\);/);
  assert.match(categoryText, /const spareSignals = \[/);
  assert.match(presetText, /titlePrefix:\s*tLocalized\("Elektronik, tabla,", "Electronic, tray,"\)/);
  assert.match(presetText, /titleEmphasis:\s*tLocalized\("tank ve film\."/);
});

test('English route aliases cover scanner and wash-cure product/category links', () => {
  const filePath = fileURLToPath(new URL('../src/utils/i18n.ts', import.meta.url));
  const fileText = readFileSync(filePath, 'utf8');

  assert.match(fileText, /"\/mash-w1e-ultrasonik-yikama-cihazi": "\/mash-w1e-ultrasonic-washing-device"/);
  assert.match(fileText, /"\/mash-c1e-uv-kurleme-cihazi": "\/mash-c1e-smart-uv-curing-device"/);
  assert.match(fileText, /"\/dental-firinlar": "\/dental-furnaces"/);
  assert.match(fileText, /"\/masasustu-tarayicilar": "\/lab-scanners"/);
  assert.match(fileText, /"\/desktop-scanners": "\/lab-scanners"/);
  assert.match(fileText, /"\/mash-curie-m1-dental-3d-yazici": "\/mash-curie-m1-dental-3d-printer"/);
  assert.match(fileText, /"\/creality-halot-sky-6k": "\/creality-halot-sky-6k-1"/);

  const categoryFilePath = fileURLToPath(new URL('../src/sub-components/ThreeMashCategoryLanding/index.tsx', import.meta.url));
  const categoryText = readFileSync(categoryFilePath, 'utf8');
  assert.match(categoryText, /"lab-scanners": "\/masasustu-tarayicilar"/);
  assert.match(categoryText, /"mash-w1e-ultrasonik-yikama-cihazi": "\/en\/mash-w1e-ultrasonic-washing-device"/);
  assert.match(categoryText, /"mash-c1e-uv-kurleme-cihazi": "\/en\/mash-c1e-smart-uv-curing-device"/);
  assert.match(categoryText, /"mash-curie-m1-dental-3d-yazici": "\/en\/mash-curie-m1-dental-3d-printer"/);
  assert.match(categoryText, /"creality-halot-sky-6k": "\/en\/creality-halot-sky-6k-1"/);
  assert.match(categoryText, /"titanium-discs": "\/titanyum-diskler"/);
  assert.match(categoryText, /"titanyum-diskler": "\/titanyum-diskler"/);
});

test('product detail data does not leak broken English fallback names', () => {
  const detailFile = fileURLToPath(new URL('../src/sub-components/ThreeMashProductDetailData/index.ts', import.meta.url));
  const detailText = readFileSync(detailFile, 'utf8');

  assert.doesNotMatch(detailText, /meta:\s*"Mash Academy · YouTube'da izle"/);
  assert.doesNotMatch(detailText, /whatsappText:\s*"WhatsApp'tan sor"/);
  assert.doesNotMatch(detailText, /addingToCartText:\s*"Ekleniyor\.\.\."/);
  assert.doesNotMatch(detailText, /"Rapport"/);
  assert.doesNotMatch(detailText, /Minimum Max UV/);

  const liveFile = fileURLToPath(new URL('../src/components/ThreeMashProductDetailLive/index.tsx', import.meta.url));
  const liveText = readFileSync(liveFile, 'utf8');
  assert.doesNotMatch(liveText, /whatsappText:\s*"WhatsApp'tan sor"/);
  assert.doesNotMatch(liveText, /addingToCartText:\s*"Ekleniyor\.\.\."/);
  assert.doesNotMatch(liveText, /"Rapport"/);
});

test('recover password success redirects to the account login route instead of home', () => {
  const utilityFile = fileURLToPath(new URL('../src/components/ThreeMashAccountUtilityPage/index.tsx', import.meta.url));
  const utilityText = readFileSync(utilityFile, 'utf8');

  assert.match(utilityText, /Router\.navigate\("\/account\/login"\)/);
  assert.doesNotMatch(utilityText, /Router\.navigateToPage\("LOGIN"\)/);
});

test('forgot-password and recover-password use the public auth page shell instead of the protected account layout', () => {
  const utilityFile = fileURLToPath(new URL('../src/components/ThreeMashAccountUtilityPage/index.tsx', import.meta.url));
  const utilityText = readFileSync(utilityFile, 'utf8');

  assert.match(utilityText, /mode === "forgot-password"|mode === "recover-password"/);
  assert.match(utilityText, /ThreeMashAccountPage/);
  assert.doesNotMatch(utilityText, /return <ThreeMashAccountLayout \{\.\.\.props\} \/>/);
});

test('generic product fallback does not ship template placeholder text', () => {
  const liveFile = fileURLToPath(new URL('../src/components/ThreeMashProductDetailLive/index.tsx', import.meta.url));
  const liveText = readFileSync(liveFile, 'utf8');
  const placeholderFile = fileURLToPath(new URL('../src/sub-components/ThreeMashProductSectionPlaceholder/index.tsx', import.meta.url));
  const placeholderText = readFileSync(placeholderFile, 'utf8');

  assert.doesNotMatch(liveText, /Sample Badge 1/);
  assert.doesNotMatch(liveText, /SECTION LABEL/);
  assert.doesNotMatch(liveText, /Sample Device 1/);
  assert.doesNotMatch(liveText, /1\. Sample question text goes here\?/);
  assert.doesNotMatch(liveText, /The detailed description text for the right side of this section will go here\./);
  assert.doesNotMatch(liveText, /1\. Aksiyon Butonu|2\. Aksiyon Butonu/);
  assert.doesNotMatch(placeholderText, /Sample Badge 1|Sample Device 1|CARD LABEL 2|1\. Card Title|1\. Aksiyon Butonu/);
});
