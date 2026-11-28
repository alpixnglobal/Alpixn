/** Role-based access for the admin. Pure functions — safe to import anywhere. */

export const ROLES = {
  owner: { label: "Owner", description: "Everything, including security, team members and API keys." },
  manager: { label: "Manager", description: "Everything except security settings and team members." },
  sales: { label: "Sales", description: "Inbox, Sales CRM, AI sales (conversations, approvals, meetings, proposals)." },
  marketing: { label: "Marketing", description: "SEO, blogs and website content, ads manager and AI Studio." },
  editor: { label: "Content editor", description: "Website pages, blogs, portfolio, careers and team content." },
  viewer: { label: "Viewer", description: "Read-only access to the dashboard, CRM, inbox, ads and audit log." },
} as const;

export type Role = keyof typeof ROLES;

export type Permission =
  | "dashboard"
  | "content"
  | "inbox"
  | "sales"
  | "approvals"
  | "agents"
  | "ads"
  | "integrations"
  | "seo"
  | "pricing"
  | "spam"
  | "ai"
  | "settings"
  | "security"
  | "users"
  | "audit";

const ALL: Permission[] = ["dashboard", "content", "inbox", "sales", "approvals", "agents", "ads", "integrations", "seo", "pricing", "spam", "ai", "settings", "security", "users", "audit"];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: ALL,
  manager: ALL.filter((p) => p !== "security" && p !== "users"),
  sales: ["dashboard", "inbox", "sales", "approvals"],
  marketing: ["dashboard", "seo", "ads", "ai", "content"],
  editor: ["dashboard", "content"],
  viewer: ["dashboard"],
};

/** Viewers may open these pages read-only (their write actions are still refused). */
const VIEW_ONLY: Permission[] = ["sales", "inbox", "ads", "audit", "agents", "approvals"];

export const isRole = (r: unknown): r is Role => typeof r === "string" && r in ROLES;

export function can(role: Role, perm: Permission) {
  return ROLE_PERMISSIONS[role]?.includes(perm) ?? false;
}

export function canView(role: Role, perm: Permission) {
  return can(role, perm) || (role === "viewer" && VIEW_ONLY.includes(perm));
}

/** Which permission an admin page needs. */
export function pathPermission(path: string): Permission {
  const p = path.replace(/\/+$/, "") || "/admin";
  const rules: [string, Permission][] = [
    ["/admin/account", "dashboard"],
    ["/admin/inbox", "inbox"],
    ["/admin/sales", "sales"],
    ["/admin/growth/approvals", "approvals"],
    ["/admin/growth/conversations", "sales"],
    ["/admin/growth/meetings", "sales"],
    ["/admin/growth/proposals", "sales"],
    ["/admin/growth/ads", "ads"],
    ["/admin/growth/integrations", "integrations"],
    ["/admin/growth/audit", "audit"],
    ["/admin/growth", "agents"],
    ["/admin/pricing", "pricing"],
    ["/admin/seo", "seo"],
    ["/admin/spam", "spam"],
    ["/admin/security", "security"],
    ["/admin/users", "users"],
    ["/admin/ai", "ai"],
    ["/admin/settings", "settings"],
  ];
  for (const [prefix, perm] of rules) if (p === prefix || p.startsWith(`${prefix}/`)) return perm;
  return p === "/admin" ? "dashboard" : "content";
}
