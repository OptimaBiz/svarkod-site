import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const scanRoots = ['src/pages', 'src/layouts', 'src/components'];
const forbidden = [
  ['demo-data', 'production UI must not import the demo layer'],
  ['28k', 'fake forum metrics are forbidden'],
  ['286</strong>', 'fake forum metrics are forbidden'],
  ['pnpm demo:clean', 'demo cleanup UI must not ship to production'],
];

const errors = [];
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    const info = await stat(path);
    if (info.isDirectory()) await walk(path);
    else if (/\.(astro|ts|js|md)$/.test(name)) {
      const text = await readFile(path, 'utf8');
      for (const [needle, reason] of forbidden) {
        if (text.includes(needle)) errors.push(`${relative(root, path)}: ${reason} (${needle})`);
      }
    }
  }
}

for (const dir of scanRoots) await walk(join(root, dir));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Production validation passed.');
