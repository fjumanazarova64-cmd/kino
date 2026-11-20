const fs = require('fs');

const html = fs.readFileSync('tvcom_page_1.html', 'utf-8');

// Extract Header
const headerMatch = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/i);
if (headerMatch) {
  console.log('Header found! Length:', headerMatch[0].length);
  fs.writeFileSync('extracted_header.html', headerMatch[0]);
}

// Extract Footer
const footerMatch = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i);
if (footerMatch) {
  console.log('Footer found! Length:', footerMatch[0].length);
  fs.writeFileSync('extracted_footer.html', footerMatch[0]);
}

// Extract Main section or Catalog filters
const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  console.log('Main found! Length:', mainMatch[0].length);
  // Let's sample first 2000 chars of main
  console.log('Main sample:\n', mainMatch[0].slice(0, 1500));
}

// Extract SVG icons
const svgs = [...html.matchAll(/<svg\b[^>]*>([\s\S]*?)<\/svg>/gi)].map(m => m[0]);
console.log('Total SVGs found:', svgs.length);
fs.writeFileSync('extracted_svgs.html', svgs.join('\n\n'));
