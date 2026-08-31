// Genereert een gepersonaliseerde demo-pagina vanuit de master template.
// Gebruik: node generate-demo.mjs "Bedrijfsnaam"
//          node generate-demo.mjs "Bedrijfsnaam" --slug=k7x2m9   (ververst een bestaande demo)
import fs from 'fs';
import path from 'path';
import { randomInt } from 'node:crypto';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const demoDir = path.join(root, 'demo');

const args = process.argv.slice(2);
const companyName = args.find((a) => !a.startsWith('--'));
const slugFlag = args.find((a) => a.startsWith('--slug='));
const templateFlag = args.find((a) => a.startsWith('--template='));

if (!companyName || !companyName.trim()) {
  console.error('Gebruik: node generate-demo.mjs "Bedrijfsnaam" [--slug=bestaandeslug] [--template=_template]');
  process.exit(1);
}

// De scroll-demo is de enige master. Alleen underscore-mappen zijn toegestaan:
// die publiceert GitHub Pages niet, dus een master kan nooit per ongeluk zelf
// een live demo worden. De vormcontrole hieronder weigert padtrucs zoals
// ../etc; de allowlist daarna weigert elke andere naam.
const ALLOWED_TEMPLATES = ['_template'];
const templateName = templateFlag ? templateFlag.slice('--template='.length) : '_template';
if (!/^_[a-z0-9-]+$/.test(templateName)) {
  console.error(`Ongeldige template: "${templateName}". Verwacht een underscore-map, bijvoorbeeld _template.`);
  process.exit(1);
}
if (!ALLOWED_TEMPLATES.includes(templateName)) {
  console.error(`Onbekende template: "${templateName}". Toegestaan: ${ALLOWED_TEMPLATES.join(', ')}.`);
  process.exit(1);
}
const templatePath = path.join(demoDir, templateName, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error(`Template niet gevonden: demo/${templateName}/index.html`);
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

let slug;
let refreshed = false;

if (slugFlag) {
  // Opt-in herschrijven van een bestaande demo. Alleen zo kan er ooit iets
  // overschreven worden; zonder de vlag blijft dat onmogelijk.
  slug = slugFlag.slice('--slug='.length);
  if (!/^[a-z0-9]{6}$/.test(slug)) {
    console.error(`Ongeldige slug: "${slug}". Verwacht 6 tekens uit a-z en 0-9.`);
    process.exit(1);
  }
  if (!fs.existsSync(path.join(demoDir, slug))) {
    console.error(`demo/${slug}/ bestaat niet. Laat --slug weg om een nieuwe demo te maken.`);
    process.exit(1);
  }
  refreshed = true;
} else {
  // Niet-raadbare slug (zelfde patroon als k7x2m9); nooit een bestaande map
  // hergebruiken zodat verstuurde lead-links onaantastbaar blijven.
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const makeSlug = () => {
    let s = '';
    for (let i = 0; i < 6; i++) s += chars[randomInt(chars.length)];
    return s;
  };
  do { slug = makeSlug(); } while (fs.existsSync(path.join(demoDir, slug)));
  fs.mkdirSync(path.join(demoDir, slug));
}

fs.writeFileSync(path.join(demoDir, slug, 'index.html'), html);

console.log(`Demo ${refreshed ? 'ververst' : 'gegenereerd'} voor: ${companyName.trim()}`);
console.log(`  Master:  demo/${templateName}/index.html`);
console.log(`  Slug:    ${slug}`);
console.log(`  Bestand: demo/${slug}/index.html`);
console.log(`  Lokaal:  http://localhost:3000/demo/${slug}/`);
console.log(`  Live:    https://gonaro.ai/demo/${slug}/ (na deploy)`);
