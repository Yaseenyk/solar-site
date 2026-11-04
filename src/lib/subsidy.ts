import { FACTS } from "./facts";

/**
 * Central subsidy for a residential rooftop system. Pure function: the rates come from facts.ts.
 * Worked example from the operational guidelines: 2.5 kW in a normal state = 30,000 x 2 + 18,000 x 0.5 = 69,000.
 */
export function centralSubsidy(kw: number, special = false): number {
  if (!(kw > 0)) return 0;
  const first = special ? FACTS.specialFirstTwo.value : FACTS.ratePerKwFirstTwo.value;
  const third = special ? FACTS.specialThirdKw.value : FACTS.rateThirdKw.value;
  const capped = Math.min(kw, 3);
  return Math.round(Math.min(capped, 2) * first + Math.max(0, capped - 2) * third);
}

export interface Quote {
  /** Vendor's all-in quote in rupees. */
  quote: number;
  kw: number;
  special: boolean;
  /** Monthly electricity bill the system replaces, in rupees. */
  monthlyBill: number;
  /** Share of that bill the system removes, 0 to 1. Editable assumption, not a promise. */
  billCut: number;
}

export function evaluate(q: Quote) {
  const subsidy = centralSubsidy(q.kw, q.special);
  const net = Math.max(0, q.quote - subsidy);
  const yearlySaving = Math.round(q.monthlyBill * 12 * q.billCut);
  const paybackYears = yearlySaving > 0 ? net / yearlySaving : null;
  return { subsidy, net, yearlySaving, paybackYears, perKw: q.kw > 0 ? Math.round(q.quote / q.kw) : 0 };
}

/** Ministry benchmark cost for a system (first 2 kW at one rate, the third kW at another). Not what you will be quoted. */
export function benchmarkCost(kw: number, special = false): number {
  if (!(kw > 0)) return 0;
  const first = special ? FACTS.benchmarkSpecialFirstTwo.value : FACTS.benchmarkFirstTwo.value;
  const third = special ? FACTS.benchmarkSpecialThirdKw.value : FACTS.benchmarkThirdKw.value;
  const capped = Math.min(kw, 3);
  return Math.round(Math.min(capped, 2) * first + Math.max(0, capped - 2) * third);
}
