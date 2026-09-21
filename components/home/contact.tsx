"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
import { useTheme } from "next-themes";
import { FiSend } from "react-icons/fi";
import { siteConfig } from "@/data/site-config";

type Status = "idle" | "sending" | "sent" | "error";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          theme?: "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const widgetIdRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const recaptchaRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && recaptchaReady && RECAPTCHA_SITE_KEY && window.grecaptcha) {
        widgetIdRef.current = window.grecaptcha.render(node, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: resolvedTheme === "dark" ? "dark" : "light",
          callback: (token) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken(""),
        });
      }
    },
    [recaptchaReady, resolvedTheme]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      recaptchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      if (RECAPTCHA_SITE_KEY && window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
        setRecaptchaToken("");
      }
    }
  }

  const canSubmit = status !== "sending" && (!RECAPTCHA_SITE_KEY || !!recaptchaToken);

  return (
    <section id="contact" className="bg-surface border-t border-border">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => setRecaptchaReady(true)}
        />
      )}
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-heading text-3xl font-semibold text-text mb-3">
          Let&apos;s build something interesting<span className="text-accent">.</span>
        </h2>
        <p className="text-sm text-text-soft mb-10 max-w-prose mx-auto">
          Send a message directly, or find me in the usual places.
        </p>

        {status === "sent" ? (
          <p role="status" className="text-sm text-accent">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="flex flex-col gap-4 text-left">
            <p className="text-xs text-text-soft" aria-hidden="true">* Required</p>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px overflow-hidden"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs text-text-soft">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs text-text-soft">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-text-soft">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {status === "error" && <p role="alert" className="text-xs text-error">{error}</p>}

            {mounted && RECAPTCHA_SITE_KEY && (
              <div key={resolvedTheme} ref={recaptchaRef} className="flex justify-center" />
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 rounded-lg bg-accent text-bg hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <FiSend aria-hidden className="w-4 h-4" />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p className="text-xs text-text-soft text-center">I&apos;ll get back to you within 24-48 hours.</p>
          </form>
        )}

        <div className="mt-14 flex flex-wrap justify-center gap-5 text-sm">
          <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm">{siteConfig.email}</a>
          <a href={siteConfig.links.github} className="text-text-soft hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm">GitHub</a>
          <a href={siteConfig.links.linkedin} className="text-text-soft hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm">LinkedIn</a>
          <a href={siteConfig.links.leetcode} className="text-text-soft hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm">LeetCode</a>
          <Link href="/resume" className="text-text-soft hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm">Resume</Link>
        </div>
      </div>
    </section>
  );
}
