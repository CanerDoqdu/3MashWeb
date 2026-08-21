const fs = require('fs');
const path = require('path');

const unlhDir = 'C:/Users/caner/.unlighthouse/reports';
const dirs = fs.readdirSync(unlhDir);

let homeReportPath = '';
for (const d of dirs) {
  const p = path.join(unlhDir, d, 'lighthouse.json');
  if (fs.existsSync(p)) {
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (data.finalDisplayedUrl === 'https://dev-caner1.ikas.shop/' || data.requestedUrl === 'https://dev-caner1.ikas.shop/' || d === '__root' || d === '_') {
        homeReportPath = p;
        break;
      }
    } catch (e) {}
  }
}

if (!homeReportPath) {
  for (const d of dirs) {
    const p = path.join(unlhDir, d, 'lighthouse.json');
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      if (content.includes('"https://dev-caner1.ikas.shop/"')) {
        homeReportPath = p;
        break;
      }
    }
  }
}

console.log('Homepage report path:', homeReportPath);

if (homeReportPath) {
  const report = JSON.parse(fs.readFileSync(homeReportPath, 'utf8'));
  console.log('\n=== CATEGORY SCORES ===');
  Object.keys(report.categories).forEach(k => {
    const cat = report.categories[k];
    console.log(`  ${cat.title}: ${Math.round(cat.score * 100)} / 100`);
  });

  console.log('\n=== CORE WEB VITALS & METRICS ===');
  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index',
    'interactive'
  ];
  metrics.forEach(m => {
    const a = report.audits[m];
    if (a) {
      console.log(`  ${a.title}: ${a.displayValue} (Score: ${Math.round(a.score * 100)})`);
    }
  });

  console.log('\n=== FAILED AUDITS (Score < 100) ===');
  Object.keys(report.audits).forEach(k => {
    const audit = report.audits[k];
    if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'notApplicable' && audit.scoreDisplayMode !== 'informative') {
      const score = Math.round(audit.score * 100);
      console.log(`\n[Score: ${score}] ${audit.title} (${audit.id})`);
      if (audit.displayValue) console.log(`  Result: ${audit.displayValue}`);
      if (audit.description) {
        const cleanDesc = audit.description.split('[Learn more]')[0].split('[Daha fazla bilgi]')[0].trim();
        console.log(`  Description: ${cleanDesc}`);
      }
      if (audit.details && audit.details.items && audit.details.items.length) {
        console.log(`  Issues count: ${audit.details.items.length}`);
        audit.details.items.slice(0, 3).forEach((item, idx) => {
          console.log(`    #${idx+1}:`, JSON.stringify(item).slice(0, 180));
        });
      }
    }
  });
}
