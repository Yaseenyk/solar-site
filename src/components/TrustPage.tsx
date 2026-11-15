import Link from "next/link";
import type { Metadata } from "next";
import Chrome from "./Chrome";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const TRUST_UPDATED = "2026-11-16";

/** Metadata for the English-only trust pages (About, Contact, Terms). Not translated on purpose: see About. */
export function trustMetadata(slug: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}/${slug}/`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Surya Ghar Guide", locale: "en_IN" },
  };
}

/** Shell for a plain English page that sits outside the translated guide set. */
export default function TrustPage({ slug, title, crumb, lead, children }: { slug: string; title: string; crumb: string; lead: string; children: React.ReactNode }) {
  return (
    <Chrome lang="en" slug="">
      <JsonLd data={breadcrumbJsonLd([{ name: crumb, path: `/${slug}/` }])} />
      <article className="prose-guide">
        <p className="text-sm text-zinc-500">
          <Link href="/" className="-ms-2 inline-block px-2 py-2 !text-zinc-500 !no-underline hover:!text-zinc-300">Home</Link> / {crumb} · Updated {TRUST_UPDATED}
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-zinc-50 sm:text-3xl md:text-4xl">{title}</h1>
        <div className="mt-5 rounded-xl border border-cyan/30 bg-cyan/5 p-4 leading-relaxed text-zinc-200 sm:p-5">{lead}</div>
        {children}
      </article>
    </Chrome>
  );
}
