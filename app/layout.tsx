import type { Metadata } from "next";
import { Public_Sans, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { siteConfig, siteUrl } from "@/data/site-config";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Kumar — Software Engineer",
  description:
    "Backend and full-stack engineer building scalable systems with Java, Spring Boot, and React. Writing engineering notes on Spring Boot, system design, and Java.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Rahul Kumar — Software Engineer",
    description: "Backend and full-stack engineer building scalable systems with Java, Spring Boot, and React.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Rahul Kumar — Software Engineer" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  email: siteConfig.email,
  url: siteUrl,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.leetcode],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${publicSans.variable} ${sourceSans3.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-text focus:text-bg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
