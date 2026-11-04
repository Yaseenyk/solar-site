import { notFound } from "next/navigation";
import { availableLangs } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import PageView from "@/components/PageView";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableLangs().filter((l) => l !== "en").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }) {
  return pageMetadata(params.lang, "home");
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!availableLangs().includes(params.lang as never)) notFound();
  return <PageView lang={params.lang} pageKey="home" />;
}
