import Script from "next/script";

// Plausible: cookieless, so no consent banner is needed. Inert until
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. Point NEXT_PUBLIC_PLAUSIBLE_SRC at a
// self-hosted script if you run your own instance.
const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";

export function Analytics() {
  if (!domain) return null;
  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
