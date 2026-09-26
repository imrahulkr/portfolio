import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Deliberate type scale — every component uses these keys, never
    // arbitrary text-[13px] values, so sizing stays consistent site-wide.
    fontSize: {
      xs: ["13px", { lineHeight: "1.5" }],
      sm: ["14px", { lineHeight: "1.6" }],
      base: ["16px", { lineHeight: "1.7" }],
      lg: ["19px", { lineHeight: "1.6" }],
      xl: ["26px", { lineHeight: "1.35" }],
      "2xl": ["34px", { lineHeight: "1.2" }],
      "3xl": ["46px", { lineHeight: "1.1" }],
      "4xl": ["58px", { lineHeight: "1.05" }],
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        text: {
          DEFAULT: "var(--text)",
          soft: "var(--text-soft)",
        },
        accent: "var(--accent)",
        code: "var(--code-bg)",
        error: "var(--error)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        prose: "70ch",
      },
      typography: {
        // The plugin's default theme hardcodes gray-900/gray-700 for
        // headings, bold text, blockquotes, etc. — those don't track
        // this site's --text CSS variable, so they read as near-invisible
        // dark-gray-on-dark-background in dark mode. Every text-bearing
        // node here is pinned to the same theme-aware variables the rest
        // of the site uses instead of the plugin's own palette.
        DEFAULT: {
          css: {
            maxWidth: "70ch",
            color: "var(--text)",
            "h1, h2, h3, h4, h5, h6": { color: "var(--accent)" },
            "strong, b": { color: "var(--text)" },
            blockquote: { color: "var(--text)", borderLeftColor: "var(--border)" },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            hr: { borderColor: "var(--border)" },
            "ol > li::marker, ul > li::marker": { color: "var(--text-soft)" },
            thead: { color: "var(--text)", borderBottomColor: "var(--border)" },
            "tbody tr": { borderBottomColor: "var(--border)" },
            // 143 of 329 blog chapters contain a Markdown table, and some
            // are wide (many columns). display:block + overflow-x:auto on
            // the <table> itself (rather than requiring a wrapper div MDX
            // doesn't add) makes just that table scroll horizontally on
            // narrow screens instead of forcing the whole page to — the
            // table's own children still lay out as a normal table because
            // they keep their table-row/table-cell display values.
            table: { display: "block", overflowX: "auto" },
            a: { color: "var(--accent)" },
            code: { color: "var(--text)", backgroundColor: "transparent", fontWeight: "400" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            pre: {
              backgroundColor: "var(--code-bg)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            },
            "pre code": { backgroundColor: "transparent", padding: 0 },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
