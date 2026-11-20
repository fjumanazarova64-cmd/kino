const fs = require('fs');
const { execSync } = require('child_process');

function extractFromHtml(file) {
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf-8');
  const nuxtMatch = html.match(/<script type="application\/json" data-nuxt-data="nuxt-app"[^>]*>([\s\S]*?)<\/script>/);
  if (!nuxtMatch) return [];
  try {
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
  } catch (e) {
    console.error('Error parsing', file, e.message);
    return [];
  }
}

// Copy page 1 and page 2 if already downloaded
if (fs.existsSync('tvcom_page.html') && !fs.existsSync('tvcom_page_1.html')) {
  fs.copyFileSync('tvcom_page.html', 'tvcom_page_1.html');
}
if (fs.existsSync('tvcom_page2.html') && !fs.existsSync('tvcom_page_2.html')) {
  fs.copyFileSync('tvcom_page2.html', 'tvcom_page_2.html');
}

for (let page = 1; page <= 8; page++) {
  const filename = `tvcom_page_${page}.html`;
  if (!fs.existsSync(filename)) {
    console.log(`Downloading page ${page}...`);
    try {
      execSync(`curl.exe -s -L --max-time 15 "https://tvcom.uz/uz/uzb?page=${page}" -o ${filename}`);
    } catch (err) {
      console.log(`Failed page ${page}:`, err.message);
    }
  }
}

// Collect all movies
const allMoviesMap = new Map();
for (let page = 1; page <= 8; page++) {
  const filename = `tvcom_page_${page}.html`;
  const pageMovies = extractFromHtml(filename);
  console.log(`Page ${page}: extracted ${pageMovies.length} movies`);
  pageMovies.forEach(m => {
    if (m.id && m.name) {
      allMoviesMap.set(m.id, m);
    }
  });
}

const distinct = Array.from(allMoviesMap.values());
console.log(`Total distinct movies collected: ${distinct.length}`);
fs.writeFileSync('all_movies.json', JSON.stringify(distinct, null, 2));
