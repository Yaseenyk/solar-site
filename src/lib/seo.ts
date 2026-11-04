import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PORTFOLIO_URL } from "./site";

const PERSON_ID = `${PORTFOLIO_URL}/#person`;

/** Sitewide entity graph. The author is referenced by @id, never redeclared (the portfolio owns the Person). */
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function articleJsonLd(o: { title: string; description: string; path: string; published: string; modified: string; lang: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: o.title,
    description: o.description,
    url: `${SITE_URL}${o.path}`,
    mainEntityOfPage: `${SITE_URL}${o.path}`,
    datePublished: o.published,
    dateModified: o.modified,
    inLanguage: o.lang === "en" ? "en-IN" : o.lang,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
