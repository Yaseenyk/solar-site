// Fails the build if any entry in src/lib/facts.ts loses its source URL or its checked date.
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/facts.ts", "utf-8");
const blocks = src.split(/\n  [a-zA-Z]+: \{/).slice(1);
let bad = 0;
for (const b of blocks) {
  const name = (b.match(/text: "([^"]+)"/) || [])[1] || "(unnamed)";
  if (!/source: ([A-Z_0-9]+|"https?:\/\/)/.test(b)) { console.error("no source:", name); bad++; }
  if (!/checked: CHECKED/.test(b) && !/checked: "\d{4}-\d{2}-\d{2}"/.test(b)) { console.error("no checked date:", name); bad++; }
}
if (bad) process.exit(1);
console.log(`verify-facts: ${blocks.length} facts, all sourced and dated`);
