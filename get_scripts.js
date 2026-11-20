const fs = require('fs');
const html = fs.readFileSync('tvcom_page.html', 'utf-8');

const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log('All scripts:', scripts);

const preloadScripts = [...html.matchAll(/<link[^>]+rel=["']modulepreload["'][^>]+href=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Preload scripts:', preloadScripts);
