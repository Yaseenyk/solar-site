import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LANG_ORDER, PAGES, type LangCode, type PageKey } from "./i18n";

/* The shape of src/content/i18n/<lang>.json. en.json is the source; scripts/verify-i18n.mjs keeps the others identical in shape. */

export type Block =
  | { t: "h2" | "h3" | "p" | "note"; x: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "subsidyTable" | "costTable"; sizes: number[] }
  | { t: "stageTable"; head: string[]; rows: string[][] }
  | { t: "calculator" }
  | { t: "form"; ctx: string }
  | { t: "ad"; slot: string };

export interface PageContent {
  title: string;
  metaTitle: string;
  description: string;
  crumb: string;
  answer: string;
  faqs: { q: string; a: string }[];
  blocks: Block[];
  sourceKeys: string[];
}

export interface Ui {
  siteName: string;
  badge: string;
  nav: { subsidy: string; cost: string; apply: string; status: string; calculator: string };
  home: string;
  updated: string;
  sources: string;
  checked: string;
  faq: string;
  ad: string;
  language: string;
  disclaimer: string;
  written: string;
  privacy: string;
  calc: {
    size: string; quote: string; bill: string; cut: string; special: string; noteOver: string; note: string;
    subsidy: string; net: string; payback: string; years: string; na: string; perKw: string; footnote: string;
  };
  form: { name: string; email: string; phone: string; state: string; message: string; submit: string; sending: string; done: string; error: string; note: string };
  table: { system: string; normal: string; special: string; benchmark: string; subsidy: string; net: string; kw: string; capped: string };
}

export interface Content {
  meta: { lang: string; name: string; english: string; dir: "ltr" | "rtl" };
  ui: Ui;
  pages: Record<PageKey, PageContent>;
}

const DIR = join(process.cwd(), "src", "content", "i18n");
const cache = new Map<string, Content>();

export function getContent(lang: string): Content {
  const hit = cache.get(lang);
  if (hit) return hit;
  const c = JSON.parse(readFileSync(join(DIR, `${lang}.json`), "utf-8")) as Content;
  cache.set(lang, c);
  return c;
}

/** Languages that have a translation file, in switcher order. English is always first. */
export function availableLangs(): LangCode[] {
  return LANG_ORDER.filter((l) => existsSync(join(DIR, `${l}.json`)));
}

export const publishedDate = "2026-11-04";

export function pageBySlug(slug: string) {
  return PAGES.find((p) => p.slug === slug);
}
