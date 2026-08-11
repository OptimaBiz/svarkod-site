import { readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
const dir = join(process.cwd(), 'src', 'demo-data');
const files = await readdir(dir);
const demoFiles = files.filter((name) => name.endsWith('.json'));
for (const file of demoFiles) await rm(join(dir, file));
console.log(`Removed ${demoFiles.length} demo data file(s). Editorial shell is intact.`);
