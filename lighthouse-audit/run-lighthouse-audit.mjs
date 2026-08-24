import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');
const urlFile = path.join(__dirname, 'urls.txt');
const reportDir = path.join(__dirname, 'reports');
const logFile = path.join(__dirname, 'audit-log.txt');

if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const urls = fs.readFileSync(urlFile, 'utf8')
  .split('\n')
  .map(u => u.trim())
  .filter(Boolean);

const total = urls.length;
let passed = 0;
let failed = 0;
const startTime = new Date();

console.log('====================================================');
console.log('  3MASH Full Website Lighthouse Audit');
console.log(`  Target URLs: ${total}`);
console.log(`  Report Directory: ${reportDir}`);
console.log('====================================================\n');

fs.writeFileSync(logFile, `3MASH Audit Log - Started: ${startTime.toISOString()}\n\n`, 'utf8');

for (let i = 0; i < urls.length; i++) {
  const index = i + 1;
  const url = urls[i];
  
  let slug = url.replace(/^https?:\/\/[^/]+\/?/, '')
    .replace(/[/\\?&=:#%+]/g, '_')
    .replace(/_+$/, '');
  if (!slug) slug = 'homepage';
  if (slug.length > 100) slug = slug.substring(0, 100);

  const indexStr = String(index).padStart(3, '0');
  const reportBase = path.join(reportDir, `${indexStr}_${slug}`);
  const htmlReport = `${reportBase}.report.html`;

  console.log(`[${index}/${total}] Scanning: ${url}`);
  const startPage = Date.now();

  try {
    const cmd = `npx --yes lighthouse "${url}" --output html --output json --output-path="${reportBase}" --chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage" --only-categories=performance --only-categories=accessibility --only-categories=best-practices --only-categories=seo --quiet`;
    
    execSync(cmd, { stdio: 'inherit', cwd: workspaceRoot });
    const elapsed = Math.round((Date.now() - startPage) / 1000);

    if (fs.existsSync(htmlReport)) {
      passed++;
      console.log(`       -> SUCCESS (${elapsed}s) Saved: ${indexStr}_${slug}.report.html\n`);
      fs.appendFileSync(logFile, `[PASS] ${url} (${elapsed}s) -> ${reportBase}\n`, 'utf8');
    } else {
      failed++;
      console.log(`       -> FAILED (${elapsed}s)\n`);
      fs.appendFileSync(logFile, `[FAIL] ${url} (${elapsed}s) -> ${reportBase}\n`, 'utf8');
    }
  } catch (err) {
    failed++;
    const elapsed = Math.round((Date.now() - startPage) / 1000);
    console.error(`       -> ERROR (${elapsed}s): ${err.message}\n`);
    fs.appendFileSync(logFile, `[ERROR] ${url} (${elapsed}s) -> ${err.message}\n`, 'utf8');
  }
}

const endTime = new Date();
const totalMin = Math.round((endTime - startTime) / 60000);
console.log('====================================================');
console.log(`  COMPLETED! Passed: ${passed}/${total} | Failed: ${failed}/${total}`);
console.log(`  Total time: ~${totalMin} minutes`);
console.log('====================================================');
fs.appendFileSync(logFile, `\nSummary: Passed: ${passed}/${total}, Failed: ${failed}/${total}, Total time: ~${totalMin} min\n`, 'utf8');
