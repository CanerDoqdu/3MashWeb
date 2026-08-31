/**
 * apply_translations.cjs
 *
 * AST-based codemod: reads to_translate.json and injects
 * tLocalized("tr", "en") calls into all .ts/.tsx files that
 * contain hardcoded Turkish strings.
 *
 * Strategy:
 *   - For each file in inventory_result.json
 *   - Parse with TypeScript compiler API (preserves all formatting)
 *   - Walk AST, find matching string literals & JSX text nodes
 *   - Replace with tLocalized(original, translation)
 *   - Add import if missing
 *   - Write back
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const rootDir = process.cwd();

// ── Load data ──────────────────────────────────────────────────────────────

const translations = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'scripts', 'to_translate.json'), 'utf8')
);

const inventory = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'scripts', 'inventory_result.json'), 'utf8')
);

// Build a fast lookup: trimmed turkish string -> english translation
// Only include entries that have a non-empty translation
const trToEn = new Map();
for (const [tr, en] of Object.entries(translations)) {
  if (en && en.trim() !== '') {
    trToEn.set(tr.trim(), en.trim());
  }
}

console.log(`Loaded ${trToEn.size} translations`);

// ── Helpers ────────────────────────────────────────────────────────────────

function escapeForJsString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

function escapeForJsxAttr(str) {
  // In JSX attribute strings (double-quoted), escape quotes
  return str.replace(/\\/g, '\\\\').replace(/"/g, '&quot;');
}

function isInsideLocalizationCall(node) {
  let curr = node.parent;
  while (curr) {
    if (ts.isCallExpression(curr)) {
      const exprText = curr.expression.getText();
      if (['tLocalized', 'tProp', 't', 'tLocalizedFormat', 'localizedHref', 'isTurkishText', 'cleanText', 'translateText'].includes(exprText)) {
        return true;
      }
    }
    if (ts.isImportDeclaration(curr) || ts.isExportDeclaration(curr)) return true;
    curr = curr.parent;
  }
  return false;
}

function isObjectPropertyKey(node) {
  // Check by position: if this node's start matches the property name's start
  if (node.parent && ts.isPropertyAssignment(node.parent)) {
    const nameNode = node.parent.name;
    if (nameNode.getStart() === node.getStart() && nameNode.getEnd() === node.getEnd()) {
      return true;
    }
  }
  if (node.parent && ts.isComputedPropertyName(node.parent)) return true;
  return false;
}

function isTypeContext(node) {
  // Walk up the AST — if we find any type node ancestor, this string is in a type position
  let curr = node.parent;
  while (curr) {
    const kind = curr.kind;
    if (
      kind === ts.SyntaxKind.LiteralType ||
      kind === ts.SyntaxKind.UnionType ||
      kind === ts.SyntaxKind.IntersectionType ||
      kind === ts.SyntaxKind.TypeLiteral ||
      kind === ts.SyntaxKind.TypeReference ||
      kind === ts.SyntaxKind.PropertySignature ||
      kind === ts.SyntaxKind.IndexSignature ||
      kind === ts.SyntaxKind.TypeAliasDeclaration ||
      kind === ts.SyntaxKind.InterfaceDeclaration ||
      kind === ts.SyntaxKind.TypeParameter ||
      kind === ts.SyntaxKind.TypeAssertionExpression ||
      kind === ts.SyntaxKind.AsExpression ||
      kind === ts.SyntaxKind.TypeQuery
    ) {
      return true;
    }
    // Stop walking if we hit a value-producing node
    if (
      kind === ts.SyntaxKind.FunctionDeclaration ||
      kind === ts.SyntaxKind.ArrowFunction ||
      kind === ts.SyntaxKind.MethodDeclaration ||
      kind === ts.SyntaxKind.VariableStatement ||
      kind === ts.SyntaxKind.ExpressionStatement
    ) {
      break;
    }
    curr = curr.parent;
  }
  return false;
}

function isIgnoredJsxAttribute(node) {
  if (node.parent && ts.isJsxAttribute(node.parent)) {
    const attrName = node.parent.name.getText();
    const ignoredAttrs = new Set([
      'className', 'id', 'style', 'width', 'height', 'type', 'name', 'key',
      'href', 'src', 'to', 'target', 'rel', 'fill', 'stroke', 'viewBox',
      'xmlns', 'd', 'data-id', 'data-key', 'data-index', 'role', 'aria-hidden',
      'data-section', 'data-value', 'placeholder',
    ]);
    if (ignoredAttrs.has(attrName)) return true;
  }
  return false;
}

function hasImport(sourceText, importPath) {
  // Quick check: does the file already import tLocalized from i18n?
  return sourceText.includes('tLocalized') &&
    (sourceText.includes('from "../utils/i18n"') ||
     sourceText.includes("from '../utils/i18n'") ||
     sourceText.includes('from "../../utils/i18n"') ||
     sourceText.includes("from '../../utils/i18n'") ||
     sourceText.includes('from "../../../utils/i18n"') ||
     sourceText.includes("from '../../../utils/i18n'"));
}

function findI18nImportPath(fileRelPath) {
  // Calculate relative path to utils/i18n from this file
  const depth = fileRelPath.split('/').length - 2; // -1 for filename, -1 for src/
  const prefix = '../'.repeat(depth) || './';
  return prefix + 'utils/i18n';
}

// ── Main transform ─────────────────────────────────────────────────────────

let totalFiles = 0;
let totalReplacements = 0;
let skippedFiles = [];

const filesToProcess = Object.keys(inventory.files).filter(f =>
  // Skip i18n itself and pure data/asset files
  f !== 'src/utils/i18n.ts' &&
  !f.startsWith('src/assets/') &&
  !f.includes('all_translations')
);

for (const relPath of filesToProcess) {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ File not found: ${relPath}`);
    continue;
  }

  let source = fs.readFileSync(filePath, 'utf8');
  const originalSource = source;

  // Collect all replacements as {start, end, replacement} sorted by position descending
  const replacements = [];

  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true
  );

  function visit(node) {
    // ── String literals & template literals ──
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text.trim();
      if (!text) { ts.forEachChild(node, visit); return; }

      const translation = trToEn.get(text);
      if (!translation) { ts.forEachChild(node, visit); return; }

      if (isInsideLocalizationCall(node)) { ts.forEachChild(node, visit); return; }
      if (isIgnoredJsxAttribute(node)) { ts.forEachChild(node, visit); return; }
      if (isObjectPropertyKey(node)) { ts.forEachChild(node, visit); return; }
      if (isTypeContext(node)) { ts.forEachChild(node, visit); return; }
      // Skip URL paths and slug-like strings (they should never be translated)
      if (text.startsWith('/') || text.startsWith('#') || /^[a-z0-9-]+$/.test(text)) { ts.forEachChild(node, visit); return; }

      // Get the raw source span of this node (includes quotes)
      const start = node.getStart();
      const end = node.getEnd();

      // Determine context: is this inside a JSX attribute?
      const inJsxAttr = node.parent && ts.isJsxAttribute(node.parent);

      if (inJsxAttr) {
        // JSX attribute: title="Türkçe" -> title={tLocalized("Türkçe", "English")}
        // The attribute value node is a StringLiteral, but we need to replace the whole attribute value
        // Actually we replace just the string literal and wrap with {}
        // We need to check if parent JsxAttribute has initializer = node
        const jsxAttr = node.parent; // JsxAttribute
        // Replace the string value with {tLocalized("tr", "en")}
        const trEscaped = escapeForJsString(text);
        const enEscaped = escapeForJsString(translation);
        replacements.push({
          start,
          end,
          replacement: `{tLocalized("${trEscaped}", "${enEscaped}")}`,
          removeEqualsBefore: false,
          jsxAttrValue: true,
        });
      } else {
        // Normal string literal: replace inline
        const trEscaped = escapeForJsString(text);
        const enEscaped = escapeForJsString(translation);
        replacements.push({
          start,
          end,
          replacement: `tLocalized("${trEscaped}", "${enEscaped}")`,
          jsxAttrValue: false,
        });
      }
    }

    // ── JSX text nodes ──
    else if (ts.isJsxText(node)) {
      const text = node.text.trim();
      if (!text) { ts.forEachChild(node, visit); return; }

      const translation = trToEn.get(text);
      if (!translation) { ts.forEachChild(node, visit); return; }

      if (isInsideLocalizationCall(node)) { ts.forEachChild(node, visit); return; }

      const start = node.getStart();
      const end = node.getEnd();

      // JSX text: replace with {tLocalized("tr", "en")}
      // Preserve surrounding whitespace
      const rawText = source.substring(start, end);
      const leadingWs = rawText.match(/^(\s*)/)[1];
      const trailingWs = rawText.match(/(\s*)$/)[1];

      const trEscaped = escapeForJsString(text);
      const enEscaped = escapeForJsString(translation);
      replacements.push({
        start,
        end,
        replacement: `${leadingWs}{tLocalized("${trEscaped}", "${enEscaped}")}${trailingWs}`,
        jsxAttrValue: false,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (replacements.length === 0) continue;

  // Apply replacements from end to start to preserve positions
  replacements.sort((a, b) => b.start - a.start);

  for (const rep of replacements) {
    source = source.substring(0, rep.start) + rep.replacement + source.substring(rep.end);
  }

  // Add import if needed and tLocalized is now used but not imported
  if (source.includes('tLocalized(') && !hasImport(source, '')) {
    const i18nPath = findI18nImportPath(relPath);
    const importLine = `import { tLocalized } from "${i18nPath}";\n`;
    // Insert after the last existing import
    const lastImportIdx = source.lastIndexOf('\nimport ');
    if (lastImportIdx !== -1) {
      const lineEnd = source.indexOf('\n', lastImportIdx + 1);
      source = source.substring(0, lineEnd + 1) + importLine + source.substring(lineEnd + 1);
    } else {
      source = importLine + source;
    }
  }

  if (source !== originalSource) {
    fs.writeFileSync(filePath, source, 'utf8');
    console.log(`✅ ${relPath} (${replacements.length} replacements)`);
    totalFiles++;
    totalReplacements += replacements.length;
  }
}

console.log(`\n🎉 Done!`);
console.log(`   Files modified: ${totalFiles}`);
console.log(`   Total replacements: ${totalReplacements}`);
if (skippedFiles.length > 0) {
  console.log(`   Skipped: ${skippedFiles.join(', ')}`);
}
