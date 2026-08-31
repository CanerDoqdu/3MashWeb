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
  // If has distinct Turkish characters
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
    'referans', 'arama', 'kapat', 'market', 'detay', 'gonder', 'gönder',
    'tamamla', 'incele', 'kesfet', 'keşfet', 'adet', 'fiyat', 'sepete', 'ekle',
    'odeme', 'ödeme', 'kargo', 'teslimat', 'iade', 'iletisim', 'iletişim', 'mesaj',
    'adiniz', 'soyadiniz', 'eposta', 'telefon', 'konu', 'gorus', 'oneri', 'yorum',
    'puan', 'filtre', 'sirala', 'kategori', 'marka', 'stok', 'tukenmis', 'tukendi',
    'yeni', 'indirim', 'kampanya', 'ozellikler', 'teknik', 'dokuman', 'kullanim',
    'klavuz', 'rehber', 'destek', 'yardim', 'hizmet', 'hakkinda', 'biz', 'kimiz',
    'vizyon', 'misyon', 'degerler', 'ekip', 'kariyer', 'haberler', 'duyurular',
    'blog', 'yazi', 'makale', 'video', 'galeri', 'fotograf', 'resim', 'dosya',
    'indir', 'yukle', 'guncelle', 'duzenle', 'sil', 'vazgec', 'kaydet', 'onayla'
  ]);
  return words.some(w => trKeywords.has(w));
}

function isInsideLocalizationCall(node) {
  let curr = node.parent;
  while (curr) {
    if (ts.isCallExpression(curr)) {
      const exprText = curr.expression.getText();
      if (
        exprText === 'tLocalized' ||
        exprText === 'tProp' ||
        exprText === 't' ||
        exprText === 'tLocalizedFormat' ||
        exprText === 'localizedHref' ||
        exprText === 'isTurkishText' ||
        exprText === 'cleanText'
      ) {
        return true;
      }
    }
    if (ts.isImportDeclaration(curr) || ts.isExportDeclaration(curr)) {
      return true;
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
      'href', 'src', 'to', 'target', 'rel', 'fill', 'stroke', 'viewBox', 'xmlns',
      'd', 'data-id', 'data-key', 'data-index', 'role', 'aria-hidden'
    ]);
    if (ignoredAttrs.has(attrName)) return true;
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
const files = getAllFiles(path.join(rootDir, 'src'));

const resultsByFile = {};
let totalHardcoded = 0;

for (const filePath of files) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  if (relPath === 'src/utils/i18n.ts') continue;

  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const fileStrings = [];

  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text;
      if (text && isTurkishText(text)) {
        if (!isInsideLocalizationCall(node) && !isIgnoredJsxAttribute(node)) {
          if (node.parent && ts.isPropertyAssignment(node.parent) && node.parent.name === node) {
            // key of property assignment
          } else {
            const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
            fileStrings.push({
              text: text,
              line: line + 1,
              col: character + 1,
              type: 'string_literal'
            });
          }
        }
      }
    } else if (ts.isJsxText(node)) {
      const text = node.text.trim();
      if (text && isTurkishText(text)) {
        if (!isInsideLocalizationCall(node)) {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
          fileStrings.push({
            text: text,
            line: line + 1,
            col: character + 1,
            type: 'jsx_text'
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (fileStrings.length > 0) {
    resultsByFile[relPath] = fileStrings;
    totalHardcoded += fileStrings.length;
  }
}

const sortedFiles = Object.entries(resultsByFile).sort((a, b) => b[1].length - a[1].length);

fs.writeFileSync(
  path.join(rootDir, 'scripts', 'inventory_result.json'),
  JSON.stringify({ totalHardcoded, fileCount: sortedFiles.length, files: resultsByFile, sortedFiles: sortedFiles.map(([f, items]) => ({ file: f, count: items.length, items })) }, null, 2)
);

console.log('=== SUMMARY ===');
console.log('Files with hardcoded Turkish strings:', sortedFiles.length);
console.log('Total hardcoded Turkish strings:', totalHardcoded);
console.log('\nTop 15 files:');
sortedFiles.slice(0, 15).forEach(([f, list], i) => {
  console.log((i + 1) + '. ' + f + ': ' + list.length);
});
console.log('\nAll files:');
sortedFiles.forEach(([f, list], i) => {
  console.log((i + 1) + '. ' + f + ' (' + list.length + ')');
});
