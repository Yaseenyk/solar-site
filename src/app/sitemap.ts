import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "@/lib/site";
import { routeDate } from "@/lib/lastmod";

export const dynamic = "force-static";

const APP = join(process.cwd(), "src", "app");
const FALLBACK = "2026-11-04";

/** Every folder under src/app that holds a page.tsx. */
function routes(dir = APP, prefix = ""): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name.startsWith("[") || name.startsWith("_")) continue;
    const route = `${prefix}/${name}`;
    try {
      statSync(join(full, "page.tsx"));
      out.push(route);
    } catch {
      /* no page here */
    }
    out.push(...routes(full, route));
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: routeDate("src/app/page.tsx", FALLBACK), changeFrequency: "weekly", priority: 1 },
    ...routes().map((r) => ({
      url: `${SITE_URL}${r}/`,
      lastModified: routeDate(`src/app${r}`, FALLBACK),
      changeFrequency: "monthly" as const,
      priority: r === "/privacy" ? 0.2 : 0.8,
    })),
  ];
}
