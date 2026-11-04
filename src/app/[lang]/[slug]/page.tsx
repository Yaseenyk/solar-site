import { notFound } from "next/navigation";
import { availableLangs } from "@/lib/content";
import { PAGES } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta";
import PageView from "@/components/PageView";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableLangs()
    .filter((l) => l !== "en")
    .flatMap((lang) => PAGES.filter((p) => p.slug).map((p) => ({ lang, slug: p.slug })));
}

const keyFor = (slug: string) => PAGES.find((p) => p.slug === slug)?.key;

export function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  return pageMetadata(params.lang, keyFor(params.slug)!);
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  const key = keyFor(params.slug);
  if (!key || !availableLangs().includes(params.lang as never)) notFound();
  return <PageView lang={params.lang} pageKey={key} />;
}
