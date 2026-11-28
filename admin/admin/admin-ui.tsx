import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, BadgeCheck, ScrollText, UserCog, Bot, Boxes, BriefcaseIcon, LockKeyhole, Search, ShieldCheck, Tags, TrendingUp, ChevronDown, Inbox, LayoutTemplate, Cpu, ExternalLink, FileText, FolderOpen, Globe, House, Info, LayoutDashboard, Mail, Newspaper, Settings, Shapes, Sparkles, Users, UsersRound } from "lucide-react";

import { PersistentScrollArea } from "@/components/admin/persistent-scroll-area";
import { LogoutForm } from "@/components/admin/logout-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { ROLES, canView, pathPermission, type Role } from "@/lib/rbac";

export type { AdminShellProps };

export const adminCardClassName = "rounded-2xl border border-line bg-surface shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_30px_-18px_rgba(7,26,51,0.25)]";

type AdminShellProps = {
  children: ReactNode;
  /** Signed-in user (set by the server AdminShell in components/admin/admin-shell). */
  session?: { email: string; name: string; role: Role } | null;
  title: string;
  description: string;
  activePath: string;
  topActions?: ReactNode;
};

type AdminFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

type AdminMetricCardProps = {
  label: string;
  value: string;
  description: string;
};

type StatusNoticeProps = {
  tone: "success" | "error";
  message: string;
};

type AdminManagerLayoutProps = {
  sidebar: ReactNode;
  editor: ReactNode;
};

type AdminRecordLinkProps = {
  href: string;
  active?: boolean;
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

type AdminNavChildLink = {
  href: string;
  label: string;
  icon: typeof Users;
};

type AdminNavLink =
  | {
      href: string;
      label: string;
      icon: typeof Users;
      children?: never;
      section?: never;
    }
  | {
      label: string;
      icon: typeof Users;
      children: AdminNavChildLink[];
      href?: never;
      section?: never;
    }
  | {
      section: string;
      href?: never;
      label?: never;
      icon?: never;
      children?: never;
    };

// Navigation mirrors the public website structure.
const pagesLinks: AdminNavChildLink[] = [
  { href: "/admin/content", label: "Page sections", icon: LayoutTemplate },
  { href: "/admin/home", label: "Home", icon: House },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/contact", label: "Contact", icon: Mail },
];

const servicesLinks: AdminNavChildLink[] = [
  { href: "/admin/expertise", label: "Our Expertise", icon: Sparkles },
  { href: "/admin/offshore-developer", label: "Offshore Developer", icon: Globe },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/technologies", label: "Technologies", icon: Cpu },
];

const resourceLinks: AdminNavChildLink[] = [
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/portfolio", label: "Portfolio", icon: Shapes },
  { href: "/admin/careers", label: "Careers", icon: BriefcaseIcon },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/interns", label: "Interns & Alumni", icon: UsersRound },
];

const adminLinks: AdminNavLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/sales", label: "Sales CRM", icon: TrendingUp },
  { section: "AI sales & marketing" },
  { href: "/admin/growth", label: "AI agents", icon: Activity },
  { href: "/admin/growth/approvals", label: "Approval center", icon: BadgeCheck },
  { href: "/admin/growth/audit", label: "Audit log", icon: ScrollText },
  { section: "Website" },
  { label: "Pages", icon: FileText, children: pagesLinks },
  { label: "Services", icon: Sparkles, children: servicesLinks },
  { label: "Resources", icon: FolderOpen, children: resourceLinks },
  { section: "System" },
  { href: "/admin/pricing", label: "Pricing & chat robot", icon: Tags },
  { href: "/admin/seo", label: "SEO & analytics", icon: Search },
  { href: "/admin/spam", label: "Spam protection", icon: ShieldCheck },
  { href: "/admin/security", label: "Security", icon: LockKeyhole },
  { href: "/admin/users", label: "Team & roles", icon: UserCog },
  { href: "/admin/ai", label: "AI Studio", icon: Bot },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];

/** Navigation the role can open (empty groups and sections are dropped). */
function linksFor(role: Role): AdminNavLink[] {
  const ok = (href: string) => canView(role, pathPermission(href));
  const filtered: AdminNavLink[] = [];
  for (const link of adminLinks) {
    if (link.section) filtered.push(link);
    else if (link.children) {
      const children = link.children.filter((c) => ok(c.href));
      if (children.length) filtered.push({ ...link, children });
    } else if (ok(link.href!)) filtered.push(link);
  }
  return filtered.filter((link, i) => !link.section || (filtered[i + 1] && !filtered[i + 1].section));
}

function NavItem({ href, label, Icon, active, small = false }: { href: string; label: string; Icon: typeof Users; active: boolean; small?: boolean }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-xl ${small ? "px-3 py-2 text-[13px]" : "px-3 py-2.5 text-[14px]"} transition-colors ${
        active ? "bg-white/10 font-semibold text-white shadow-[inset_3px_0_0_#f0c14b]" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <Icon className={`${small ? "h-3.5 w-3.5" : "h-4 w-4"} shrink-0 ${active ? "text-[#f6d77a]" : "text-white/45 group-hover:text-white/80"}`} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function AdminShellView({ children, title, description, activePath, topActions, session }: AdminShellProps) {
  const role: Role = session?.role ?? "viewer";
  const allowed = canView(role, pathPermission(activePath));
  const links = linksFor(role);
  return (
    <div className="admin-root min-h-screen bg-canvas text-fg lg:pl-[264px]">
      {/* Sidebar */}
      <aside className="z-40 flex flex-col bg-[linear-gradient(180deg,#071a33_0%,#040d1c_100%)] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-[264px]">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-[#f6d77a]/30">
            <Image src="/brand/alpixn-emblem.webp" alt="ALPIXN" width={28} height={28} className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[15px] font-bold leading-tight">ALPIXN CMS</p>
            <p className="text-[11px] text-white/50">Website content manager</p>
          </div>
        </div>

        <nav aria-label="Admin" className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 [scrollbar-width:thin]">
          {links.map((link) => {
            if (link.section) {
              return (
                <p key={link.section} className="px-3 pb-1.5 pt-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  {link.section}
                </p>
              );
            }
            const Icon = link.icon!;
            if (link.children) {
              const activeGroup = link.children.some((c) => activePath === c.href);
              return (
                <details key={link.label} open={activeGroup || undefined} className="group/d">
                  <summary className={`flex cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors ${activeGroup ? "text-white" : "text-white/65 hover:bg-white/[0.06] hover:text-white"}`}>
                    <Icon className={`h-4 w-4 shrink-0 ${activeGroup ? "text-[#f6d77a]" : "text-white/45"}`} />
                    <span className="flex-1">{link.label}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-white/40 transition-transform group-open/d:rotate-180" />
                  </summary>
                  <div className="ml-5 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
                    {link.children.map((c) => (
                      <NavItem key={c.href} href={c.href} label={c.label} Icon={c.icon} active={activePath === c.href} small />
                    ))}
                  </div>
                </details>
              );
            }
            return <NavItem key={link.href} href={link.href!} label={link.label!} Icon={Icon} active={activePath === link.href} />;
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          {session ? (
            <Link href="/admin/account" className="block truncate px-3 pb-2 text-[11.5px] text-white/50 hover:text-white" title={`${session.email} — My account`}>
              {session.name} · <span className="text-[#f6d77a]">{ROLES[role].label}</span>
            </Link>
          ) : null}
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white">
            <ExternalLink className="h-4 w-4 text-white/45" /> View website
          </Link>
          <LogoutForm />
        </div>
        <div aria-hidden className="h-1 bg-brand-spectrum" />
      </aside>

      {/* Main */}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-line bg-[var(--header-bg)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-[20px] font-bold tracking-[-0.02em] text-fg">{title}</h1>
              <p className="mt-0.5 line-clamp-1 text-[13px] text-fg-muted">{description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {topActions}
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="admin-main mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          {allowed ? (
            children
          ) : (
            <div className="rounded-2xl border border-line bg-surface p-8 text-center">
              <LockKeyhole className="mx-auto h-8 w-8 text-gold" />
              <p className="mt-3 font-display text-[18px] font-bold text-fg">No access</p>
              <p className="mt-1 text-[13px] text-fg-muted">Your role ({ROLES[role].label}) can&apos;t open this section. Ask the owner if you need it.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function AdminSectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={`${adminCardClassName} p-5 sm:p-6`}>
      <div className="space-y-1 border-b border-line pb-4">
        <h2 className="font-display text-[16px] font-bold text-fg">{title}</h2>
        <p className="max-w-3xl text-[13px] leading-relaxed text-fg-muted">{description}</p>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function AdminManagerLayout({ sidebar, editor }: AdminManagerLayoutProps) {
  return <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">{sidebar}{editor}</div>;
}

export function AdminDirectoryList({ children }: { children: ReactNode }) {
  return (
    <PersistentScrollArea
      storageKey="admin-directory-scroll"
      className="grid gap-2 xl:max-h-[calc(100vh-14rem)] xl:overflow-y-auto xl:pr-1"
    >
      {children}
    </PersistentScrollArea>
  );
}

export function AdminRecordLink({
  href,
  active = false,
  title,
  subtitle,
  meta,
  leading,
  trailing,
}: AdminRecordLinkProps) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`flex items-start gap-3 rounded-xl border px-3 py-3 transition-colors ${
        active ? "border-[#0878d1]/40 bg-[#0878d1]/[0.08]" : "border-line bg-surface hover:border-[#d99a19]/50 hover:bg-surface-2"
      }`}
    >
      {leading ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-2 text-[12px] font-semibold text-fg-muted ring-1 ring-line">{leading}</div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[13.5px] font-semibold text-fg">{title}</h3>
            {subtitle ? <p className="mt-0.5 truncate text-[12.5px] text-fg-muted">{subtitle}</p> : null}
          </div>
          {trailing ? <div className="shrink-0">{trailing}</div> : null}
        </div>
        {meta ? <p className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{meta}</p> : null}
      </div>
    </Link>
  );
}

export function AdminField({ label, hint, children, className = "" }: AdminFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-[13px] font-semibold text-fg">{label}</label>
      {hint ? <p className="text-[12px] leading-relaxed text-fg-subtle">{hint}</p> : null}
      {children}
    </div>
  );
}

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`admin-input w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] text-fg outline-none transition placeholder:text-fg-subtle focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/15 ${props.className ?? ""}`}
    />
  );
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`admin-input min-h-28 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] leading-relaxed text-fg outline-none transition placeholder:text-fg-subtle focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/15 ${props.className ?? ""}`}
    />
  );
}

export function AdminCheckbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13.5px] text-fg hover:border-[#d99a19]/50">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[#0878d1]" />
      {label}
    </label>
  );
}

export function AdminMetricCard({ label, value, description }: AdminMetricCardProps) {
  return (
    <div className={`${adminCardClassName} relative overflow-hidden p-4`}>
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-spectrum opacity-70" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
      <p className="mt-2 font-display text-[26px] font-bold leading-none tracking-[-0.02em] text-fg">{value}</p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-fg-muted">{description}</p>
    </div>
  );
}

export function StatusNotice({ tone, message }: StatusNoticeProps) {
  return (
    <div
      className={
        tone === "success"
          ? "rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[13.5px] font-medium text-emerald-700 dark:text-emerald-300"
          : "rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-[13.5px] font-medium text-rose-700 dark:text-rose-300"
      }
    >
      {message}
    </div>
  );
}

export function getAdminFlashMessage(status?: string | string[], error?: string | string[]) {
  if (typeof error === "string" && error) {
    return {
      tone: "error" as const,
      message: decodeURIComponent(error),
    };
  }

  if (status === "saved") {
    return {
      tone: "success" as const,
      message: "Changes saved successfully.",
    };
  }

  if (status === "deleted") {
    return {
      tone: "success" as const,
      message: "Record deleted successfully.",
    };
  }

  // Free-text success messages (contain a space), e.g. "Approved and sent."
  if (typeof status === "string" && status.includes(" ")) {
    return { tone: "success" as const, message: status.slice(0, 300) };
  }

  return null;
}

/** Points editors to where a part of the page is managed. */
export function AdminHelpNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#0878d1]/25 bg-[#0878d1]/[0.06] px-4 py-3 text-[13.5px] leading-relaxed text-fg">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0878d1]" />
      <div>{children}</div>
    </div>
  );
}
