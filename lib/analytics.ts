// Thin wrapper over Plausible's custom events. Safe to call anywhere on the
// client: it does nothing when analytics isn't configured, is blocked, or
// hasn't loaded yet, so it can never break a user action.
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(name: string, props?: Record<string, string>) {
  try {
    window.plausible?.(name, props ? { props } : undefined);
  } catch {
    // Analytics must never affect the page.
  }
}
