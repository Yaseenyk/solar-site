"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** The AdSense unit itself. Only rendered when AD_MODE is "live" and the account is set up. */
export default function AdUnit({ client, unit }: { client: string; unit: string }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* an ad blocker or an unapproved account must never break the page */
    }
  }, []);
  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={unit} data-ad-format="auto" data-full-width-responsive="true" />;
}
