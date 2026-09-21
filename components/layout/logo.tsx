export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-bg font-heading text-[11px] font-semibold tracking-tight ${className}`}
    >
      RK
    </span>
  );
}
