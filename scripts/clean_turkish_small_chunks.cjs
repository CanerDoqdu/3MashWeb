const { execSync } = require('child_process');
const fs = require('fs');

function cleanText(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim()
    .toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ı/g,'i').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ü/g,'u')
    .replace(/ö/g,'o').replace(/ç/g,'c').replace(/[–—]/g,'-');
}

function isTurkishText(text) {
  if (!text) return false;
  if (/[ışğüöçİŞĞÜÖÇ]/.test(text)) return true;
  const c = cleanText(text);
  const trKeywords = [
    'bir','bu','ve','veya','ile','icin','her','neden','nasil','sebebi','kaynagi','yaygin',
    'katina','cikabilir','edildiginde','birlikte','bagli','oturan','isler','aciklama',
    'basligi','urunler','urun','hakkimizda','bilgi','adres','siparis','kurleme','yikama',
    'sepet','hesabim','giris','kayit','sifre','tekrar','kayip','tasarruf','hesapla',
    'ornek','cozum','uretim','dayanim','dogruluk','salinimi','faturasi','turkiye',
    'bizimle','uretiyor','sorulanlar','azaltalim','dayanak','bilimsel','sebep','baski',
    'referans','arama','kapat','market','detay','gonder','tamamla','incele','kesfet'
  ];
  return trKeywords.some(w => c.includes(w));
}

const SKIP_PROPS = /href|url|icon|svg|image|img|logo|src|class|style|regex|queryparam|param|port|email|phone|mode|align|spacing|fontsize|color|weight|^id$/i;
function shouldSkipProp(propName) { return SKIP_PROPS.test(propName); }

// Pages that failed due to command line too long — use small individual section batches
const FAILED_PAGES = [
  { id: 'nuIVnqUAqT', name: 'Home' },
  { id: 'placeholder_not_found', name: 'Not Found' },  // will get real IDs below
  { id: 'VjVLsheQ4c', name: 'FAQ' },
  { id: 'placeholder_iletisim', name: 'iletişim' },
];

function getPageIds() {
  const pagesRaw = execSync('npx ikas-component list-pages', { encoding: 'utf8' });
  return JSON.parse(pagesRaw).pages || [];
}

function updateSingleSection(pageId, elementId, updates) {
  // Split updates into small chunks of 5 per API call to avoid command line length limit
  const CHUNK = 5;
  let cleared = 0;
  for (let i = 0; i < updates.length; i += CHUNK) {
    const chunk = updates.slice(i, i + CHUNK);
    const sectionsJson = JSON.stringify([{ elementId, updates: chunk }]);
    try {
      const result = execSync(
        `npx ikas-component update-page-sections --page-id ${pageId} --sections ${JSON.stringify(sectionsJson)}`,
        { encoding: 'utf8' }
      );
      const parsed = JSON.parse(result);
      if (parsed.ok) {
        cleared += chunk.length;
      } else {
        console.error(`  update-page-sections not ok:`, result.slice(0, 200));
      }
    } catch (err) {
      console.error(`  Chunk error for element ${elementId}:`, err.message.slice(0, 200));
    }
  }
  return cleared;
}

function processPage(page) {
  console.log(`\nProcessing: ${page.name || page.pageType} (${page.id})`);
  try {
    const secListRaw = execSync(`npx ikas-component list-page-sections --page-id ${page.id}`, { encoding: 'utf8' });
    const secList = JSON.parse(secListRaw).sections || [];
    if (!secList.length) { console.log('  No sections.'); return 0; }

    const elementIds = secList.map(s => s.elementId).join(',');
    const secDataRaw = execSync(`npx ikas-component get-section-values --page-id ${page.id} --element-ids ${elementIds}`, { encoding: 'utf8' });
    const secData = JSON.parse(secDataRaw).sections || [];

    let total = 0;
    for (const sectionObj of secData) {
      const matchingMeta = secList.find(s => s.elementId === sectionObj.elementId);
      const sectionName = matchingMeta?.name || sectionObj.sectionId;
      const propBlueprints = sectionObj.props || [];
      const propValues = sectionObj.propValues || {};
      const updates = [];

      for (const bp of propBlueprints) {
        if (bp.type !== 'TEXT' && bp.type !== 'RICH_TEXT') continue;
        if (shouldSkipProp(bp.name)) continue;
        const valObj = propValues[bp.name];
        if (!valObj || typeof valObj.value !== 'string') continue;
        const rawVal = valObj.value.trim();
        if (!rawVal) continue;
        if (isTurkishText(rawVal)) {
          updates.push({ propName: bp.name, value: { value: '' } });
        }
      }

      if (updates.length === 0) continue;

      const cleared = updateSingleSection(page.id, sectionObj.elementId, updates);
      total += cleared;
      console.log(`  [${sectionName}] Cleared ${cleared}/${updates.length} Turkish props`);
    }

    return total;
  } catch (err) {
    console.error(`  Error processing page ${page.id}:`, err.message.slice(0, 200));
    return 0;
  }
}

function run() {
  const allPages = getPageIds();
  
  // Find the pages that need small-chunk processing (failed before)
  // We'll just run ALL pages with the small-chunk method to ensure completeness
  let totalCleared = 0;
  for (const page of allPages) {
    const cleared = processPage(page);
    totalCleared += cleared;
  }

  console.log('\n=== SMALL-CHUNK CLEANUP COMPLETE ===');
  console.log(`Total additional props cleared: ${totalCleared}`);
}

run();
