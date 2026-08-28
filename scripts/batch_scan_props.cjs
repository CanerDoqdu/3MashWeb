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
  const clean = cleanText(text);
  const trKeywords = [
    'bir','bu','ve','veya','ile','icin','her','neden','nasil','sebebi','kaynagi','yaygin',
    'katina','cikabilir','edildiginde','birlikte','bagli','oturan','isler','aciklama',
    'basligi','urunler','urun','hakkimizda','bilgi','adres','siparis','kurleme','yikama',
    'sepet','hesabim','giris','kayit','sifre','tekrar','kayip','tasarruf','hesapla',
    'ornek','cozum','uretim','dayanim','dogruluk','salinimi','faturasi','turkiye',
    'bizimle','uretiyor','sorulanlar','azaltalim','dayanak','bilimsel','sebep','baski'
  ];
  return trKeywords.some(w => clean.includes(w));
}

function run() {
  const pagesRaw = execSync('npx ikas-component list-pages', { encoding: 'utf8' });
  const pages = JSON.parse(pagesRaw).pages || [];
  const results = [];

  for (const page of pages) {
    try {
      const secListRaw = execSync(`npx ikas-component list-page-sections --page-id ${page.id}`, { encoding: 'utf8' });
      const secList = JSON.parse(secListRaw).sections || [];
      if (!secList.length) continue;

      const elementIds = secList.map(s => s.elementId).join(',');
      const secDataRaw = execSync(`npx ikas-component get-section-values --page-id ${page.id} --element-ids ${elementIds}`, { encoding: 'utf8' });
      const secData = JSON.parse(secDataRaw).sections || [];

      for (const sectionObj of secData) {
        const matchingMeta = secList.find(s => s.elementId === sectionObj.elementId);
        const sectionName = matchingMeta?.name || sectionObj.sectionId || sectionObj.elementId;
        const propBlueprints = sectionObj.props || [];
        const propValues = sectionObj.propValues || {};

        for (const bp of propBlueprints) {
          if (bp.type !== 'TEXT' && bp.type !== 'RICH_TEXT') continue;
          const valObj = propValues[bp.name];
          if (!valObj || typeof valObj.value !== 'string') continue;
          const rawVal = valObj.value.trim();
          if (!rawVal) continue;

          const isTr = isTurkishText(rawVal);
          results.push({
            pageId: page.id,
            pageName: page.name || page.pageType,
            elementId: sectionObj.elementId,
            sectionName,
            propId: bp.id,
            propName: bp.name,
            propType: bp.type,
            value: rawVal,
            isTurkish: isTr
          });
        }
      }
    } catch (err) {
      console.error(`Error processing page ${page.id} (${page.name}):`, err.message);
    }
  }

  if (!fs.existsSync('scripts/output')) fs.mkdirSync('scripts/output', { recursive: true });
  fs.writeFileSync('scripts/output/all_scanned_props.json', JSON.stringify(results, null, 2));

  const turkishProps = results.filter(r => r.isTurkish);
  const nonTurkishProps = results.filter(r => !r.isTurkish);

  console.log('=== DRY-RUN SCAN COMPLETED ===');
  console.log(`Total Pages Scanned: ${pages.length}`);
  console.log(`Total Text/RichText Props with Values: ${results.length}`);
  console.log(`Turkish Props Identified: ${turkishProps.length}`);
  console.log(`Non-Turkish / English Props: ${nonTurkishProps.length}`);
}

run();
