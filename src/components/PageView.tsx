import Link from "next/link";
import JsonLd from "./JsonLd";
import Calculator from "./Calculator";
import LeadForm from "./LeadForm";
import AdSlot from "./AdSlot";
import Chrome from "./Chrome";
import { Rich, fill, plain } from "@/lib/rich";
import { FACTS, rupees, type FactKey } from "@/lib/facts";
import { benchmarkCost, centralSubsidy } from "@/lib/subsidy";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getContent, publishedDate, type Block } from "@/lib/content";
import { pagePath, PAGES, type PageKey } from "@/lib/i18n";

const th = "border-b border-zinc-700 px-3 py-2 text-start font-semibold text-zinc-300";
const td = "border-b border-zinc-800 px-3 py-2 align-top";

export function Sources({ keys, title, checked }: { keys: string[]; title: string; checked: string }) {
  const seen = new Map<string, { name: string; date: string }>();
  for (const k of keys) {
    const f = FACTS[k as FactKey];
    seen.set(f.source, { name: f.sourceName, date: f.checked });
  }
  if (!seen.size) return null;
  return (
    <section className="mt-12 border-t border-zinc-800 pt-6 text-sm text-zinc-400">
      <h2 className="!mt-0 !text-base font-semibold text-zinc-200">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 ps-5">
        {[...seen].map(([url, s]) => (
          <li key={url}>
            <a href={url} rel="noopener" className="underline">{s.name}</a> ({checked} {s.date})
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Links to the other guides, so every page leads to the rest of the site. */
function MoreGuides({ lang, current }: { lang: string; current: PageKey }) {
  const c = getContent(lang);
  const skip = new Set<PageKey>([current, "home", "privacy"]);
  return (
    <nav className="mt-12 border-t border-zinc-800 pt-6" aria-label={c.ui.moreGuides}>
      <h2 className="!mt-0 !text-base font-semibold text-zinc-200">{c.ui.moreGuides}</h2>
      <ul className="mt-3 flex flex-wrap gap-2 !list-none !ps-0">
        {PAGES.filter((x) => !skip.has(x.key)).map((x) => (
          <li key={x.key}>
            <Link href={pagePath(lang, x.slug)} className="block rounded-full border border-zinc-700 px-3 py-1.5 text-sm !text-zinc-300 !no-underline hover:border-cyan hover:!text-cyan">
              {c.pages[x.key].crumb}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BlockView({ b, lang, i }: { b: Block; lang: string; i: number }) {
  const c = getContent(lang);
  const r = (s: string) => <Rich text={s} lang={lang} />;
  switch (b.t) {
    case "h2": return <h2>{r(b.x)}</h2>;
    case "h3": return <h3>{r(b.x)}</h3>;
    case "p": return <p>{r(b.x)}</p>;
    case "note": return <p className="rounded-lg border border-zinc-700 bg-zinc-900/60 p-4">{r(b.x)}</p>;
    case "ul": return <ul>{b.items.map((x, j) => <li key={j}>{r(x)}</li>)}</ul>;
    case "ol": return <ol>{b.items.map((x, j) => <li key={j}>{r(x)}</li>)}</ol>;
    case "calculator": return <Calculator t={c.ui.calc} />;
    case "form": return <LeadForm t={c.ui.form} lang={lang} context={b.ctx} />;
    case "ad": return <AdSlot slot={b.slot} label={c.ui.ad} />;
    case "subsidyTable":
      return (
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th className={th}>{c.ui.table.system}</th><th className={th}>{c.ui.table.normal}</th><th className={th}>{c.ui.table.special}</th></tr></thead>
            <tbody>
              {b.sizes.map((kw) => (
                <tr key={kw}>
                  <td className={td}>{fill(kw > 3 ? c.ui.table.capped : c.ui.table.kw, { n: kw })}</td>
                  <td className={td}>{rupees(centralSubsidy(kw))}</td>
                  <td className={td}>{rupees(centralSubsidy(kw, true))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "costTable":
      return (
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th className={th}>{c.ui.table.system}</th><th className={th}>{c.ui.table.benchmark}</th><th className={th}>{c.ui.table.subsidy}</th><th className={th}>{c.ui.table.net}</th></tr></thead>
            <tbody>
              {b.sizes.map((kw) => (
                <tr key={kw}>
                  <td className={td}>{fill(c.ui.table.kw, { n: kw })}</td>
                  <td className={td}>{rupees(benchmarkCost(kw))}</td>
                  <td className={td}>{rupees(centralSubsidy(kw))}</td>
                  <td className={`${td} font-semibold text-cyan`}>{rupees(benchmarkCost(kw) - centralSubsidy(kw))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "stageTable":
      return (
        <div className="overflow-x-auto">
          <table>
            <thead><tr>{b.head.map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((row, j) => <tr key={`${i}-${j}`}>{row.map((cell, k) => <td key={k} className={td}>{r(cell)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
  }
}

export default function PageView({ lang, pageKey }: { lang: string; pageKey: PageKey }) {
  const c = getContent(lang);
  const p = c.pages[pageKey];
  const slug = PAGES.find((x) => x.key === pageKey)!.slug;
  const path = pagePath(lang, slug);
  const isHome = pageKey === "home";
  return (
    <Chrome lang={lang} slug={slug}>
      <article className="prose-guide">
        {!isHome && <JsonLd data={articleJsonLd({ title: p.title, description: plain(p.description), path, published: publishedDate, modified: publishedDate, lang })} />}
        {!isHome && <JsonLd data={breadcrumbJsonLd([{ name: c.ui.home, path: pagePath(lang, "") }, { name: p.crumb, path }])} />}
        {p.faqs.length > 0 && <JsonLd data={faqJsonLd(p.faqs.map((f) => ({ q: plain(f.q), a: plain(f.a) })))} />}

        {isHome ? (
          <p className="font-mono text-sm text-cyan">{c.ui.badge}</p>
        ) : (
          <p className="text-sm text-zinc-500">
            <Link href={pagePath(lang, "")} className="-ms-2 inline-block px-2 py-2 !text-zinc-500 !no-underline hover:!text-zinc-300">{c.ui.home}</Link> / {p.crumb} · {c.ui.updated} {publishedDate}
          </p>
        )}
        <h1 className="mt-3 text-2xl font-bold leading-tight text-zinc-50 [overflow-wrap:anywhere] sm:text-3xl md:text-4xl">{p.title}</h1>
        <div className="mt-5 rounded-xl border border-cyan/30 bg-cyan/5 p-4 leading-relaxed text-zinc-200 sm:p-5">
          <Rich text={p.answer} lang={lang} />
        </div>
        {pageKey !== "privacy" && <AdSlot slot={`${pageKey}-hero`} label={c.ui.ad} desktopOnly />}

        {p.blocks.map((b, i) => <BlockView key={i} b={b} lang={lang} i={i} />)}

        {p.faqs.length > 0 && (
          <section>
            <h2>{c.ui.faq}</h2>
            {p.faqs.map((f) => (
              <div key={f.q}>
                <h3><Rich text={f.q} lang={lang} /></h3>
                <p><Rich text={f.a} lang={lang} /></p>
              </div>
            ))}
          </section>
        )}
        <Sources keys={p.sourceKeys} title={c.ui.sources} checked={c.ui.checked} />
        <MoreGuides lang={lang} current={pageKey} />
      </article>
    </Chrome>
  );
}
