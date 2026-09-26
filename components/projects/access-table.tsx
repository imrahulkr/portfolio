import { FiUnlock, FiLock, FiShield, FiUsers, FiKey } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { AccessRule } from "@/data/projects";

// Icon per access level. Unknown levels fall back to the lock, so adding a
// new rule in data/projects.ts never breaks the table.
const ACCESS_ICONS: Record<string, IconType> = {
  Open: FiUnlock,
  "Signature-verified": FiShield,
  "Seller or Admin": FiUsers,
  "Admin only": FiKey,
  "Signed-in users": FiLock,
};

export function AccessTable({ rules }: { rules: AccessRule[] }) {
  return (
    <ul className="overflow-hidden rounded-2xl border border-border">
      {rules.map((rule, i) => {
        const Icon = ACCESS_ICONS[rule.access] ?? FiLock;
        return (
          <li
            key={rule.route}
            className={`grid grid-cols-1 gap-2 bg-surface px-5 py-4 md:grid-cols-[minmax(0,1.1fr)_11rem_minmax(0,1.6fr)] md:items-center md:gap-6 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <code className="font-mono text-sm text-text">{rule.route}</code>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-accent">
              <Icon aria-hidden className="h-3.5 w-3.5" />
              {rule.access}
            </span>
            <p className="text-sm text-text-soft">{rule.detail}</p>
          </li>
        );
      })}
    </ul>
  );
}
