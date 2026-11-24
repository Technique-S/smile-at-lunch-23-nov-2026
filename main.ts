import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Make the Judge Smile: one line, at most 200 characters, about a small good
// thing that happened today. Today's small good thing: a grieving neighbour
// left a pot of basil at the door with a note about things that grow back.
const line =
  "My neighbour who lost her husband last spring left a pot of her basil at my door with a note: 'For when you want something that grows back.'";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? './out';
mkdirSync(outputDir, { recursive: true });

// Gate guard (first pass): count Unicode code points, reject blank or
// multi-line text, and fail loudly before writing anything.
const charCount = [...line].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, measured ${charCount}`);
}
if (line.trim().length === 0 || /[\r\n]/.test(line)) {
  throw new Error('entry must be non-blank and exactly one line');
}
// Second, stricter guard: no control characters or Unicode line separators,
// and the file on disk must match the string we intended to submit.
if (/[\u0000-\u001f\u007f\u2028\u2029]/.test(line)) {
  throw new Error('entry contains a control character or line separator');
}

const entryPath = `${outputDir}/entry.txt`;
writeFileSync(entryPath, line, 'utf8');
const written = readFileSync(entryPath, 'utf8');
if ([...written].length !== charCount || written !== line) {
  throw new Error('entry.txt did not round-trip exactly as written');
}
console.log(`Wrote ${entryPath} (${charCount} chars): ${line}`);
