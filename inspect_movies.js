const fs = require('fs');

const movies = JSON.parse(fs.readFileSync('extracted_movies.json', 'utf-8'));
console.log('Total objects:', movies.length);

// Filter distinct movies by id
const map = new Map();
movies.forEach(m => {
  if (m.id && m.name) {
    map.set(m.id, m);
  }
});

const distinctMovies = Array.from(map.values());
console.log('Distinct movies count:', distinctMovies.length);

distinctMovies.forEach((m, idx) => {
  console.log(`${idx + 1}. [${m.id}] ${m.name} (${m.year}) - Kinopoisk: ${m.kinopoisk_rating || '-'}, IMDb: ${m.imdb_rating || '-'} | Genres: ${m.genres}`);
});

// Let's also search JS bundle files or HTML for API endpoints
const html = fs.readFileSync('tvcom_page.html', 'utf-8');
const apiMatches = [...html.matchAll(/https?:\/\/[a-zA-Z0-9.-]+\.tvcom\.uz[^\s"'<>]*/g)].map(m => m[0]);
console.log('\nTVCOM URLs in HTML:');
[...new Set(apiMatches)].forEach(u => console.log('  ', u));
