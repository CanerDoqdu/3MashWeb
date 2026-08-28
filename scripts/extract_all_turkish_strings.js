const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const turkishCharRegex = /[çÇğĞıİöÖşŞüÜâÂîÎ]/;
const turkishWords = [
  've', 'ile', 'için', 'bir', 'bu', 'her', 'olan', 'olarak', 'daha', 'çok', 'en', 'gibi',
  'sepet', 'ürün', 'ürünler', 'fiyat', 'satın', 'al', 'ekle', 'giriş', 'kayıt', 'hesap',
  'sipariş', 'adres', 'ödeme', 'kargo', 'teslimat', 'iade', 'garanti', 'iletişim', 'hakkımızda',
  'yardım', 'destek', 'ara', 'arama', 'filtre', 'sırala', 'kategori', 'kategoriler',
  'baskı', 'yazıcı', 'reçine', 'kürleme', 'yıkama', 'ölçüsel', 'hassasiyet', 'laboratuvar',
  'klinik', 'diş', 'hekimliği', 'üretim', 'ekosistem', 'referanslar', 'yorumlar', 'özellikler',
  'detay', 'incele', 'keşfet', 'danış', 'ücretsiz', 'koltuk', 'kayıp', 'maliyet', 'kazanç'
];

function isTurkishString(str) {
  if (typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (trimmed.length < 2) return false;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('#')) return false;
  if (/^[a-zA-Z0-9_\-\.\:\/]+$/.test(trimmed) && !turkishWords.some(w => trimmed.toLowerCase().split(/\s+/).includes(w))) return false;
  
  if (turkishCharRegex.test(trimmed)) return true;
  
  const words = trimmed.toLowerCase().split(/[\s,.\-—–:;!?"'()<>{}\[\]\/]+/);
  return words.some(w => turkishWords.includes(w));
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const results = [];

  // Match JSX text: >Text<
  const jsxTextMatches = content.matchAll(/>([^<>{}\n]+)</g);
  for (const m of jsxTextMatches) {
    const text = m[1].trim();
    if (isTurkishString(text)) {
      results.push({ type: 'jsx_text', text, file: filePath });
    }
  }

  // Match string literals in single/double quotes or template literals
  const stringLiteralMatches = content.matchAll(/(["'`])((?:\\.|(?!\1)[^\\])*)\1/g);
  for (const m of stringLiteralMatches) {
    const text = m[2].trim();
    if (text.length > 2 && isTurkishString(text)) {
      // Ignore imports, CSS class names, etc.
      if (!text.includes('from ') && !text.startsWith('tm-') && !text.startsWith('tmr-') && !text.startsWith('tmhero-')) {
        results.push({ type: 'string_literal', text, file: filePath });
      }
    }
  }

  return results;
}

function walkDir(dir) {
  let allResults = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      allResults = allResults.concat(walkDir(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      allResults = allResults.concat(scanFile(fullPath));
    }
  }
  return allResults;
}

const found = walkDir(srcDir);
const uniqueMap = new Map();

for (const item of found) {
  const clean = item.text.replace(/\s+/g, ' ').trim();
  if (!uniqueMap.has(clean)) {
    uniqueMap.set(clean, [item.file]);
  } else {
    uniqueMap.get(clean).push(item.file);
  }
}

console.log(`Scanned src/ - Found ${uniqueMap.size} unique Turkish strings across ${found.length} occurrences.`);

const outputPath = path.join(__dirname, 'extracted_turkish_strings.json');
const outputObj = {};
for (const [str, files] of uniqueMap.entries()) {
  outputObj[str] = {
    count: files.length,
    files: [...new Set(files.map(f => path.relative(srcDir, f)))]
  };
}

fs.writeFileSync(outputPath, JSON.stringify(outputObj, null, 2), 'utf-8');
console.log(`Saved extracted strings to ${outputPath}`);
