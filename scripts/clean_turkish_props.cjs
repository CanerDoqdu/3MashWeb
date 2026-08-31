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

// Props that should NEVER be cleared regardless of content
const SKIP_PROPS = /href|url|icon|svg|image|img|logo|src|class|style|regex|queryparam|param|port|email|phone|mode|align|spacing|fontsize|color|weight|^id$/i;

function shouldSkipProp(propName) {
  return SKIP_PROPS.test(propName);
}

function run() {
  const pagesRaw = execSync('npx ikas-component list-pages', { encoding: 'utf8' });
  const pages = JSON.parse(pagesRaw).pages || [];

  let totalCleared = 0;
  let totalErrors = 0;

  for (const page of pages) {
    try {
      const secListRaw = execSync(`npx ikas-component list-page-sections --page-id ${page.id}`, { encoding: 'utf8' });
      const secList = JSON.parse(secListRaw).sections || [];
      if (!secList.length) continue;

      const elementIds = secList.map(s => s.elementId).join(',');
      const secDataRaw = execSync(`npx ikas-component get-section-values --page-id ${page.id} --element-ids ${elementIds}`, { encoding: 'utf8' });
      const secData = JSON.parse(secDataRaw).sections || [];

      // Build per-section updates
      const sectionsToUpdate = [];

      for (const sectionObj of secData) {
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

        if (updates.length > 0) {
          sectionsToUpdate.push({ elementId: sectionObj.elementId, updates });
        }
      }

      if (sectionsToUpdate.length === 0) {
        console.log(`[${page.name || page.pageType}] No Turkish props found, skipping.`);
        continue;
      }

      // Split into batches of 20 sections to avoid arg size limits
      const BATCH_SIZE = 20;
      for (let i = 0; i < sectionsToUpdate.length; i += BATCH_SIZE) {
        const batch = sectionsToUpdate.slice(i, i + BATCH_SIZE);
        const sectionsJson = JSON.stringify(batch);
        try {
          const result = execSync(
            `npx ikas-component update-page-sections --page-id ${page.id} --sections ${JSON.stringify(sectionsJson)}`,
            { encoding: 'utf8' }
          );
          const parsed = JSON.parse(result);
          if (parsed.ok) {
            const count = batch.reduce((sum, s) => sum + s.updates.length, 0);
            totalCleared += count;
            console.log(`[${page.name || page.pageType}] Batch ${Math.floor(i/BATCH_SIZE)+1}: Cleared ${count} Turkish props across ${batch.length} sections.`);
          } else {
            console.error(`[${page.name || page.pageType}] Batch ${Math.floor(i/BATCH_SIZE)+1} returned not-ok:`, result);
            totalErrors++;
          }
        } catch (err) {
          console.error(`[${page.name || page.pageType}] Batch ${Math.floor(i/BATCH_SIZE)+1} error:`, err.message);
          totalErrors++;
        }
      }

    } catch (err) {
      console.error(`Error processing page ${page.id} (${page.name}):`, err.message);
      totalErrors++;
    }
  }

  console.log('\n=== CLEANUP COMPLETE ===');
  console.log(`Total props cleared: ${totalCleared}`);
  console.log(`Total errors: ${totalErrors}`);
}

run();
