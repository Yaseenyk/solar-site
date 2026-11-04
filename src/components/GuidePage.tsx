import JsonLd from "./JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const PUBLISHED = "2026-11-04";

interface Props {
  title: string;
  description: string;
  path: string;
  crumb: string;
  /** One-paragraph direct answer shown at the top (also what answer engines quote). */
  answer: React.ReactNode;
  faqs?: { q: string; a: string }[];
  children: React.ReactNode;
}

export default function GuidePage({ title, description, path, crumb, answer, faqs, children }: Props) {
  return (
    <article className="prose-guide">
      <JsonLd data={articleJsonLd({ title, description, path, published: PUBLISHED, modified: PUBLISHED })} />
      <JsonLd data={breadcrumbJsonLd([{ name: crumb, path }])} />
      {faqs && faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
      <p className="text-sm text-zinc-500">
        <a href="/" className="!text-zinc-500 !no-underline hover:!text-zinc-300">Home</a> / {crumb} · Updated {PUBLISHED}
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{title}</h1>
      <div className="mt-5 rounded-xl border border-cyan/30 bg-cyan/5 p-5 text-zinc-200 [&>p]:mt-0">{answer}</div>
      {children}
      {faqs && faqs.length > 0 && (
        <section>
          <h2>Common questions</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>
      )}
      <p className="sr-only">{SITE_URL}{path}</p>
    </article>
  );
}
