import { FACTS, rupees, type FactKey } from "@/lib/facts";

/** A figure from facts.ts, with a link to where it came from. */
export function Num({ k, money = true }: { k: FactKey; money?: boolean }) {
  const f = FACTS[k];
  const v = typeof f.value === "number" && money ? rupees(f.value) : String(f.value);
  return (
    <a href={f.source} rel="noopener" title={`${f.sourceName}, checked ${f.checked}`} className="font-semibold text-cyan underline decoration-dotted underline-offset-4">
      {v}
    </a>
  );
}

/** Source list shown at the foot of every guide. */
export function Sources({ keys }: { keys: FactKey[] }) {
  const seen = new Map<string, { name: string; checked: string }>();
  for (const k of keys) seen.set(FACTS[k].source, { name: FACTS[k].sourceName, checked: FACTS[k].checked });
  return (
    <section className="mt-12 border-t border-zinc-800 pt-6 text-sm text-zinc-400">
      <h2 className="text-base font-semibold text-zinc-200">Sources</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {[...seen].map(([url, s]) => (
          <li key={url}>
            <a href={url} rel="noopener" className="underline">{s.name}</a> (checked {s.checked})
          </li>
        ))}
      </ul>
    </section>
  );
}
