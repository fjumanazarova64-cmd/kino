const fs = require('fs');

const html = fs.readFileSync('tvcom_page.html', 'utf-8');
const nuxtMatch = html.match(/<script type="application\/json" data-nuxt-data="nuxt-app"[^>]*>([\s\S]*?)<\/script>/);
const data = JSON.parse(nuxtMatch[1]);

// Let's print numbers that look like counts or totals (e.g. > 100)
for (let i = 0; i < data.length; i++) {
  const item = data[i];
  if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
    if (item.total !== undefined || item.total_pages !== undefined || item.count !== undefined || item.last_page !== undefined) {
      console.log('Pagination object found:', item);
      console.log('Resolved:', {
        total: data[item.total],
        total_pages: data[item.total_pages],
        count: data[item.count],
        last_page: data[item.last_page],
        current_page: data[item.current_page]
      });
    }
  }
}

// Let's also inspect the navigation menu and genres in the page
const navItems = [...html.matchAll(/<a[^>]+href=["'](\/uz\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Nav links count:', navItems.length);
const uniqueLinks = new Map();
navItems.forEach(n => {
  const text = n[2].replace(/<[^>]+>/g, '').trim();
  if (text) {
    uniqueLinks.set(n[1], text);
  }
});
console.log('Navigation links:');
for (const [href, text] of uniqueLinks.entries()) {
  console.log(`  ${href} -> ${text}`);
}
