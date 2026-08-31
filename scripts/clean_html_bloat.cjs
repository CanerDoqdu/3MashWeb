/**
 * clean_html_bloat.cjs  v2
 * 
 * Handles JS source files where HTML is stored as escaped string literals.
 * Uses a smarter approach: unescapes -> cleans -> re-escapes.
 */

const fs = require('fs');
const path = require('path');

function cleanHtml(html) {
  return html
    // 1. Remove data-bookmark/range span elements (invisible Google Docs bookmarks)
    .replace(/<span[^>]*data-range-char-type[^>]*>.*?<\/span>/gs, '')
    // 2. Remove all data-* attributes from any tag
    .replace(/\s+data-[a-zA-Z0-9_-]+=(?:"[^"]*"|'[^']*')/g, '')
    // 3. Remove class="zw-*" and class="EOP" Zoho Writer artifacts
    .replace(/\s+class="[^"]*(?:zw-|EOP)[^"]*"/g, '')
    // 4. Strip inline style overrides (font-size, color, font-weight, background-color, line-height)
    //    but keep the element itself
    .replace(/<span\s+style="[^"]*(font-size|color|font-weight|background-color)[^"]*">([\s\S]*?)<\/span>/g, '$2')
    // 5. Remove leftover empty style/class attributes  
    .replace(/\s+style="\s*"/g, '')
    .replace(/\s+class="\s*"/g, '')
    // 6. Collapse bare <span>text</span> with no attributes
    .replace(/<span>([\s\S]*?)<\/span>/g, '$1')
    // 7. Remove &nbsp;-only or empty paragraphs
    .replace(/<p[^>]*>\s*(?:&nbsp;|\s)*\s*<\/p>/g, '')
    // 8. Remove <br>-only paragraphs
    .replace(/<p[^>]*>\s*<br\s*\/?>\s*<\/p>/g, '')
    // 9. Strip leading filler headings like <h2><br></h2>
    .replace(/^(?:<h[1-6][^>]*>\s*<br\s*\/?>\s*<\/h[1-6]>\s*)+/g, '')
    // 10. Simplify Google Docs bullets "·&nbsp;&nbsp;..." -> "• "
    .replace(/·(?:&nbsp;)+\s*/g, '• ')
    // 11. Collapse multiple consecutive <br>
    .replace(/(?:<br\s*\/?>){2,}/g, '<br>')
    // 12. Trim whitespace
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const files = [
  'src/components/ThreeMashPageData/sourceData.ts',
];

let totalBefore = 0;
let totalAfter = 0;

for (const relPath of files) {
  const filePath = path.join(process.cwd(), relPath);
  const original = fs.readFileSync(filePath, 'utf8');
  
  // The HTML is stored as JS string with escape sequences like \" inside the string.
  // Strategy: find contentHtml value boundaries, unescape, clean, re-escape.
  
  let result = original;
  
  // Match contentHtml: "..." where content may span many lines and contain escaped quotes
  // The HTML value ends at the first unescaped " followed by newline/comma/}
  result = result.replace(
    /"contentHtml":\s*"((?:[^"\\]|\\[\s\S])*)"/g,
    (match, escapedHtml) => {
      // Unescape the JS string
      const html = escapedHtml
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
      
      const cleanedHtml = cleanHtml(html);
      
      // Re-escape for JS string
      const reEscaped = cleanedHtml
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      
      return `"contentHtml": "${reEscaped}"`;
    }
  );
  
  const beforeBytes = Buffer.byteLength(original, 'utf8');
  const afterBytes = Buffer.byteLength(result, 'utf8');
  totalBefore += beforeBytes;
  totalAfter += afterBytes;
  
  fs.writeFileSync(filePath, result, 'utf8');
  console.log(`✅ ${relPath}`);
  console.log(`   ${(beforeBytes/1024).toFixed(1)} KB → ${(afterBytes/1024).toFixed(1)} KB  (saved ${((beforeBytes-afterBytes)/1024).toFixed(1)} KB, ${Math.round((1-afterBytes/beforeBytes)*100)}%)`);
}

console.log(`\n📦 Total: ${(totalBefore/1024).toFixed(1)} KB → ${(totalAfter/1024).toFixed(1)} KB`);
console.log(`   Saved: ${((totalBefore-totalAfter)/1024).toFixed(1)} KB`);

// Re-run extract to get clean translation file
console.log('\n🔄 Re-running extract_unique_strings...');
require('./extract_unique_strings.cjs');
