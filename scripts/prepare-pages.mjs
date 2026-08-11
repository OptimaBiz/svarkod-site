import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const rawBase = (process.env.SVARKOD_BASE || '').trim();
const base = rawBase && rawBase !== '/' ? `/${rawBase.replace(/^\/+|\/+$/g, '')}` : '';

if (!base) {
  console.log('GitHub Pages base path is empty; no URL rewrite needed.');
  process.exit(0);
}

const baseSegment = base.slice(1);
let filesChanged = 0;

function prefixTarget(target) {
  if (!target) return `${base}/`;
  if (target === baseSegment || target.startsWith(`${baseSegment}/`)) return `/${target}`;
  return `${base}/${target}`;
}

function findUnprefixedRootUrls(html) {
  const attributeUrls = [...html.matchAll(/(?:href|src|action|poster)=["'](\/(?!\/)[^"']*)/g)]
    .map((match) => match[1])
    .filter((value) => value !== base && !value.startsWith(`${base}/`));
  const jsonUrls = [...html.matchAll(/"url":"(\/(?!\/)[^"]*)/g)]
    .map((match) => match[1])
    .filter((value) => value !== base && !value.startsWith(`${base}/`));
  return [...attributeUrls, ...jsonUrls];
}

async function rewriteHtml(path) {
  const original = await readFile(path, 'utf8');
  let html = original.replace(/((?:href|src|action|poster)=["'])\/(?!\/)([^"']*)/g, (full, prefix, target) => `${prefix}${prefixTarget(target)}`);
  html = html.replace(/("url":")\/(?!\/)([^"]*)/g, (full, prefix, target) => `${prefix}${prefixTarget(target)}`);

  const leftovers = findUnprefixedRootUrls(html);
  if (leftovers.length) {
    throw new Error(`Unprefixed root URLs remain in ${path}: ${leftovers.slice(0, 10).join(', ')}`);
  }

  if (html !== original) {
    await writeFile(path, html);
    filesChanged += 1;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) await rewriteHtml(path);
  }
}

await walk(dist);

const index = await readFile(join(dist, 'index.html'), 'utf8');
if (!index.includes(`${base}/_astro/`)) {
  throw new Error(`Expected built assets under ${base}/_astro/, but none were found.`);
}

console.log(`Prepared ${filesChanged} HTML files for GitHub Pages base path ${base}.`);
