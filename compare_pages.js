const fs = require('fs');

function extractFromHtml(file) {
  const html = fs.readFileSync(file, 'utf-8');
  const nuxtMatch = html.match(/<script type="application\/json" data-nuxt-data="nuxt-app"[^>]*>([\s\S]*?)<\/script>/);
  if (!nuxtMatch) return [];
  const data = JSON.parse(nuxtMatch[1]);

  function resolveNuxt(val, memo = new Map()) {
    if (val === null || val === undefined) return val;
    if (typeof val !== 'number') return val;
    if (memo.has(val)) return memo.get(val);

    const item = data[val];
    if (item === null || typeof item !== 'object') {
      return item;
    }

    if (Array.isArray(item)) {
      const arr = [];
      memo.set(val, arr);
      for (const el of item) {
        arr.push(resolveNuxt(el, memo));
      }
      return arr;
    }

    const obj = {};
    memo.set(val, obj);
    for (const [k, v] of Object.entries(item)) {
      obj[k] = resolveNuxt(v, memo);
    }
    return obj;
  }

  const movies = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      const keys = Object.keys(item);
      if (keys.some(k => k.includes('title') || k.includes('name') || k.includes('poster'))) {
        const resolved = resolveNuxt(i);
        if (resolved && (resolved.title || resolved.name) && (resolved.thumbnail_big || resolved.thumbnail_small)) {
          movies.push(resolved);
        }
      }
    }
  }
  return movies;
}

const p1 = extractFromHtml('tvcom_page.html');
const p2 = extractFromHtml('tvcom_page2.html');

console.log('Page 1 movies count:', p1.length);
console.log('Page 2 movies count:', p2.length);
console.log('Page 1 first 3:');
p1.slice(0, 3).forEach(m => console.log(' ', m.id, m.name, m.year));
console.log('Page 2 first 3:');
p2.slice(0, 3).forEach(m => console.log(' ', m.id, m.name, m.year));
