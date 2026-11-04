import { AD_MODE, ADSENSE_CLIENT, AD_UNITS } from "@/lib/site";
import AdUnit from "./AdUnit";

/**
 * One Google ad space. Where each slot sits is decided in the content files ({ "t": "ad", "slot": "<name>" }).
 * The box reserves its height up front so a late-loading ad never shifts the text (layout shift hurts Core Web Vitals).
 * Keep ads away from buttons and form fields: AdSense policy forbids placements that invite accidental clicks.
 */
export default function AdSlot({ slot, label }: { slot: string; label: string }) {
  if (AD_MODE === "off") return <div data-ad-slot={slot} aria-hidden="true" />;

  if (AD_MODE === "live" && ADSENSE_CLIENT && AD_UNITS[slot]) {
    return (
      <aside data-ad-slot={slot} aria-label={label} className="my-10 min-h-[280px] text-center">
        <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-600">{label}</p>
        <AdUnit client={ADSENSE_CLIENT} unit={AD_UNITS[slot]} />
      </aside>
    );
  }

  // Preview: a visible, labelled placeholder showing where the ad will go.
  return (
    <aside
      data-ad-slot={slot}
      aria-label={label}
      className="my-10 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-amber-400/50 bg-amber-400/5 text-center"
    >
      <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 font-mono text-sm text-amber-300">GOOGLE AD SLOT · {slot}</p>
      <p className="mt-1 text-xs text-zinc-500">responsive display ad · reserved 280 px</p>
    </aside>
  );
}
