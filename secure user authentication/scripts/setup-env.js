import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const copies = [
  ['server/.env.example', 'server/.env'],
  ['client/.env.example', 'client/.env'],
];

for (const [from, to] of copies) {
  const src = path.join(root, from);
  const dest = path.join(root, to);
  if (!fs.existsSync(dest) && fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Created ${to}`);
  } else if (fs.existsSync(dest)) {
    console.log(`Skipped ${to} (already exists)`);
  }
}

console.log('\nSetup done. Start MongoDB, then run:');
console.log('  npm run dev:server');
console.log('  npm run dev:client');
