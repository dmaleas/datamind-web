// Downloads the images the site uses from the old WordPress site into public/images/wp/.
// Run once with `npm run images`, then commit public/images/ so the site no longer depends on WordPress.
// `--soft` (used by `npm run build`) only fills in missing files and never fails the build.
import { readdir, readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
// After the DNS switch www.datamind.gr is the new site, so point WP_ORIGIN at the old server if needed.
const SOURCE = (process.env.WP_ORIGIN || 'https://www.datamind.gr') + '/wp-content/uploads/';
const soft = process.argv.includes('--soft');

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(md|json|astro)$/.test(e.name)) yield p;
  }
}

const paths = new Set();
for await (const file of walk(join(ROOT, 'src'))) {
  for (const m of (await readFile(file, 'utf8')).matchAll(/\/images\/wp\/([\w./-]+\.(?:jpe?g|png|webp|gif|svg))/gi)) paths.add(m[1]);
}

let fetched = 0, skipped = 0, failed = 0;
for (const rel of paths) {
  const dest = join(ROOT, 'public/images/wp', rel);
  try { await access(dest); skipped++; continue; } catch {}
  try {
    const res = await fetch(SOURCE + rel);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    fetched++;
  } catch (err) {
    failed++;
    console.warn(`  could not fetch ${rel}: ${err.message}`);
  }
}
console.log(`images: ${fetched} downloaded, ${skipped} already present, ${failed} failed (${paths.size} referenced)`);
if (failed && !soft) process.exit(1);
