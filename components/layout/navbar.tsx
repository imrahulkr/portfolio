"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Blog", href: "/blog", sectionId: null },
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sectionIds = navItems.map((item) => item.sectionId).filter((id): id is string => id !== null);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (item: (typeof navItems)[number]) =>
    item.sectionId === null ? pathname.startsWith("/blog") : pathname === "/" && activeSection === item.sectionId;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur transition-[padding] duration-150 motion-reduce:transition-none ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className={`font-heading font-semibold text-sm text-text ${focusRing}`}>
          Rahul Kumar
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-text-soft">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item) ? "page" : undefined}
              className={`hover:text-text transition-colors ${isActive(item) ? "text-text" : ""} ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link
            href="/resume"
            aria-current={pathname === "/resume" ? "page" : undefined}
            className={`px-3 py-1.5 rounded border border-border hover:border-accent text-text transition-colors ${focusRing}`}
          >
            Resume
          </Link>
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border border-border hover:border-accent text-text-soft transition-colors ${focusRing}`}
          >
            <span>Search</span>
            <kbd className="text-xs font-mono border border-border rounded px-1">⌘K</kbd>
          </button>
          {mounted && (
            <button
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className={`w-8 h-8 flex items-center justify-center rounded border border-border hover:border-accent transition-colors ${focusRing}`}
            >
              {resolvedTheme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}
        </div>

        <button
          className={`md:hidden text-text ${focusRing}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden mt-4 px-6 pb-4 flex flex-col gap-4 text-sm border-t border-border pt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive(item) ? "page" : undefined}
              className={`${isActive(item) ? "text-text" : "text-text-soft"} ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/resume" onClick={() => setMobileOpen(false)} className={`text-text-soft ${focusRing}`}>Resume</Link>
          <button
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new Event("open-command-palette"));
            }}
            className={`text-left text-text-soft ${focusRing}`}
          >
            Search (⌘K)
          </button>
          {mounted && (
            <button className={`text-left text-text-soft ${focusRing}`} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
              {resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
