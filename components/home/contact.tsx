"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
import { FiSend, FiCheck, FiChevronDown } from "react-icons/fi";
import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/analytics";
import { topicOptions, timelineOptions } from "@/data/contact-options";
import { SectionHeading } from "@/components/ui/section-heading";

type Status = "idle" | "sending" | "sent" | "error";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (sitekey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // The submit button is never disabled waiting on reCAPTCHA: Next's Script
  // `onLoad` only fires on the very first load, so after client-side
  // navigation, hot reload, or a blocked script the button used to stay
  // disabled forever. Instead, wait for the script here, at submit time,
  // and fail with a clear message if it never arrives.
  async function getRecaptchaToken(): Promise<string> {
    if (!RECAPTCHA_SITE_KEY) return "";
    const deadline = Date.now() + 8000;
    while (!window.grecaptcha && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (!window.grecaptcha) {
      throw new Error(
        "Spam protection couldn't load. Please disable any ad blocker and retry, or email me directly."
      );
    }
    await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve));
    return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;

    try {
      const recaptchaToken = await getRecaptchaToken();
      const data = {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        topic: (form.elements.namedItem("topic") as HTMLSelectElement).value,
        timeline: (form.elements.namedItem("timeline") as HTMLSelectElement).value,
        company: (form.elements.namedItem("company") as HTMLInputElement).value,
        recaptchaToken,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      trackEvent("Contact Submitted", data.topic ? { topic: data.topic } : undefined);
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const canSubmit = status !== "sending";

  return (
    <section id="contact" className="bg-surface border-t border-border">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <SectionHeading
          title="Let's build something interesting"
          subtitle="Send a message directly, or find me in the usual places."
        />

        {status === "sent" ? (
          <SentConfirmation />
        ) : (
          <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="flex flex-col gap-5 text-left">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px overflow-hidden"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-text-soft">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="bg-bg border border-border rounded-lg px-4 py-2.5 text-base text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-text-soft">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  className="bg-bg border border-border rounded-lg px-4 py-2.5 text-base text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="topic" className="text-sm text-text-soft">
                  What&apos;s this about?
                </label>
                <div className="relative">
                  <select
                    id="topic"
                    name="topic"
                    defaultValue=""
                    className="w-full appearance-none bg-bg border border-border rounded-lg pl-4 pr-10 py-2.5 text-base text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select an option</option>
                    {topicOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="timeline" className="text-sm text-text-soft">
                  Timeline
                </label>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    defaultValue=""
                    className="w-full appearance-none bg-bg border border-border rounded-lg pl-4 pr-10 py-2.5 text-base text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select an option</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-text-soft">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={4}
                placeholder="Tell me a bit about what you're building or the role you have in mind."
                className="bg-bg border border-border rounded-lg px-4 py-2.5 text-base text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {status === "error" && <p role="alert" className="text-sm text-error">{error}</p>}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 text-base font-medium px-4 py-3.5 rounded-lg bg-accent text-bg hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <FiSend aria-hidden className="w-4 h-4" />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p className="text-sm text-text-soft text-center">I&apos;ll get back to you within 24-48 hours.</p>
            {RECAPTCHA_SITE_KEY && (
              <p className="text-xs text-text-soft text-center">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy" className="underline hover:text-text">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" className="underline hover:text-text">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            )}
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

function SentConfirmation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      role="status"
      className={`rounded-2xl border border-border bg-surface px-8 py-10 text-center motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
        <FiCheck aria-hidden className="h-7 w-7 text-accent" />
      </div>
      <p className="font-heading text-lg font-semibold text-text mb-1.5">Message sent!</p>
      <p className="text-sm text-text-soft max-w-prose mx-auto">
        Thanks for reaching out — I&apos;ve received your message and will get back to you within 24-48 hours.
      </p>
    </div>
  );
}
