"use client";

import { useState } from "react";
import { evaluate, centralSubsidy } from "@/lib/subsidy";
import { rupees } from "@/lib/facts";

const num = (s: string) => {
  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const field = "w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2.5 text-zinc-100 focus:border-cyan focus:outline-none";

export default function Calculator() {
  const [kw, setKw] = useState("3");
  const [quote, setQuote] = useState("200000");
  const [bill, setBill] = useState("3000");
  const [cut, setCut] = useState("80");
  const [special, setSpecial] = useState(false);

  const r = evaluate({ quote: num(quote), kw: num(kw), special, monthlyBill: num(bill), billCut: Math.min(100, Math.max(0, num(cut))) / 100 });
  const over = num(kw) > 3;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-7" data-calculator>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-zinc-400">
          System size (kW)
          <input inputMode="decimal" className={field} value={kw} onChange={(e) => setKw(e.target.value)} aria-describedby="kw-note" />
        </label>
        <label className="block text-sm text-zinc-400">
          Vendor&apos;s total quote (₹)
          <input inputMode="numeric" className={field} value={quote} onChange={(e) => setQuote(e.target.value)} />
        </label>
        <label className="block text-sm text-zinc-400">
          Your monthly electricity bill (₹)
          <input inputMode="numeric" className={field} value={bill} onChange={(e) => setBill(e.target.value)} />
        </label>
        <label className="block text-sm text-zinc-400">
          Share of the bill the system removes (%)
          <input inputMode="numeric" className={field} value={cut} onChange={(e) => setCut(e.target.value)} />
        </label>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" checked={special} onChange={(e) => setSpecial(e.target.checked)} className="h-4 w-4 accent-cyan" />
        My state is a special category state or UT (North-East, Uttarakhand, Himachal, J&amp;K, Ladakh, A&amp;N, Lakshadweep)
      </label>
      <p id="kw-note" className="mt-2 text-xs text-zinc-500">
        {over ? "The central subsidy stops at 3 kW; the extra capacity gets none, so only 3 kW is counted." : `For ${num(kw) || 0} kW the central subsidy is ${rupees(centralSubsidy(num(kw), special))}.`}
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl bg-ink/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Central subsidy</dt>
          <dd className="mt-1 text-2xl font-semibold text-cyan">{rupees(r.subsidy)}</dd>
        </div>
        <div className="rounded-xl bg-ink/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Cost after subsidy</dt>
          <dd className="mt-1 text-2xl font-semibold text-zinc-100">{rupees(r.net)}</dd>
        </div>
        <div className="rounded-xl bg-ink/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-zinc-500">Payback</dt>
          <dd className="mt-1 text-2xl font-semibold text-zinc-100">{r.paybackYears === null ? "n/a" : `${r.paybackYears.toFixed(1)} years`}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-zinc-400">
        Quote works out to {rupees(r.perKw)} per kW. You pay the full quote first; the subsidy is paid back to you afterwards. The savings figure is your own
        assumption (bill share removed), not a measured result, and ignores tariff changes, loan interest and maintenance.
      </p>
    </div>
  );
}
