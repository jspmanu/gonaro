import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const width = parseInt(process.argv[4] || '1440', 10);

const dir = './screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

let n = 1;
let filename;
do {
  filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
  n++;
} while (fs.existsSync(path.join(dir, filename)));

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 600));

// Force everything visible — works for both CSS class-based and GSAP animations
await page.evaluate(() => {
  // 1. Kill all GSAP tweens and ScrollTriggers so nothing overrides us
  if (window.gsap) {
    gsap.globalTimeline.clear();
    gsap.killTweensOf('*');
    if (window.ScrollTrigger) ScrollTrigger.killAll();
  }
  // 2. Remove all GSAP-set inline opacity/transform/visibility
  document.querySelectorAll('*').forEach(el => {
    if (el.style.opacity !== undefined) el.style.opacity = '';
    if (el.style.transform !== undefined) el.style.transform = '';
    if (el.style.visibility !== undefined) el.style.visibility = '';
  });
  // 3. CSS override as safety net — catches anything missed above
  const s = document.createElement('style');
  s.textContent = '* { transition: none !important; animation: none !important; }';
  document.head.appendChild(s);
  // 4. Legacy CSS class-based fade-ins
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 300));

await page.screenshot({ path: path.join(dir, filename), fullPage: true });
await browser.close();
console.log(`Saved: screenshots/${filename}`);
