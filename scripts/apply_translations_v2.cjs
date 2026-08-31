/**
 * apply_translations_v2.cjs
 *
 * Full AST dictionary injector:
 * Reads all project dictionaries (to_translate.json, all_translations.json, hardcoded map)
 * and scans ALL source files in src/ for any matching UI string or JSX text.
 * Runs 100% locally on Node.js with 0 API tokens.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const rootDir = process.cwd();

// ── 1. Build Master Dictionary ─────────────────────────────────────────────

const masterDict = new Map();

function addDict(obj) {
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && v.trim() !== '' && typeof k === 'string' && k.trim() !== '') {
      const keyTrimmed = k.trim();
      const valTrimmed = v.trim();
      if (!masterDict.has(keyTrimmed)) {
        masterDict.set(keyTrimmed, valTrimmed);
      }
    }
  }
}

// Load all translation sources
try {
  addDict(JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts', 'to_translate.json'), 'utf8')));
} catch {}

try {
  addDict(JSON.parse(fs.readFileSync(path.join(rootDir, 'src', 'utils', 'all_translations.json'), 'utf8')));
} catch {}

// Add specific UI & comparison table translations
const extraTranslations = {
  // Comparison table & Specs
  "Termal kontrol": "Thermal control",
  "Kalibrasyon": "Calibration",
  "8 nokta dikey kilit · aylarca stabil": "8-point vertical lock · stable for months",
  "6 aya kadar gerekmez": "Not required for up to 6 months",
  "Gizli lisans / RFID": "Hidden license / RFID",
  "Yok": "None",
  "En uygun": "Best suited for",
  "±20 µm tekrarlanabilir": "±20 µm repeatable",
  "Yerli optik sistem": "Domestic optical system",
  "14 dk'da temporary crown": "Temporary crown in 14 min",
  "Standart": "Standard",
  "Detay odaklı": "Detail-focused",
  "Entegre ısıtma (25/30°C)": "Integrated heating (25/30°C)",
  "Yüksek hacim, hız, düşük TCO": "High volume, speed, low TCO",
  "Dijitale ekonomik giriş": "An economical entry into digital",
  "Hassasiyet & keskin kole gerektiren işler": "Work requiring detail & sharp margins",
  
  // Headings & Eyebrows
  "385 nm mi, 405 nm mi? Fark ne?": "385 nm or 405 nm? What's the difference?",
  "Endikasyon": "Indication",
  "ENDİKASYON": "INDICATION",
  "Hangi vakalarda?": "In what cases?",
  "Neler kontrol edilir?": "What is checked?",
  "Uyumlu Sistemler": "Compatible Systems",
  "UYUMLU SİSTEMLER": "COMPATIBLE SYSTEMS",
  "Laboratuvar Ekosistemi": "Laboratory Ecosystem",
  "LABORATUVAR EKOSİSTEMİ": "LABORATORY ECOSYSTEM",
  "Üretim Ekosistemi": "Production Ecosystem",
  "ÜRETİM EKOSİSTEMİ": "PRODUCTION ECOSYSTEM",
  "Kritik Son Adım": "Critical Final Step",
  "KRİTİK SON ADIM": "CRITICAL FINAL STEP",
  "Uçtan Uca": "End to End",
  "UÇTAN UCA": "END TO END",
  "Referanslar": "References",
  "REFERANSLAR": "REFERENCES",
  "Sık Sorulanlar": "Frequently Asked Questions",
  "SIK SORULANLAR": "FREQUENTLY ASKED QUESTIONS",
  "Ölçüsel hassasiyet.": "Dimensional accuracy.",
  "ÖLÇÜSEL HASSASİYET": "DIMENSIONAL ACCURACY",
  "Sorunun kaynağı": "Root of the problem",
  "SORUNUN KAYNAĞI": "ROOT OF THE PROBLEM",
  "Kaybın görünmeyen sebebi:": "The unseen cause of loss:",
  "Hassasiyet cihazdan çıkmaz; uyumdan çıkar.": "Precision doesn't come from the device; it comes from harmony.",
  "Sadece yazıcı değil. Sonucu kürleme tamamlar.": "Not just the printer. Curing completes the result.",
  "Türkiye'nin en büyük lab'ları neden bizimle üretiyor?": "Why do leading labs produce with us?",
  "Bu görünmez kaybı birlikte azaltalım.": "Let's reduce this invisible loss together.",
  "Kısa, net cevaplar.": "Short, clear answers."
};

addDict(extraTranslations);

console.log(`Loaded ${masterDict.size} total translation pairs in master dictionary`);

// ── 2. Helper Guards ───────────────────────────────────────────────────────

function escapeForJsString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
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
  if (node.parent && ts.isPropertyAssignment(node.parent)) {
    const nameNode = node.parent.name;
    return nameNode.getStart() === node.getStart() && nameNode.getEnd() === node.getEnd();
  }
  if (node.parent && ts.isComputedPropertyName(node.parent)) return true;
  return false;
}

function isTypeContext(node) {
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
      'data-section', 'data-value'
    ]);
    if (ignoredAttrs.has(attrName)) return true;
  }
  return false;
}

function hasImport(sourceText) {
  return sourceText.includes('tLocalized') &&
    (sourceText.includes('from "../utils/i18n"') ||
     sourceText.includes("from '../utils/i18n'") ||
     sourceText.includes('from "../../utils/i18n"') ||
     sourceText.includes("from '../../utils/i18n'") ||
     sourceText.includes('from "../../../utils/i18n"') ||
     sourceText.includes("from '../../../utils/i18n'"));
}

function findI18nImportPath(fileRelPath) {
  const depth = fileRelPath.split('/').length - 2;
  const prefix = '../'.repeat(depth) || './';
  return prefix + 'utils/i18n';
}

function getAllFiles(dir, exts = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── 3. Scan & Transform ────────────────────────────────────────────────────

const allSourceFiles = getAllFiles(path.join(rootDir, 'src'))
  .filter(f => !f.includes('assets') && !f.endsWith('i18n.ts') && !f.includes('locales') && !f.includes('types.ts'));

let totalModified = 0;
let totalReplaced = 0;

for (const filePath of allSourceFiles) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  let source = fs.readFileSync(filePath, 'utf8');
  const originalSource = source;

  const replacements = [];
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

  function visit(node) {
    // String Literal
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text.trim();
      if (text && masterDict.has(text)) {
        if (!isInsideLocalizationCall(node) && !isIgnoredJsxAttribute(node) && !isObjectPropertyKey(node) && !isTypeContext(node)) {
          if (!text.startsWith('/') && !text.startsWith('#') && !/^[a-z0-9-]+$/.test(text)) {
            const translation = masterDict.get(text);
            const start = node.getStart();
            const end = node.getEnd();
            const inJsxAttr = node.parent && ts.isJsxAttribute(node.parent);

            const trEscaped = escapeForJsString(text);
            const enEscaped = escapeForJsString(translation);

            if (inJsxAttr) {
              replacements.push({
                start,
                end,
                replacement: `{tLocalized("${trEscaped}", "${enEscaped}")}`
              });
            } else {
              replacements.push({
                start,
                end,
                replacement: `tLocalized("${trEscaped}", "${enEscaped}")`
              });
            }
          }
        }
      }
    }
    // JSX Text
    else if (ts.isJsxText(node)) {
      const text = node.text.trim();
      if (text && masterDict.has(text)) {
        if (!isInsideLocalizationCall(node)) {
          const translation = masterDict.get(text);
          const start = node.getStart();
          const end = node.getEnd();

          const rawText = source.substring(start, end);
          const leadingWs = rawText.match(/^(\s*)/)[1];
          const trailingWs = rawText.match(/(\s*)$/)[1];

          const trEscaped = escapeForJsString(text);
          const enEscaped = escapeForJsString(translation);

          replacements.push({
            start,
            end,
            replacement: `${leadingWs}{tLocalized("${trEscaped}", "${enEscaped}")}${trailingWs}`
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (replacements.length === 0) continue;

  replacements.sort((a, b) => b.start - a.start);

  for (const rep of replacements) {
    source = source.substring(0, rep.start) + rep.replacement + source.substring(rep.end);
  }

  if (source.includes('tLocalized(') && !hasImport(source)) {
    const i18nPath = findI18nImportPath(relPath);
    const importLine = `import { tLocalized } from "${i18nPath}";\n`;
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
    console.log(`✅ ${relPath} (+${replacements.length} translations)`);
    totalModified++;
    totalReplaced += replacements.length;
  }
}

console.log(`\n🎉 Completed!`);
console.log(`   Files updated: ${totalModified}`);
console.log(`   Total new translations injected: ${totalReplaced}`);
