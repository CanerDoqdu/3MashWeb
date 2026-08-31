const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function cleanText(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
    .toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[–—]/g, '-');
}

function isTurkishText(text) {
  if (!text || typeof text !== 'string') return false;
  if (/[ışğüöçİŞĞÜÖÇ]/.test(text)) return true;
  const clean = cleanText(text);
  const words = clean.split(/[^a-z0-9]+/);
  const trKeywords = new Set([
    'bir', 'bu', 've', 'veya', 'ile', 'icin', 'için', 'her', 'neden', 'nasil',
    'nasıl', 'sebebi', 'kaynagi', 'kaynağı', 'yaygin', 'yaygın', 'katina',
    'katına', 'cikabilir', 'çıkabilir', 'edildiginde', 'edildiğinde', 'birlikte',
    'bagli', 'bağlı', 'oturan', 'isler', 'işler', 'aciklama', 'açıklama',
    'basligi', 'başlığı', 'urunler', 'ürünler', 'urun', 'ürün', 'hakkimizda',
    'hakkımızda', 'bilgi', 'adres', 'siparis', 'sipariş', 'kurleme', 'kürleme',
    'yikama', 'yıkama', 'sepet', 'hesabim', 'hesabım', 'giris', 'giriş',
    'kayit', 'kayıt', 'sifre', 'şifre', 'tekrar', 'kayip', 'kayıp', 'tasarruf',
    'hesapla', 'ornek', 'örnek', 'cozum', 'çözüm', 'uretim', 'üretim', 'dayanim',
    'dayanım', 'dogruluk', 'doğruluk', 'salinimi', 'salınımı', 'faturasi', 'faturası',
    'turkiye', 'türkiye', 'bizimle', 'uretiyor', 'üretiyor', 'sorulanlar',
    'azaltalim', 'azaltalım', 'dayanak', 'bilimsel', 'sebep', 'baski', 'baskı',
    'akademi', 'egitim', 'egitimi', 'etkinlik', 'amacimiz', 'amacımız'
  ]);
  return words.some(w => trKeywords.has(w));
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

function isIgnoredJsxAttribute(node) {
  if (node.parent && ts.isJsxAttribute(node.parent)) {
    const attrName = node.parent.name.getText();
    const ignoredAttrs = new Set([
      'className', 'id', 'style', 'width', 'height', 'type', 'name', 'key',
      'href', 'src', 'to', 'target', 'rel', 'fill', 'stroke', 'viewBox',
      'xmlns', 'd', 'data-id', 'data-key', 'data-index', 'role', 'aria-hidden',
      'data-section', 'data-value', 'placeholder'
    ]);
    if (ignoredAttrs.has(attrName)) return true;
  }
  return false;
}

function isObjectPropertyKey(node) {
  if (node.parent && ts.isPropertyAssignment(node.parent)) {
    const nameNode = node.parent.name;
    return nameNode.getStart() === node.getStart() && nameNode.getEnd() === node.getEnd();
  }
  return false;
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

const rootDir = process.cwd();
const files = getAllFiles(path.join(rootDir, 'src')).filter(f => !f.includes('assets') && !f.endsWith('i18n.ts') && !f.includes('locales'));

const untranslated = [];

for (const filePath of files) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text;
      if (text && isTurkishText(text)) {
        if (!isInsideLocalizationCall(node) && !isIgnoredJsxAttribute(node) && !isObjectPropertyKey(node)) {
          if (text.startsWith('/') || text.startsWith('#') || /^[a-z0-9-]+$/.test(text)) {
            // slug or path
          } else {
            const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
            untranslated.push({ file: relPath, line: line + 1, text: text.trim() });
          }
        }
      }
    } else if (ts.isJsxText(node)) {
      const text = node.text.trim();
      if (text && isTurkishText(text) && !isInsideLocalizationCall(node)) {
        const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        untranslated.push({ file: relPath, line: line + 1, text: text });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
}

console.log('=== UNTRANSLATED USER-FACING TEXTS ===');
console.log('Total count:', untranslated.length);
untranslated.forEach((item, i) => {
  console.log(`\n[${i+1}] ${item.file}:${item.line}`);
  console.log(item.text.length > 200 ? item.text.slice(0, 200) + '...' : item.text);
});
