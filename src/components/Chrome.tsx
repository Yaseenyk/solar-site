import Link from "next/link";
import { getContent, availableLangs } from "@/lib/content";
import { pagePath, hreflang } from "@/lib/i18n";
import { PORTFOLIO_URL } from "@/lib/site";

/** Header, language switcher and footer around a page. The wrapper carries the page's language and direction. */
export default function Chrome({ lang, slug, children }: { lang: string; slug: string; children: React.ReactNode }) {
  const c = getContent(lang);
  const langs = availableLangs();
  const nav = [
    { href: pagePath(lang, "pm-surya-ghar-subsidy"), label: c.ui.nav.subsidy },
    { href: pagePath(lang, "solar-system-cost-india-subsidy"), label: c.ui.nav.cost },
    { href: pagePath(lang, "pm-surya-ghar-apply"), label: c.ui.nav.apply },
    { href: pagePath(lang, "pm-surya-ghar-subsidy-status"), label: c.ui.nav.status },
    { href: pagePath(lang, "solar-subsidy-calculator"), label: c.ui.nav.calculator },
  ];
  return (
    <div lang={hreflang(lang)} dir={c.meta.dir}>
      <header className="border-b border-zinc-800/70">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 text-sm" aria-label="Main">
          <Link href={pagePath(lang, "")} className="font-semibold text-zinc-50">☀ {c.ui.siteName}</Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-zinc-400">
            {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-zinc-100">{n.label}</Link>)}
            <details className="relative">
              <summary className="cursor-pointer list-none rounded-md border border-zinc-700 px-2.5 py-1 text-zinc-300 hover:border-zinc-500">🌐 {c.meta.name}</summary>
              <ul className="absolute end-0 z-10 mt-2 grid max-h-80 w-44 gap-0.5 overflow-y-auto rounded-lg border border-zinc-700 bg-ink p-1.5 shadow-xl" aria-label={c.ui.language}>
                {langs.map((l) => (
                  <li key={l}>
                    <Link
                      href={pagePath(l, slug)}
                      hrefLang={hreflang(l)}
                      lang={hreflang(l)}
                      className={`block rounded px-2.5 py-1.5 hover:bg-zinc-800 ${l === lang ? "text-cyan" : "text-zinc-300"}`}
                    >
                      {getContent(l).meta.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl px-6 py-10">{children}</main>
      <footer className="mx-auto mt-16 w-full max-w-5xl border-t border-zinc-800/60 px-6 py-10 text-sm text-zinc-500">
        <p>{c.ui.disclaimer}</p>
        <p className="mt-3">
          © {new Date().getFullYear()} {c.ui.siteName}. {c.ui.written} <a href={`${PORTFOLIO_URL}/`} className="text-zinc-300 underline">Yaseen Khatib</a> ·{" "}
          <Link href={pagePath(lang, "privacy")} className="underline">{c.ui.privacy}</Link>
        </p>
      </footer>
    </div>
  );
}
