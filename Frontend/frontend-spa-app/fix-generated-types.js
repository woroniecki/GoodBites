// fix-generated-types.js
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'src/app/api-client');

const tsFiles = fs
  .readdirSync(TARGET_DIR)
  .filter(f => f.endsWith('models.ts'));

tsFiles.forEach(file => {
  const filePath = path.join(TARGET_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  const fixed = content.replace(
    /^export\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];$/gm,
    'export type {$1} from \'$2\';'
  );

  if (fixed !== content) {
    console.log(`Fixed: ${file}`);
    fs.writeFileSync(filePath, fixed);
  }
});
