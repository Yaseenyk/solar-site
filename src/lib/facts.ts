/**
 * Every number the site states lives here, with where it came from and the day it was checked.
 * Pages import from this file instead of typing figures inline, and scripts/verify-facts.mjs
 * fails the build if an entry loses its source or its date. When a rule changes, change it here once.
 */
export interface Fact {
  /** Plain-language claim. */
  text: string;
  value: number | string;
  source: string;
  sourceName: string;
  checked: string;
}

const CHECKED = "2026-11-04";
const SQ_2026 = "https://solarquarter.com/2026/09/01/pm-surya-ghar-scheme-mnre-details-rooftop-solar-subsidy-guidelines-for-residential-consumers/";
const SQ_2024 = "https://solarquarter.com/2024/03/18/india-launches-pm-surya-ghar-muft-bijli-yojana-with-%e2%82%b975021-crore-outlay-for-rooftop-solar-power-adoption";
const PORTAL = "https://pmsuryaghar.gov.in/";

export const FACTS = {
  ratePerKwFirstTwo: {
    text: "Central subsidy per kW for the first 2 kW of a residential system",
    value: 30000,
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  rateThirdKw: {
    text: "Central subsidy for the additional (third) kW",
    value: 18000,
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  maxSubsidy: {
    text: "Maximum central subsidy per household (capped at 3 kW)",
    value: 78000,
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  specialFirstTwo: {
    text: "Subsidy per kW for the first 2 kW in special category states and UTs",
    value: 33000,
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  specialThirdKw: {
    text: "Subsidy for the third kW in special category states and UTs",
    value: 19800,
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  societyRate: {
    text: "Subsidy per kW for common facilities of a housing society or RWA, up to 500 kW",
    value: 18000,
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  outlayCrore: {
    text: "Total outlay of the scheme, in rupees crore",
    value: 75021,
    source: SQ_2024,
    sourceName: "SolarQuarter, 18 Mar 2024",
    checked: CHECKED,
  },
  targetHomes: {
    text: "Target: households with rooftop solar by FY 2026-27",
    value: "one crore (10 million)",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  cabinetApproval: {
    text: "Union Cabinet approval date",
    value: "29 February 2024",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026 (other reports give 15 Feb 2024 for the launch)",
    checked: CHECKED,
  },
  capexOnly: {
    text: "The residential subsidy applies to the capex model: you pay the installation cost first",
    value: "capex model",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  domesticContent: {
    text: "Subsidised modules must be domestically manufactured using domestic cells",
    value: "Domestic Content Requirement",
    source: SQ_2026,
    sourceName: "SolarQuarter, 1 Sep 2026, summarising MNRE guidelines",
    checked: CHECKED,
  },
  officialPortal: {
    text: "Official national portal for applications",
    value: PORTAL,
    source: PORTAL,
    sourceName: "National Portal for Rooftop Solar, MNRE",
    checked: CHECKED,
  },
} satisfies Record<string, Fact>;

export type FactKey = keyof typeof FACTS;

export const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

/** Special category states and UTs named in the scheme guidelines. */
export const SPECIAL_CATEGORY = [
  "North-Eastern states (including Sikkim)",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Ladakh",
  "Andaman & Nicobar Islands",
  "Lakshadweep",
];
