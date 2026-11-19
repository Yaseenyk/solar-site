// Fails the build if a built page in a language AdSense does not support contains ad code.
// AdSense's supported languages: https://support.google.com/adsense/answer/9727 (checked 2026-11-19).
// The allow-list lives in src/lib/site.ts (ADSENSE_LANGS); the site's languages in src/lib/i18n.ts (LANG_ORDER).
// A page's language is taken from its folder (out/<lang>/...) and from the lang attribute of its content wrapper,
// so an unsupported-language page is caught whichever way it was built.
// Usage: node scripts/verify-ad-langs.mjs [outDir]   (default: out)
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = process.argv[2] || "out";
const listFrom = (file, name) => {
  const src = readFileSync(file, "utf-8");
  const m = src.match(new RegExp(`${name}[^=]*=\\s*\\[([^\\]]*)\\]`));
  if (!m) throw new Error(`verify-ad-langs: could not find ${name} in ${file}`);
  return [...m[1].matchAll(/"([a-z-]+)"/g)].map((x) => x[1]);
};

const allowed = new Set(listFrom("src/lib/site.ts", "ADSENSE_LANGS"));
const siteLangs = listFrom("src/lib/i18n.ts", "LANG_ORDER");
const unsupported = new Set(siteLangs.filter((l) => !allowed.has(l)));

let bad = 0;
const fail = (m) => { console.error(`verify-ad-langs: ${m}`); bad++; };

// Odia and Assamese are not on Google's list; if either ever lands in the allow-list, stop and re-check the list.
for (const l of ["or", "as"]) if (allowed.has(l)) fail(`"${l}" is in ADSENSE_LANGS but AdSense does not support it (answer 9727)`);
if (!existsSync(OUT)) { console.error(`verify-ad-langs: ${OUT}/ not found, run next build first`); process.exit(1); }

// Ad code markers: the loader script, the ad unit, and the slot wrapper.
const MARKERS = [/adsbygoogle/i, /pagead2\./i, /googlesyndication/i, /data-ad-client/i, /data-ad-slot/i];
const wrapperLang = (html) => html.match(/<div lang="([a-zA-Z-]+)"[^>]*class="overflow-x-clip"/)?.[1]?.split("-")[0];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== "_next") yield* walk(p); }
    else if (/\.(html|txt)$/.test(name)) yield p;
  }
}

let checked = 0;
for (const file of walk(OUT)) {
  const rel = relative(OUT, file).split(sep).join("/");
  const text = readFileSync(file, "utf-8");
  const folderLang = rel.includes("/") ? rel.split("/")[0] : "";
  const langs = new Set([folderLang, file.endsWith(".html") ? wrapperLang(text) : ""].filter((l) => l && unsupported.has(l)));
  if (!langs.size) continue;
  checked++;
  for (const re of MARKERS) if (re.test(text)) fail(`${rel} (${[...langs].join(",")}) contains ad code: ${re.source}`);
}

if (unsupported.size && !checked) fail(`no built pages found for ${[...unsupported].join(", ")}; is the language detection broken?`);
if (bad) process.exit(1);
console.log(`verify-ad-langs: ${checked} built files in ${[...unsupported].join(", ") || "no"} (not AdSense-supported) carry no ad code; allow-list: ${[...allowed].join(", ")}`);
