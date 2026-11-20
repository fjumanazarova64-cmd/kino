const fs = require('fs');

const raw = fs.readFileSync('nuxt_data_7.json', 'utf-8');
const data = JSON.parse(raw);

console.log('Nuxt data is Array?', Array.isArray(data));
console.log('Array length:', data.length);

// Nuxt 3 uses a flattened representation where data is an array of primitives, objects, and indices.
// Let's write a resolver for Nuxt 3 devalue format
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

// Search for objects that look like movies (have title, name, poster, id, etc.)
let movies = [];
for (let i = 0; i < data.length; i++) {
  const item = data[i];
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    // Check if it has keys like id, title, poster_url, or similar
    const keys = Object.keys(item);
    if (keys.some(k => k.includes('title') || k.includes('name') || k.includes('poster'))) {
      const resolved = resolveNuxt(i);
      if (resolved && (resolved.title || resolved.name || resolved.poster || resolved.poster_url)) {
        movies.push(resolved);
      }
    }
  }
}

console.log('Found potential movie objects:', movies.length);
if (movies.length > 0) {
  console.log('Sample movie 1:', JSON.stringify(movies[0], null, 2));
}

// Let's also search strings for movie titles or genres
const strings = data.filter(x => typeof x === 'string');
console.log('Total string entries:', strings.length);
fs.writeFileSync('nuxt_strings.json', JSON.stringify(strings, null, 2));
fs.writeFileSync('extracted_movies.json', JSON.stringify(movies, null, 2));
