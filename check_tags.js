const fs = require('fs');
const html = fs.readFileSync('tvcom_page.html', 'utf-8');

const match = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
match.forEach((m, idx) => {
  if (m[1].length > 10000) {
    console.log(`Script ${idx} tag:`, m[0].slice(0, 100));
  }
});
