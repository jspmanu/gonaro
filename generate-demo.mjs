// Genereert een gepersonaliseerde demo-pagina vanuit de master template.
// Gebruik: node generate-demo.mjs "Bedrijfsnaam"
import fs from 'fs';
import path from 'path';
import { randomInt } from 'node:crypto';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(root, 'demo', '_template', 'index.html');
const demoDir = path.join(root, 'demo');

const companyName = process.argv[2];
if (!companyName || !companyName.trim()) {
  console.error('Gebruik: node generate-demo.mjs "Bedrijfsnaam"');
  process.exit(1);
}

const escaped = companyName.trim()
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const template = fs.readFileSync(templatePath, 'utf8');
if (!template.includes('[Bedrijfsnaam]')) {
  console.error('Template bevat geen [Bedrijfsnaam]-placeholder. Controleer demo/_template/index.html');
  process.exit(1);
}
const html = template.replaceAll('[Bedrijfsnaam]', escaped);

// Niet-raadbare slug (zelfde patroon als k7x2m9); nooit een bestaande map
// hergebruiken zodat verstuurde lead-links onaantastbaar blijven.
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
function makeSlug() {
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[randomInt(chars.length)];
  return s;
}
let slug;
do { slug = makeSlug(); } while (fs.existsSync(path.join(demoDir, slug)));

const outDir = path.join(demoDir, slug);
fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, 'index.html'), html);

console.log(`Demo gegenereerd voor: ${companyName.trim()}`);
console.log(`  Slug:    ${slug}`);
console.log(`  Bestand: demo/${slug}/index.html`);
console.log(`  Lokaal:  http://localhost:3000/demo/${slug}/`);
console.log(`  Live:    https://gonaro.ai/demo/${slug}/ (na deploy)`);
