// Writes out/llms-full.txt: the page text (HTML stripped) for answer engines.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://solar.streamerosai.com";
const parts = [];
function walk(dir, route) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) { if (!n.startsWith("_")) walk(p, `${route}${n}/`); continue; }
    if (n !== "index.html" || route === "404/") continue;
    const html = readFileSync(p, "utf-8");
    const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] || "";
    const text = main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/\s+/g, " ").trim();
    if (text) parts.push(`# ${SITE}/${route === "/" ? "" : route}\n\n${text}`);
  }
}
walk(OUT, "");
writeFileSync(join(OUT, "llms-full.txt"), parts.join("\n\n---\n\n") + "\n");
console.log(`llms-full.txt: ${parts.length} pages`);
