import { mkdirSync, writeFileSync } from 'node:fs';

// One line, at most 200 characters, about a small good thing that happened today.
// The small good thing: a quiet neighbour was secretly watering a plant.
const line = "At lunch today my grumpy downstairs neighbour asked if my sick fern was okay — turns out she'd been watering it through the window for a week, never once mentioning it.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? './out';
mkdirSync(outputDir, { recursive: true });

// The gate wants UTF-8 text of 1..200 characters, not only whitespace, on one line.
const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`line must be 1-200 characters, got ${length}`);
}
if (line.trim().length === 0 || /[\r\n]/.test(line)) {
  throw new Error('line must be non-blank and fit on a single line');
}

writeFileSync(`${outputDir}/entry.txt`, line, 'utf8');
console.log(`Wrote entry.txt (${[...line].length} chars): ${line}`);
