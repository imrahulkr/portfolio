/** @type {import('next').NextConfig} */

// ---------------------------------------------------------------------------
// Security headers.
//
// The basic set (nosniff, referrer policy, frame denial, permissions policy)
// applies everywhere. The Content-Security-Policy applies to production builds
// only, because the dev server needs 'unsafe-eval' for hot reloading.
//
// Known trade-off: script-src includes 'unsafe-inline'. Next.js injects small
// inline bootstrap scripts, and a nonce-based policy would force every page to
// render dynamically, giving up static generation. Everything else is locked
// to what the site actually loads:
//   - Google reCAPTCHA v3 (contact form): script, frame, and connect to google.com
//   - Plausible analytics (only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set)
//   - LeetCode badge images on the About section and resume page
// If you add a new third-party script, image host, or embed, add its origin here
// or the browser will block it (check the console for "Content Security Policy").
// ---------------------------------------------------------------------------

function originOf(url) {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

const analyticsOrigin = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  ? originOf(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js")
  : null;

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://assets.leetcode.com https://leetcode.com https://www.gstatic.com https://www.google.com",
  "font-src 'self' data:",
  `connect-src 'self' https://www.google.com${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
  "frame-src https://www.google.com https://recaptcha.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
    : []),
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
