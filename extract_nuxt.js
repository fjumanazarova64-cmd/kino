const fs = require('fs');

const html = fs.readFileSync('tvcom_page.html', 'utf-8');

// Look for script tags
const scriptMatches = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Total scripts found:', scriptMatches.length);

scriptMatches.forEach((s, idx) => {
  const fullTag = s[0];
  const body = s[1];
  console.log(`Script ${idx}: tag length=${fullTag.length}, body length=${body.length}`);
  if (fullTag.includes('__NUXT_DATA__') || fullTag.includes('application/json')) {
    console.log(`  --> Found JSON/Nuxt script ${idx}!`);
    fs.writeFileSync(`nuxt_data_${idx}.json`, body);
  }
});

// Also look for movie links and structures
const movieLinks = [...html.matchAll(/\/uz\/movie\/(\d+)/g)].map(m => m[0]);
console.log('Unique movie links in HTML:', [...new Set(movieLinks)].length);
console.log('Sample movie links:', [...new Set(movieLinks)].slice(0, 15));

// Check css links
const cssLinks = [...html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('CSS links:', cssLinks);
