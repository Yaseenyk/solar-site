import Link from "next/link";
import type { ReactNode } from "react";
import { FACTS, rupees, type FactKey } from "./facts";
import { benchmarkCost, centralSubsidy } from "./subsidy";
import { CONTACT_EMAIL } from "./site";
import { localizeHref } from "./i18n";

/**
 * Rich text used in the content files. Words are translated; figures never are:
 *   {{fact:key}} money from facts.ts, linked to its source     {{num:key}} plain number from facts.ts, linked
 *   {{sub:kw}} {{bench:kw}} {{net:kw}}  computed in code ("sub:2.5:s" = special category state)
 *   {{link:consumerLogin}} link to a URL fact                  {{email}} the contact address
 *   [text](url) link (a leading / means "this page in the current language")      **bold**
 */
type Piece = { text: string; href?: string; title?: string; computed?: boolean };

function resolve(token: string): Piece {
  const [kind, arg, flag] = token.split(":");
  const special = flag === "s";
  switch (kind) {
    case "fact": {
      const f = FACTS[arg as FactKey];
      return { text: typeof f.value === "number" ? rupees(f.value) : String(f.value), href: f.source, title: `${f.sourceName}, checked ${f.checked}` };
    }
    case "num": {
      const f = FACTS[arg as FactKey];
      return { text: String(f.value), href: f.source, title: `${f.sourceName}, checked ${f.checked}` };
    }
    case "sub":
      return { text: rupees(centralSubsidy(Number(arg), special)), computed: true };
    case "bench":
      return { text: rupees(benchmarkCost(Number(arg), special)), computed: true };
    case "net":
      return { text: rupees(benchmarkCost(Number(arg), special) - centralSubsidy(Number(arg), special)), computed: true };
    case "rwa": {
      // {{rwa:HOUSES:KW}}: society subsidy = rate x lower of (houses x 3 kW) and the plant size, capped at 500 kW.
      const capacity = Math.min(Number(arg) * FACTS.societyPerHouseKw.value, Number(flag), FACTS.societyMaxKw.value);
      return { text: rupees(FACTS.societyRate.value * capacity), computed: true };
    }
    case "link": {
      const f = FACTS[arg as FactKey];
      return { text: String(f.value).replace(/^https?:\/\//, "").replace(/\/$/, ""), href: String(f.value) };
    }
    case "email":
      return { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` };
    default:
      throw new Error(`unknown token {{${token}}}`);
  }
}

const SPLIT = /(\{\{[^}]+\}\}|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
const external = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

/** Replace {name} placeholders (used in the UI strings). */
export function fill(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{([a-zA-Z]+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export function Rich({ text, lang }: { text: string; lang: string }): ReactNode {
  return text.split(SPLIT).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("{{")) {
      const r = resolve(part.slice(2, -2));
      const cls = "font-semibold text-cyan";
      if (!r.href) return <span key={i} className={cls}>{r.text}</span>;
      return <a key={i} href={r.href} rel="noopener" title={r.title} className={r.text.startsWith("₹") || /^\d+$/.test(r.text) ? `${cls} underline decoration-dotted underline-offset-4` : ""}>{r.text}</a>;
    }
    if (part.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)!;
      if (external(m[2])) return <a key={i} href={m[2]} rel="noopener">{m[1]}</a>;
      return <Link key={i} href={localizeHref(lang, m[2])}>{m[1]}</Link>;
    }
    if (part.startsWith("**")) return <strong key={i} className="text-zinc-100">{part.slice(2, -2)}</strong>;
    return part;
  });
}

/** Plain text for JSON-LD and meta: tokens resolved, markdown removed. */
export function plain(text: string): string {
  return text
    .replace(/\{\{([^}]+)\}\}/g, (_, t) => resolve(t).text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");
}
