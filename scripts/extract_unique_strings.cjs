const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const inventoryPath = path.join(rootDir, 'scripts', 'inventory_result.json');
const outputPath = path.join(rootDir, 'scripts', 'to_translate.json');

const data = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
const uniqueStrings = new Set();

function shouldInclude(str) {
  const s = str.trim();
  // Skip empty
  if (!s) return false;
  // Skip base64 data URIs
  if (s.startsWith('data:image') || s.startsWith('data:video') || s.startsWith('data:audio')) return false;
  // Skip strings with HTML tags (these are HTML blobs, not plain text)
  if (/<[a-zA-Z][^>]*>/.test(s)) return false;
  // Skip very long strings (over 400 chars — not realistically translatable as a unit)
  if (s.length > 400) return false;
  // Skip URL-like strings
  if (/^https?:\/\//.test(s)) return false;
  return true;
}

for (const file in data.files) {
  data.files[file].forEach(item => {
    const str = item.text.trim();
    if (shouldInclude(str)) {
      uniqueStrings.add(str);
    }
  });
}

const translationDict = {};
for (const str of Array.from(uniqueStrings).sort()) {
  translationDict[str] = "";
}

fs.writeFileSync(outputPath, JSON.stringify(translationDict, null, 2));

console.log(`Extracted ${uniqueStrings.size} unique strings to ${outputPath}`);
