const fs = require('fs');
const html = fs.readFileSync('3MASH-Maliyet-Detay.html', 'utf8');

const checks = [
  { name: 'Klinik & Lab tabs', test: html.includes('data-m="klinik"') && html.includes('data-m="lab"') },
  { name: 'localStorage saveCurrentState function', test: html.includes('saveCurrentState') },
  { name: 'localStorage loadSavedState function', test: html.includes('loadSavedState') },
  { name: 'STORAGE_KEY defined as mash_cost_detail_state', test: html.includes('mash_cost_detail_state') },
  { name: 'Direct sticky .calc child', test: html.includes('<div class="wrap cols">\n  <!-- SOL: hesaplayıcı (sticky) -->\n  <div class="calc">') },
  { name: 'Title line break after neden', test: html.includes('Bir tekrarın gerçek maliyeti neden<br><span class="em">~500 dolar?</span>') },
  { name: 'No design concept note bar', test: !html.includes('TASARIM KONSEPTİ') },
  { name: 'Research card tag margin and layout', test: html.includes('display:inline-block;margin-bottom:12px') },
];

console.log('\n--- 3MASH-Maliyet-Detay.html Persistence & Layout Validation ---');
let allPassed = true;
checks.forEach(c => {
  console.log(`${c.test ? '✅ PASS' : '❌ FAIL'}: ${c.name}`);
  if (!c.test) allPassed = false;
});

if (allPassed) {
  console.log('\nAll persistence & layout checks passed successfully!');
} else {
  process.exit(1);
}
