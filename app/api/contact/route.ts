import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/data/site-config";
import { topicOptions, timelineOptions } from "@/data/contact-options";
import { rateLimit } from "@/lib/rate-limit";

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

// 5 submissions per IP per 15 minutes.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Strip CR/LF so user input can't inject extra email headers via the subject.
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  const limited = rateLimit(`contact:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a few minutes and try again, or email me directly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { company, recaptchaToken } = payload;
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const topic = typeof payload.topic === "string" ? payload.topic : "";
  const timeline = typeof payload.timeline === "string" ? payload.timeline : "";

  // Honeypot: pretend success so bots don't learn they were caught.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if ((topic && !topicOptions.includes(topic)) || (timeline && !timelineOptions.includes(timeline))) {
    return NextResponse.json({ error: "Invalid selection." }, { status: 400 });
  }

  // Inert until RECAPTCHA_SECRET_KEY is set (see components/home/contact.tsx —
  // the script itself doesn't load without NEXT_PUBLIC_RECAPTCHA_SITE_KEY either).
  // reCAPTCHA v3 is invisible and returns a 0-1 trust score instead of a pass/fail.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (typeof recaptchaToken !== "string" || !recaptchaToken) {
      return NextResponse.json({ error: "Please try again." }, { status: 400 });
    }
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: recaptchaSecret, response: recaptchaToken }),
    });
    const verifyBody = await verifyRes.json();
    if (!verifyBody.success || verifyBody.action !== "contact" || verifyBody.score < 0.5) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service isn't configured yet. Please reach out directly." },
      { status: 503 }
    );
  }

  // Set CONTACT_FROM_EMAIL to an address on a domain verified with Resend
  // (e.g. "Rahul Kumar <hello@yourdomain.com>"). Until then the sandbox
  // sender is used, which can only deliver to the Resend account owner, so
  // the auto-reply below is skipped.
  const verifiedFrom = process.env.CONTACT_FROM_EMAIL;
  const from = verifiedFrom ?? "Portfolio Contact <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const details = [
    `From: ${name} <${email}>`,
    topic ? `About: ${topic}` : null,
    timeline ? `Timeline: ${timeline}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: siteConfig.email,
      replyTo: email,
      subject: `New message from ${singleLine(name)} via portfolio`,
      text: `${details}\n\n${message}`,
    });
    if (error) {
      console.error("Contact email failed:", error);
      return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 500 });
    }
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 500 });
  }

  // Best-effort auto-reply. A failure here must never fail the request:
  // the message already reached the inbox.
  if (verifiedFrom) {
    try {
      const firstName = singleLine(name).split(" ")[0];
      const { error } = await resend.emails.send({
        from: verifiedFrom,
        to: email,
        replyTo: siteConfig.email,
        subject: "Thanks for reaching out",
        text: [
          `Hi ${firstName},`,
          "",
          "Thanks for getting in touch. I've received your message and will get back to you within 24-48 hours.",
          "",
          "For reference, here is what you sent:",
          "",
          message,
          "",
          `Best,`,
          siteConfig.name,
        ].join("\n"),
      });
      if (error) console.error("Auto-reply failed:", error);
    } catch (err) {
      console.error("Auto-reply failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
