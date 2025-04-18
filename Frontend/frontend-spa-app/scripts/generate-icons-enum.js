const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.resolve(__dirname, '../public/icons');
const OUTPUT_FILE = path.resolve(__dirname, '../src/app/shared/icons-map.ts');

function toPascalCase(name) {
  return name
    .replace(/(-|_|\s)+(.)?/g, (_, __, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^\w/, c => c.toUpperCase())
    .replace(/\.svg$/, '');
}

function getIconsMap(dir, relativePath = '') {
  const fullPath = path.join(dir, relativePath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  const map = {};

  for (const entry of entries) {
    if (entry.isDirectory()) {
      map[entry.name] = getIconsMap(dir, path.join(relativePath, entry.name));
    } else if (entry.isFile() && (entry.name.endsWith('.svg') || entry.name.endsWith('.png'))) {
      const key = toPascalCase(entry.name);
      map[key] = path.join(relativePath, entry.name).replace(/\\/g, '/');
    }
  }

  return map;
}

const iconMap = getIconsMap(ICONS_DIR);

const content = `// AUTO-GENERATED FILE. DO NOT EDIT.

export const IconsMap = ${JSON.stringify(iconMap, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log('✅ Generated icons-map.ts');
