import { skillIcons, genericSkillIcons } from "@/data/skill-icons";

// A technology pill with its real logo when one exists (data/skill-icons.ts),
// a generic outline icon for concepts and libraries without a logo, and plain
// text otherwise. Never invents an icon.
export function TechChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const brand = skillIcons[name];
  const BrandIcon = brand?.icon;
  const GenericIcon = genericSkillIcons[name];
  const box = size === "md" ? "text-sm px-3 py-1.5 gap-2" : "text-xs px-2.5 py-1 gap-1.5";
  const icon = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <span className={`inline-flex items-center rounded-full border border-border bg-bg text-text-soft ${box}`}>
      {BrandIcon && (
        <BrandIcon aria-hidden className={`${icon} shrink-0`} style={brand.color ? { color: brand.color } : undefined} />
      )}
      {!BrandIcon && GenericIcon && <GenericIcon aria-hidden className={`${icon} shrink-0 text-accent`} />}
      {name}
    </span>
  );
}
