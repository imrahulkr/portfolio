export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="font-heading text-4xl font-semibold tracking-tight text-text">
        {title}
        <span className="text-accent">.</span>
      </h2>
      {subtitle && <p className="mt-3 text-base text-text-soft">{subtitle}</p>}
    </div>
  );
}
