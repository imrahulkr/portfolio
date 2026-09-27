// NEXT_PUBLIC_SITE_URL must be the live origin (set on the host, e.g. Vercel). Falls back to example.com only when unset.
// Trailing slashes are stripped so a value like "https://example.com/" (easy to paste into
// a hosting dashboard) can't produce "//blog" URLs in the sitemap, robots file, and JSON-LD.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").trim().replace(/\/+$/, "");

export const siteConfig = {
  name: "Rahul Kumar",
  role: "Software Engineer",
  email: "rahul31774@gmail.com",
  phone: "+91 8340510367",
  leetcodeUsername: "rahul31774", // used by lib/leetcode.ts for live stats
  links: {
    github: "https://github.com/imrahulkr",
    linkedin: "https://www.linkedin.com/in/rahul31774/",
    leetcode: "https://leetcode.com/u/rahul31774/",
    resume: "/resume.pdf", // TODO: drop your resume PDF into /public
  },
};
