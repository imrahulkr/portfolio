import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiFileText } from "react-icons/fi";
import { siteConfig } from "@/data/site-config";
import { Logo } from "@/components/layout/logo";

const navigateLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
];

const moreLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume", href: "/resume" },
];

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: FiGithub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: FiLinkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: FiMail },
  { label: "Resume", href: "/resume", icon: FiFileText },
];

const focusRing =
  "hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-soft transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-[1.3fr_1fr_1fr] gap-10 text-sm text-text-soft">
        <div>
          <Link href="/" className={`flex items-center gap-2.5 font-heading text-lg font-semibold text-text ${focusRing}`}>
            <Logo />
            {siteConfig.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-4 max-w-[32ch]">
            Building backend systems that stay predictable — and writing about what I learn along the way.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.label} className={iconButton}>
                <item.icon aria-hidden className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-xs font-semibold uppercase tracking-wide text-text mb-4">Navigate</p>
          <ul className="flex flex-col gap-3">
            {navigateLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={focusRing}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="More">
          <p className="text-xs font-semibold uppercase tracking-wide text-text mb-4">More</p>
          <ul className="flex flex-col gap-3">
            {moreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={focusRing}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-text-soft">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
