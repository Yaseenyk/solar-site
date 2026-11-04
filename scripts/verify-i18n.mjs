// Checks every src/content/i18n/<lang>.json against en.json: same shape, same number tokens, same links,
// same block types and ad slots. A translation can change words, never figures or structure.
// Usage: node scripts/verify-i18n.mjs [lang ...]   (no args = every file)
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/content/i18n";
const en = JSON.parse(readFileSync(join(DIR, "en.json"), "utf-8"));
const wanted = process.argv.slice(2);
const files = readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "en.json").filter((f) => !wanted.length || wanted.includes(f.replace(".json", "")));

// keys whose string value must be identical to English (structure, not prose)
const EXACT = new Set(["t", "slot", "ctx"]);
const tokens = (s) => [...s.matchAll(/\{\{[^}]+\}\}|\{[a-zA-Z]+\}/g)].map((m) => m[0]).sort().join("|");
const links = (s) => [...s.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]).join("|");
const bolds = (s) => (s.match(/\*\*/g) || []).length;

let bad = 0;
const err = (f, p, m) => { console.error(`${f} ${p}: ${m}`); bad++; };

function walk(f, a, b, path, key) {
  if (typeof a === "string") {
    if (typeof b !== "string") return err(f, path, "expected string");
    if (EXACT.has(key)) { if (a !== b) err(f, path, `must stay "${a}", got "${b}"`); return; }
    if (!b.trim()) return err(f, path, "empty");
    if (tokens(a) !== tokens(b)) err(f, path, `tokens differ: [${tokens(a)}] vs [${tokens(b)}]`);
    if (links(a) !== links(b)) err(f, path, `link targets differ: [${links(a)}] vs [${links(b)}]`);
    if (bolds(a) !== bolds(b)) err(f, path, "bold markers (**) differ");
    return;
  }
  if (typeof a === "number" || typeof a === "boolean") { if (a !== b) err(f, path, `must be ${a}`); return; }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return err(f, path, `array length ${Array.isArray(b) ? b.length : "?"} != ${a.length}`);
    // arrays of plain keys (sourceKeys, sizes) must match exactly
    a.forEach((v, i) => walk(f, v, b[i], `${path}[${i}]`, key === "sourceKeys" ? "t" : key));
    return;
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object") return err(f, path, "expected object");
    const ka = Object.keys(a).sort().join(","), kb = Object.keys(b).sort().join(",");
    if (ka !== kb) return err(f, path, `keys differ: [${ka}] vs [${kb}]`);
    for (const k of Object.keys(a)) walk(f, a[k], b[k], path ? `${path}.${k}` : k, k);
  }
}

for (const file of files) {
  let t;
  try { t = JSON.parse(readFileSync(join(DIR, file), "utf-8")); } catch (e) { err(file, "", `invalid JSON: ${e.message}`); continue; }
  if (t.meta?.lang !== file.replace(".json", "")) err(file, "meta.lang", "must equal the file name");
  walk(file, en, t, "", "");
}
if (bad) { console.error(`verify-i18n: ${bad} problem(s)`); process.exit(1); }
console.log(`verify-i18n: ${files.length} translation(s) match en.json`);
