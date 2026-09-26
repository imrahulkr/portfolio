"use client";

import { useEffect, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

// Copies `text` to the clipboard and briefly swaps to a checkmark. Falls back
// to a hidden textarea when the async Clipboard API is unavailable (older
// browsers, or non-secure contexts), so it works on plain http too.
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  label,
  copiedLabel = "Copied",
  size = 18,
  className = "",
}: {
  text: string;
  label: string;
  // Announced and shown as the tooltip for 2 seconds after a successful copy.
  copiedLabel?: string;
  size?: number;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleClick() {
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={copied ? copiedLabel : label}
        title={copied ? copiedLabel : label}
        className={`transition-colors ${copied ? "text-accent" : "hover:text-text"} ${className}`}
      >
        {copied ? <FiCheck size={size} aria-hidden="true" /> : <FiCopy size={size} aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
