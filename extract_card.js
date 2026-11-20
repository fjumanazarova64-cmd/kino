const fs = require('fs');
const html = fs.readFileSync('tvcom_page_1.html', 'utf-8');

// Find a movie card
const cardMatch = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i) || html.match(/<a[^>]+class="[^"]*card[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
if (cardMatch) {
  console.log('Card match:\n', cardMatch[0].slice(0, 1000));
} else {
  // Let's search for /uz/movie/119031
  const pos = html.indexOf('/uz/movie/119031');
  if (pos !== -1) {
    console.log('Around movie link:\n', html.slice(pos - 200, pos + 800));
  }
}

// Find filters container
const filterPos = html.indexOf('class="filters');
if (filterPos !== -1) {
  console.log('Filters block:\n', html.slice(filterPos - 100, filterPos + 2500));
}
