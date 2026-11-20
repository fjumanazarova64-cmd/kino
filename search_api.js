const fs = require('fs');

const js = fs.readFileSync('nuxt_entry.js', 'utf-8');

// Find all matches with /api/ or endpoints
const matches = [...js.matchAll(/["'](\/[a-zA-Z0-9_\-\/]*api[a-zA-Z0-9_\-\/]*)["']/g)].map(m => m[1]);
console.log('API matches:', [...new Set(matches)]);

const urls = [...js.matchAll(/https?:\/\/[a-zA-Z0-9._\-\/:]+/g)].map(m => m[0]);
console.log('URLs:', [...new Set(urls)].filter(u => u.includes('tvcom')));

// Search for catalog or movie or feed
const words = [...js.matchAll(/["'](\/(?:catalog|feed|movie|search|genre)[^"']*)["']/g)].map(m => m[1]);
console.log('Catalog/feed paths:', [...new Set(words)]);
