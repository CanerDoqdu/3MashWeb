import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Scenario 1: No editor value set -> sensible default size (no hardcoded/empty CSS vars)', () => {
  const css = fs.readFileSync('dist/2tplvqpo-WhqzboWYcS/styles.css', 'utf8');
  assert.ok(
    css.includes('width: var(--tmr-curing-image-width, auto);'),
    'CSS should fall back to auto width when prop is unset'
  );
  assert.ok(
    css.includes('height: var(--tmr-curing-image-height, auto);'),
    'CSS should fall back to auto height when prop is unset'
  );
  assert.ok(
    css.includes('max-width: var(--tmr-curing-image-max-width, 82%);'),
    'CSS should default to max-width: 82% when unset'
  );
  assert.ok(
    css.includes('max-height: var(--tmr-curing-image-max-height, 210px);'),
    'CSS should default to max-height: 210px when unset'
  );

  // Check the compiled theme style function in server.js
  const js = fs.readFileSync('dist/2tplvqpo-WhqzboWYcS/server.js', 'utf8');
  assert.ok(
    js.includes('...i?{"--tmr-curing-image-width":i,"--tmr-curing-image-max-width":"100%"}:{}'),
    'Compiled JS should conditionally spread width var only when defined'
  );
  assert.ok(
    js.includes('...a?{"--tmr-curing-image-height":a,"--tmr-curing-image-max-height":"100%"}:{}'),
    'Compiled JS should conditionally spread height var only when defined'
  );
});

test('Scenario 2 & 3: Component style output with unset, set, and changed editor props', () => {
  const js = fs.readFileSync('dist/2tplvqpo-WhqzboWYcS/server.js', 'utf8');
  const styleIdx = js.indexOf('"--tmr-curing-background"');
  const funcStart = js.lastIndexOf('function ', styleIdx);
  // Find the closing brace of the theme style function
  let depth = 0;
  let funcEnd = -1;
  for (let i = funcStart; i < js.length; i++) {
    if (js[i] === '{') depth++;
    else if (js[i] === '}') {
      depth--;
      if (depth === 0) {
        funcEnd = i + 1;
        break;
      }
    }
  }
  const funcCode = js.slice(funcStart, funcEnd);
  // Also extract helper dependencies `ge` (parseOptionalDimension) and `r` (raw)
  // `let i=ge(r(e,"productImageWidth"),48,560)`
  const matchGe = funcCode.match(/let\s+i=([a-zA-Z0-9_]+)\(([a-zA-Z0-9_]+)\(e,/);
  assert.ok(matchGe, 'Should find dimension parser and raw helper names');
  const [, geName, rName] = matchGe;

  // Locate `ge` definition
  const geStart = js.lastIndexOf('function ' + geName + '(', funcStart);
  let geDepth = 0;
  let geEnd = -1;
  for (let i = geStart; i < js.length; i++) {
    if (js[i] === '{') geDepth++;
    else if (js[i] === '}') {
      geDepth--;
      if (geDepth === 0) {
        geEnd = i + 1;
        break;
      }
    }
  }
  const geCode = js.slice(geStart, geEnd);

  // Evaluate the compiled functions in an isolated context
  const factory = new Function(`
    ${geCode}
    function ${rName}(props, key) { return props ? props[key] : undefined; }
    function o(val, def, min, max) { return typeof val === 'number' ? val : def; }
    function percentage() { return '100%'; }
    function m() { return '100%'; }
    function imageFit(v) { return v || 'contain'; }
    function P(v) { return v || 'contain'; }
    function H(v) { return v || 'contain'; }
    return ${funcCode};
  `);
  const threeMashThemeStyle = factory();

  // Test Scenario 1: No editor value set
  const styleDefault = threeMashThemeStyle({});
  assert.equal(
    styleDefault['--tmr-curing-image-width'],
    undefined,
    '--tmr-curing-image-width must not exist when prop is empty'
  );
  assert.equal(
    '--tmr-curing-image-width' in styleDefault,
    false,
    '--tmr-curing-image-width key must not be present in object'
  );
  assert.equal(
    styleDefault['--tmr-curing-image-height'],
    undefined,
    '--tmr-curing-image-height must not exist when prop is empty'
  );
  assert.equal(
    '--tmr-curing-image-height' in styleDefault,
    false,
    '--tmr-curing-image-height key must not be present in object'
  );

  // Test Scenario 2: Editor value explicitly set to specific width/height
  const styleSet = threeMashThemeStyle({
    productImageWidth: 280,
    productImageHeight: 190,
  });
  assert.equal(
    styleSet['--tmr-curing-image-width'],
    '280px',
    'Explicit width must be respected'
  );
  assert.equal(
    styleSet['--tmr-curing-image-height'],
    '190px',
    'Explicit height must be respected'
  );
  assert.equal(
    styleSet['--tmr-curing-image-max-width'],
    '100%',
    'Max width constraint must be relaxed to 100% when explicit width is set'
  );
  assert.equal(
    styleSet['--tmr-curing-image-max-height'],
    '100%',
    'Max height constraint must be relaxed to 100% when explicit height is set'
  );

  // Test Scenario 3: Editor value changed to a different size
  const styleUpdated = threeMashThemeStyle({
    productImageWidth: 350,
    productImageHeight: 240,
  });
  assert.equal(
    styleUpdated['--tmr-curing-image-width'],
    '350px',
    'Updated width must be respected'
  );
  assert.equal(
    styleUpdated['--tmr-curing-image-height'],
    '240px',
    'Updated height must be respected'
  );

  // Test Scenario 3b: Props cleared / set to null/undefined
  const styleCleared = threeMashThemeStyle({
    productImageWidth: null,
    productImageHeight: undefined,
  });
  assert.equal(
    '--tmr-curing-image-width' in styleCleared,
    false,
    'Clearing props removes width variable'
  );
  assert.equal(
    '--tmr-curing-image-height' in styleCleared,
    false,
    'Clearing props removes height variable'
  );
});

test('Scenario 4: Shrinking with small (60), very small (25), and negative (-50) values', () => {
  const js = fs.readFileSync('dist/2tplvqpo-WhqzboWYcS/server.js', 'utf8');
  const styleIdx = js.indexOf('"--tmr-curing-background"');
  const funcStart = js.lastIndexOf('function ', styleIdx);
  let depth = 0;
  let funcEnd = -1;
  for (let i = funcStart; i < js.length; i++) {
    if (js[i] === '{') depth++;
    else if (js[i] === '}') {
      depth--;
      if (depth === 0) {
        funcEnd = i + 1;
        break;
      }
    }
  }
  const funcCode = js.slice(funcStart, funcEnd);
  const matchGe = funcCode.match(/let\s+i=([a-zA-Z0-9_]+)\(([a-zA-Z0-9_]+)\(e,/);
  const [, geName, rName] = matchGe;

  const geStart = js.lastIndexOf('function ' + geName + '(', funcStart);
  let geDepth = 0;
  let geEnd = -1;
  for (let i = geStart; i < js.length; i++) {
    if (js[i] === '{') geDepth++;
    else if (js[i] === '}') {
      geDepth--;
      if (geDepth === 0) {
        geEnd = i + 1;
        break;
      }
    }
  }
  const geCode = js.slice(geStart, geEnd);

  const factory = new Function(`
    ${geCode}
    function ${rName}(props, key) { return props ? props[key] : undefined; }
    function o(val, def, min, max) { return typeof val === 'number' ? val : def; }
    function percentage() { return '100%'; }
    function m() { return '100%'; }
    function imageFit(v) { return v || 'contain'; }
    function P(v) { return v || 'contain'; }
    function H(v) { return v || 'contain'; }
    return ${funcCode};
  `);
  const threeMashThemeStyle = factory();

  // Test small value (60)
  const style60 = threeMashThemeStyle({ productImageWidth: 60, productImageHeight: 60 });
  assert.equal(style60['--tmr-curing-image-width'], '60px', 'Value 60 must produce 60px');
  assert.equal(style60['--tmr-curing-image-height'], '60px', 'Value 60 must produce 60px');

  // Test very small value (25)
  const style25 = threeMashThemeStyle({ productImageWidth: 25, productImageHeight: 25 });
  assert.equal(style25['--tmr-curing-image-width'], '25px', 'Value 25 must produce 25px (not clamped to 48px)');
  assert.equal(style25['--tmr-curing-image-height'], '25px', 'Value 25 must produce 25px (not clamped to 48px)');

  // Test negative value (-50) -> clamps to 20px min, does NOT discard/fallback to default
  const styleNeg = threeMashThemeStyle({ productImageWidth: -50, productImageHeight: -50 });
  assert.equal(styleNeg['--tmr-curing-image-width'], '20px', 'Negative value -50 must clamp to 20px min, not unset');
  assert.equal(styleNeg['--tmr-curing-image-height'], '20px', 'Negative value -50 must clamp to 20px min, not unset');

  // Test zero (0) -> clamps to 20px min
  const styleZero = threeMashThemeStyle({ productImageWidth: 0, productImageHeight: 0 });
  assert.equal(styleZero['--tmr-curing-image-width'], '20px', 'Zero must clamp to 20px min');
  assert.equal(styleZero['--tmr-curing-image-height'], '20px', 'Zero must clamp to 20px min');
});

