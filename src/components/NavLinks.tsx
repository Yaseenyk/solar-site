"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The page links in the header. The page you are on is marked (aria-current, a cyan underline on desktop, a tinted pill on a phone).
 * No border on desktop; the keyboard focus ring shows only for keyboard users. On a phone the links are a swipeable row of 44px pills.
 */
export default function NavLinks({ items }: { items: { href: string; label: string; home?: boolean }[] }) {
  const path = usePathname() || "/";
  return (
    <div className="order-3 -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 md:order-2 md:mx-0 md:w-auto md:flex-1 md:flex-wrap md:justify-end md:gap-0.5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      {items.map((it) => {
        const on = path === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={on ? "page" : undefined}
            className={`relative inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan md:rounded-md md:px-3 ${
              on ? "bg-cyan/10 font-medium text-cyan md:bg-transparent md:text-zinc-50" : "bg-zinc-900/60 text-zinc-300 hover:text-zinc-50 md:bg-transparent md:text-zinc-400"
            }`}
          >
            {it.label}
            <span aria-hidden="true" className={`absolute inset-x-3 bottom-1.5 hidden h-0.5 rounded-full bg-cyan transition-opacity md:block ${on ? "opacity-100" : "opacity-0"}`} />
          </Link>
        );
      })}
    </div>
  );
}
