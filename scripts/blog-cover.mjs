#!/usr/bin/env node
// Creates an original 1200x675 cover image for a blog post (also used as the social-media preview).
// Usage: node scripts/blog-cover.mjs <slug> "<title>" <topic>
// Topics: hdd, external, ssd, raid, nas, sd, usb, ransomware, bitlocker, tape, vm, cost, backup, general
// Output: public/images/blog/<slug>.jpg  →  frontmatter: image: /images/blog/<slug>.jpg
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const [slug, title, topic = 'general'] = process.argv.slice(2);
if (!slug || !title) {
  console.error('Usage: node scripts/blog-cover.mjs <slug> "<title>" <topic>');
  process.exit(1);
}

const W = 1200, H = 675;
const NAVY = '#0b2239', NAVY2 = '#163a63', ACCENT = '#f5a524', LIGHT = '#dbe6f2';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Icons are drawn in a 360x360 box (white outlines, accent details).
const s = `fill="none" stroke="${LIGHT}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"`;
const a = `fill="none" stroke="${ACCENT}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"`;
const hdd = `<rect x="70" y="30" width="220" height="300" rx="18" ${s}/>
  <circle cx="180" cy="150" r="80" ${s}/><circle cx="180" cy="150" r="14" fill="${LIGHT}"/>
  <path d="M250 270 L200 175" ${a}/><circle cx="252" cy="272" r="14" fill="${ACCENT}"/>
  <circle cx="95" cy="55" r="6" fill="${LIGHT}"/><circle cx="265" cy="55" r="6" fill="${LIGHT}"/>
  <circle cx="95" cy="305" r="6" fill="${LIGHT}"/>`;
const icons = {
  hdd,
  general: hdd,
  external: `<rect x="80" y="40" width="200" height="280" rx="34" ${s}/>
  <circle cx="180" cy="150" r="58" ${s}/><circle cx="180" cy="150" r="10" fill="${LIGHT}"/>
  <path d="M180 320 V350 M140 350 H220" ${s}/><circle cx="180" cy="270" r="9" fill="${ACCENT}"/>
  <path d="M300 110 q22 20 0 40 M318 92 q40 38 0 76" ${a}/>`,
  ssd: `<rect x="40" y="90" width="280" height="180" rx="16" ${s}/>
  <rect x="80" y="125" width="70" height="55" rx="6" ${a}/><rect x="170" y="125" width="70" height="55" rx="6" ${a}/>
  <rect x="80" y="195" width="160" height="40" rx="6" ${s}/>
  <path d="M265 130 v100" ${s}/><path d="M40 300 h280" ${s} stroke-dasharray="14 14"/>`,
  raid: `<rect x="60" y="30" width="240" height="70" rx="12" ${s}/>
  <rect x="60" y="145" width="240" height="70" rx="12" ${s}/>
  <rect x="60" y="260" width="240" height="70" rx="12" ${s}/>
  <circle cx="265" cy="65" r="9" fill="${ACCENT}"/><circle cx="265" cy="180" r="9" fill="${ACCENT}"/><circle cx="265" cy="295" r="9" fill="#e5484d"/>
  <path d="M95 65 h110 M95 180 h110 M95 295 h110" ${s}/>`,
  sd: `<path d="M110 30 H270 a20 20 0 0 1 20 20 V310 a20 20 0 0 1 -20 20 H90 a20 20 0 0 1 -20 -20 V110 Z" ${s}/>
  <path d="M120 60 v50 M155 60 v50 M190 60 v50 M225 60 v50 M260 60 v50" ${a}/>
  <text x="180" y="250" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="72" fill="${LIGHT}">SD</text>`,
  usb: `<rect x="110" y="120" width="140" height="210" rx="22" ${s}/>
  <rect x="135" y="30" width="90" height="90" ${s}/><rect x="155" y="55" width="16" height="20" fill="${ACCENT}"/><rect x="189" y="55" width="16" height="20" fill="${ACCENT}"/>
  <circle cx="180" cy="270" r="10" fill="${ACCENT}"/>`,
  ransomware: `<rect x="80" y="160" width="200" height="170" rx="18" ${s}/>
  <path d="M120 160 V110 a60 60 0 0 1 120 0 V160" ${s}/>
  <circle cx="180" cy="230" r="20" fill="${ACCENT}"/><path d="M180 245 V290" ${a}/>
  <path d="M40 60 l30 30 M70 60 l-30 30 M290 40 l30 30 M320 40 l-30 30" stroke="#e5484d" stroke-width="10" stroke-linecap="round"/>`,
  bitlocker: `<rect x="80" y="160" width="200" height="170" rx="18" ${s}/>
  <path d="M120 160 V110 a60 60 0 0 1 120 0 V160" ${s}/>
  <circle cx="160" cy="245" r="26" ${a}/><path d="M186 245 H250 M230 245 v24 M250 245 v18" ${a}/>`,
  tape: `<rect x="30" y="80" width="300" height="200" rx="16" ${s}/>
  <circle cx="115" cy="170" r="45" ${s}/><circle cx="245" cy="170" r="45" ${s}/>
  <circle cx="115" cy="170" r="10" fill="${ACCENT}"/><circle cx="245" cy="170" r="10" fill="${ACCENT}"/>
  <path d="M115 215 H245" ${a}/><path d="M90 280 l20 -40 h140 l20 40" ${s}/>`,
  vm: `<rect x="40" y="50" width="280" height="190" rx="14" ${s}/>
  <path d="M130 310 h100 M180 240 v70" ${s}/>
  <rect x="80" y="90" width="90" height="60" rx="6" ${a}/><rect x="190" y="90" width="90" height="60" rx="6" ${a}/>
  <rect x="80" y="165" width="90" height="40" rx="6" ${s}/><rect x="190" y="165" width="90" height="40" rx="6" ${s}/>`,
  cost: `<circle cx="180" cy="180" r="140" ${s}/>
  <path d="M235 115 a75 75 0 1 0 0 130" ${a}/><path d="M100 160 h110 M100 200 h110" ${a}/>`,
  backup: `<path d="M90 250 a60 60 0 0 1 10 -119 a85 85 0 0 1 163 -10 a65 65 0 0 1 7 129 Z" ${s}/>
  <path d="M180 170 v120 M145 255 l35 35 l35 -35" ${a}/>`,
};
icons.nas = icons.raid;
const icon = icons[topic] ?? icons.general;
if (!icons[topic]) console.warn(`Unknown topic "${topic}", using "general".`);

// Wrap the title into lines that fit the left column.
function wrap(text, maxChars) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}
let size = 58, lines = wrap(title, 18);
if (lines.length > 4) { size = 46; lines = wrap(title, 23); }
if (lines.length > 5) { lines = lines.slice(0, 5); lines[4] = lines[4].replace(/\s*\S*$/, '…'); }
const lh = size * 1.22;
const top = 360 - (lines.length * lh) / 2 + size * 0.35;
const titleSvg = lines
  .map((l, i) => `<text x="72" y="${top + i * lh}" font-family="DejaVu Sans" font-weight="bold" font-size="${size}" fill="#ffffff">${esc(l)}</text>`)
  .join('');

const logo = 'M87 26.89L87 69.35L66 81.47L45 69.35L45 45.45L66 33.33L66 26.4L39 41.99L39 72.81L66 88.4L93 72.81L93 30.36ZM78.2 21.81L78.2 64.27L66 71.31L53.8 64.27L53.8 50.53L66 43.49L66 36.56L47.8 47.07L47.8 67.73L66 78.24L84.2 67.73L84.2 25.28ZM69.4 16.73L69.4 59.19L66 61.15L62.6 59.19L62.6 55.61L66 53.65L66 46.72L56.6 52.15L56.6 62.65L66 68.08L75.4 62.65L75.4 20.2Z';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY2}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="960" cy="340" r="250" fill="#ffffff" fill-opacity="0.05"/>
  <rect x="72" y="70" width="70" height="8" rx="4" fill="${ACCENT}"/>
  <text x="72" y="125" font-family="DejaVu Sans" font-size="26" letter-spacing="3" fill="${LIGHT}">DATAMIND · ΙΣΤΟΛΟΓΙΟ</text>
  ${titleSvg}
  <g transform="translate(72 548) scale(0.75) translate(-39 -14.5)"><path fill="${ACCENT}" d="${logo}"/></g>
  <text x="130" y="597" font-family="DejaVu Sans" font-size="26" fill="${LIGHT}">www.datamind.gr · 211 800 1320</text>
  <g transform="translate(780 160)">${icon}</g>
</svg>`;

mkdirSync('public/images/blog', { recursive: true });
const out = `public/images/blog/${slug}.jpg`;
await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log(`Wrote ${out}  →  image: /images/blog/${slug}.jpg`);
