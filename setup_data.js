const fs = require('fs');

if (!fs.existsSync('src')) fs.mkdirSync('src');
if (!fs.existsSync('src/data')) fs.mkdirSync('src/data');
if (!fs.existsSync('src/components')) fs.mkdirSync('src/components');

const movies = fs.readFileSync('movies.json', 'utf-8');
fs.writeFileSync('src/data/movies.js', `export const MOVIES_DATA = ${movies};\n`);
console.log('Created src/data/movies.js');
