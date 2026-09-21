import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/data/site-config";

export async function POST(request: Request) {
  const { name, email, message, company, recaptchaToken } = await request.json();

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Inert until RECAPTCHA_SECRET_KEY is set (see components/home/contact.tsx —
  // the widget itself doesn't render without NEXT_PUBLIC_RECAPTCHA_SITE_KEY either).
  // reCAPTCHA v3 is invisible and returns a 0-1 trust score instead of a pass/fail.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (!recaptchaToken) {
      return NextResponse.json({ error: "Please try again." }, { status: 400 });
    }
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: recaptchaSecret, response: recaptchaToken }),
    });
    const verifyBody = await verifyRes.json();
    if (!verifyBody.success || verifyBody.action !== "contact" || verifyBody.score < 0.5) {
      return NextResponse.json({ error: "Verification failed — please try again." }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service isn't configured yet. Please reach out directly." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: siteConfig.email,
      replyTo: email,
      subject: `New message from ${name} via portfolio`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 500 });
  }
}
