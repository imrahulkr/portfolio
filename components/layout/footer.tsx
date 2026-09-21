import Link from "next/link";
import { siteConfig } from "@/data/site-config";

const quickLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const focusRing =
  "hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-8 text-xs text-text-soft">
        <div>
          <p className="text-text font-heading font-medium">{siteConfig.name}</p>
          <p>{siteConfig.role}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href} className={focusRing}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          <a href={siteConfig.links.github} className={focusRing}>GitHub</a>
          <a href={siteConfig.links.linkedin} className={focusRing}>LinkedIn</a>
          <a href={`mailto:${siteConfig.email}`} className={focusRing}>Email</a>
        </div>
        <div>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
