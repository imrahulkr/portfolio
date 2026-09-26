"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

type Command = {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    triggerRef.current?.focus();
  }, []);

  const navigate = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const openExternal = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "nav-home", label: "Go to Home", group: "Navigate", run: () => navigate("/") },
      { id: "nav-services", label: "Go to Services", group: "Navigate", run: () => navigate("/#services") },
      { id: "nav-projects", label: "Go to Projects", group: "Navigate", run: () => navigate("/#projects") },
      { id: "nav-blog", label: "Go to Blog", group: "Navigate", run: () => navigate("/blog") },
      { id: "nav-blog-search", label: "Search the blog", group: "Navigate", run: () => navigate("/blog#search") },
      { id: "nav-resume", label: "Go to Resume", group: "Navigate", run: () => navigate("/resume") },
      { id: "nav-experience", label: "Go to Experience", group: "Navigate", run: () => navigate("/#experience") },
      { id: "nav-about", label: "Go to About", group: "Navigate", run: () => navigate("/#about") },
      { id: "nav-contact", label: "Go to Contact", group: "Navigate", run: () => navigate("/#contact") },
    ];

    const projectCommands: Command[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      label: `View case study: ${p.title}`,
      group: "Projects",
      keywords: p.category,
      run: () => navigate(`/projects/${p.slug}`),
    }));

    const actions: Command[] = [
      {
        id: "toggle-theme",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
      { id: "open-github", label: "Open GitHub profile", group: "Actions", run: () => openExternal(siteConfig.links.github) },
      { id: "open-linkedin", label: "Open LinkedIn profile", group: "Actions", run: () => openExternal(siteConfig.links.linkedin) },
      { id: "open-leetcode", label: "Open LeetCode profile", group: "Actions", run: () => openExternal(siteConfig.links.leetcode) },
      { id: "open-resume", label: "Open resume", group: "Actions", run: () => openExternal(siteConfig.links.resume) },
    ];

    return [...nav, ...projectCommands, ...actions];
  }, [navigate, openExternal, close, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isToggle) {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) triggerRef.current = document.activeElement as HTMLElement;
          return next;
        });
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    function onOpenRequest() {
      triggerRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    }
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => window.removeEventListener("open-command-palette", onOpenRequest);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  }

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="fixed inset-0 bg-text/20" onClick={close} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg rounded-xl border border-border bg-bg overflow-hidden"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="command-palette-list"
          aria-activedescendant={filtered[activeIndex] ? `command-${filtered[activeIndex].id}` : undefined}
          placeholder="Type a command or search…"
          className="w-full px-4 py-3.5 text-sm text-text bg-bg border-b border-border focus:outline-none"
        />

        <ul id="command-palette-list" ref={listRef} role="listbox" className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-sm text-text-soft text-center">No matching commands.</li>
          )}

          {["Navigate", "Projects", "Actions"].map((group) => {
            const items = filtered.filter((c) => c.group === group);
            if (items.length === 0) return null;
            return (
              <li key={group}>
                <p className="px-4 pt-2 pb-1 text-xs text-text-soft uppercase tracking-wide">{group}</p>
                <ul>
                  {items.map((c) => {
                    runningIndex += 1;
                    const index = runningIndex;
                    const isActive = index === activeIndex;
                    return (
                      <li
                        key={c.id}
                        id={`command-${c.id}`}
                        data-index={index}
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => c.run()}
                        className={`mx-2 px-3 py-2 rounded-lg text-sm cursor-pointer ${
                          isActive ? "bg-accent text-bg" : "text-text"
                        }`}
                      >
                        {c.label}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
