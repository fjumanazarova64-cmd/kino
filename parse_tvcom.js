const fs = require('fs');

const content = fs.readFileSync('tvcom_page.html', 'utf-8');
console.log('Length:', content.length);

const titleMatch = content.match(/<title>(.*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'None');

const nextDataMatch = content.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (nextDataMatch) {
  console.log('Next data found, length:', nextDataMatch[1].length);
  fs.writeFileSync('next_data.json', nextDataMatch[1]);
  try {
    const data = JSON.parse(nextDataMatch[1]);
    console.log('Next data keys:', Object.keys(data));
    if (data.props) {
      console.log('props keys:', Object.keys(data.props));
      if (data.props.pageProps) {
        console.log('pageProps keys:', Object.keys(data.props.pageProps));
      }
    }
  } catch (e) {
    console.error('Error parsing JSON:', e.message);
  }
}

const nuxtMatch = content.match(/window\.__NUXT__\s*=\s*([\s\S]*?);<\/script>/);
if (nuxtMatch) {
  console.log('Nuxt data found, length:', nuxtMatch[1].length);
  fs.writeFileSync('nuxt_data.txt', nuxtMatch[1].slice(0, 100000));
}

// Check for links, images, script tags
const scripts = [...content.matchAll(/<script[^>]*src=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Scripts count:', scripts.length);
console.log('Sample scripts:', scripts.slice(0, 5));

const imgs = [...new Set([...content.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|png|webp|jpeg|svg)/gi)].map(m => m[0]))];
console.log('Images found:', imgs.length);
console.log('Sample images:', imgs.slice(0, 10));

// Find any api endpoints mentioned
const apis = [...new Set([...content.matchAll(/https?:\/\/[^\s"'<>]*(?:api|catalog|v1|v2|movie|asset)[^\s"'<>]*/gi)].map(m => m[0]))];
console.log('APIs found:', apis.slice(0, 10));
