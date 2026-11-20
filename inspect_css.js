const fs = require('fs');

const files = fs.readdirSync('css');
for (const f of files) {
  const content = fs.readFileSync('css/' + f, 'utf-8');
  console.log(`=== ${f} (len: ${content.length}) ===`);
  // Look for root css variables or colors
  const rootVars = content.match(/:root\s*\{([^}]+)\}/);
  if (rootVars) {
    console.log('Root vars sample:\n', rootVars[1].slice(0, 500));
  }
  // Look for background colors and primary colors
  const bgColors = [...new Set(content.match(/#(?:[0-9a-fA-F]{3,8})|rgba?\([^)]+\)/g))];
  console.log('Colors sample:', bgColors.slice(0, 15));
  // Look for keyframes or transitions
  const keyframes = [...new Set(content.match(/@keyframes\s+([a-zA-Z0-9_-]+)/g))];
  if (keyframes.length) {
    console.log('Keyframes:', keyframes);
  }
}
