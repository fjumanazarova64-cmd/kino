const fs = require('fs');
const html = fs.readFileSync('tvcom_page_1.html', 'utf-8');

const pos = html.indexOf('/uz/movie/119031');
const endPos = html.indexOf('</a>', pos);
console.log('Movie Card Full HTML:\n', html.slice(pos - 35, endPos + 4));
