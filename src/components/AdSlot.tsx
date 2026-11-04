import { AD_MODE, ADSENSE_CLIENT, AD_UNITS } from "@/lib/site";
import AdUnit from "./AdUnit";

/**
 * One Google ad space. Where each slot sits is decided in the content files ({ "t": "ad", "slot": "<name>" }).
 * The box reserves its height up front so a late-loading ad never shifts the text (layout shift hurts Core Web Vitals).
 * Keep ads away from buttons and form fields: AdSense policy forbids placements that invite accidental clicks.
 */
export default function AdSlot({ slot, label, desktopOnly = false }: { slot: string; label: string; desktopOnly?: boolean }) {
  // desktopOnly: on phones this slot is not drawn, so the first screen shows content, not an ad.
  const hide = desktopOnly ? "hidden sm:block" : "";
  if (AD_MODE === "off") return <div data-ad-slot={slot} aria-hidden="true" />;

  if (AD_MODE === "live" && ADSENSE_CLIENT && AD_UNITS[slot]) {
    return (
      <aside data-ad-slot={slot} aria-label={label} className={`my-10 min-h-[250px] text-center sm:min-h-[280px] ${hide}`}>
        <p className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{label}</p>
        <AdUnit client={ADSENSE_CLIENT} unit={AD_UNITS[slot]} />
      </aside>
    );
  }

  // Preview: a visible, labelled placeholder showing where the ad will go.
  return (
    <aside
      data-ad-slot={slot}
      aria-label={label}
      className={`my-10 min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed border-amber-400/50 bg-amber-400/5 text-center sm:min-h-[280px] ${desktopOnly ? "hidden sm:flex" : "flex"}`}
    >
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 font-mono text-sm text-amber-300">GOOGLE AD SLOT · {slot}</p>
      <p className="mt-1 text-xs text-zinc-500">responsive display ad · reserved 250-280 px</p>
    </aside>
  );
}
