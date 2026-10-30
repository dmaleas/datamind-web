// Checks that every URL of the old WordPress site still works on the new site,
// either as a page in dist/ or through a redirect in public/_redirects. Run after `npm run build`.
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const old = (await readFile(join(ROOT, 'scripts/old-urls.txt'), 'utf8'))
  .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));

const redirects = (await readFile(join(ROOT, 'public/_redirects'), 'utf8'))
  .split('\n').filter((l) => l.trim() && !l.startsWith('#'))
  .map((l) => l.trim().split(/\s+/));

const matchRedirect = (path) => redirects.find(([from]) =>
  from.endsWith('*') ? path.startsWith(from.slice(0, -1)) : from === path);

let bad = 0;
for (const url of old) {
  const path = new URL(url).pathname;
  const decoded = decodeURIComponent(path);
  try {
    await access(join(ROOT, 'dist', decoded, 'index.html'));
    console.log(`ok        ${path}`);
  } catch {
    const r = matchRedirect(path);
    if (r) console.log(`redirect  ${path} -> ${r[1]}`);
    else { console.log(`MISSING   ${path}`); bad++; }
  }
}
console.log(bad ? `\n${bad} old URL(s) have no page or redirect.` : '\nAll old URLs are covered.');
process.exit(bad ? 1 : 0);
