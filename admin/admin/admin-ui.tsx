import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Boxes, BriefcaseBusiness, BriefcaseIcon, ChevronDown, Cpu, FileText, FolderOpen, Globe, House, Info, LayoutDashboard, Mail, Newspaper, Settings, Shapes, Sparkles, Users, UsersRound } from "lucide-react";

import { PersistentScrollArea } from "@/components/admin/persistent-scroll-area";

export const adminCardClassName =
  "rounded-[28px] border border-sky-100 bg-white shadow-[0_30px_100px_-60px_rgba(8,120,209,0.2)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.92))] dark:shadow-[0_30px_100px_-60px_rgba(8,120,209,0.45)]";

type AdminShellProps = {
  children: ReactNode;
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

// Pages group - site content pages
const pagesLinks: AdminNavChildLink[] = [
  { href: "/admin/home", label: "Home", icon: House },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/contact", label: "Contact", icon: Mail },
];

// Services group - service offerings
const servicesLinks: AdminNavChildLink[] = [
  { href: "/admin/expertise", label: "Expertise", icon: Sparkles },
  { href: "/admin/offshore-developer", label: "Offshore Developer", icon: Globe },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/technologies", label: "Technologies", icon: Cpu },
];

// Resources group - people and content
const resourceLinks: AdminNavChildLink[] = [
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/interns", label: "Interns & Alumni", icon: UsersRound },
  { href: "/admin/portfolio", label: "Portfolio", icon: Shapes },
  { href: "/admin/careers", label: "Careers", icon: BriefcaseIcon },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
];

const adminLinks: AdminNavLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { section: "Content" },
  { label: "Pages", icon: FileText, children: pagesLinks },
  { label: "Services", icon: Sparkles, children: servicesLinks },
  { label: "Resources", icon: FolderOpen, children: resourceLinks },
  { section: "System" },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children, title, description, activePath, topActions }: AdminShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas text-fg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(8,120,209,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(217,154,25,0.14),transparent_24%)] dark:opacity-100 opacity-50" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-6 px-4 py-4 sm:px-6 xl:flex-row xl:px-8">
        <aside className={`${adminCardClassName} shrink-0 xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] xl:w-80 flex flex-col`}>
          <div className="flex flex-col gap-8 p-6 flex-1 overflow-hidden">
            <div className="space-y-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line-gold)] bg-[var(--surface-2)]">
                  <Image src="/brand/alpixn-emblem.webp" alt="ALPIXN" width={36} height={36} className="h-9 w-9 object-contain" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">ALPIXN Admin</p>
                  <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">Content Control</h2>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-500 dark:text-slate-400 hidden xl:block">
                Manage public content, publishing state, media uploads, and page copy from one dashboard.
              </p>
            </div>

            <nav className="grid gap-1 overflow-y-auto pr-2 custom-scrollbar">
              {adminLinks.map((link, index) => {
                // Handle section headers
                if (link.section) {
                  return (
                    <div key={link.section} className={`px-4 pt-4 pb-2 ${index > 0 ? "mt-2" : ""}`}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        {link.section}
                      </p>
                    </div>
                  );
                }

                const Icon = link.icon!;
                const childLinks = link.children;

                if (childLinks) {
                  const activeGroup = childLinks.some((child) => activePath === child.href);

                  return (
                    <details key={link.label} open={activeGroup} className="group">
                      <summary
                        className={
                          activeGroup
                            ? "flex cursor-pointer list-none items-center gap-3 rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/12 dark:text-sky-50 shadow-[0_18px_40px_-28px_rgba(8,120,209,0.3)] dark:shadow-[0_18px_40px_-28px_rgba(8,120,209,0.8)]"
                            : "flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                        }
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1">{link.label}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>

                      <div className="mt-1 grid gap-1 pl-4">
                        {childLinks.map((child) => {
                          const ChildIcon = child.icon;
                          const activeChild = activePath === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              scroll={false}
                              className={
                                activeChild
                                  ? "flex items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/12 dark:text-sky-50"
                                  : "flex items-center gap-3 rounded-xl px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/8 dark:hover:text-white"
                              }
                            >
                              <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </details>
                  );
                }

                const active = activePath === link.href!;

                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    scroll={false}
                    className={
                      active
                        ? "flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/12 dark:text-sky-50 shadow-[0_18px_40px_-28px_rgba(8,120,209,0.3)] dark:shadow-[0_18px_40px_-28px_rgba(8,120,209,0.8)] shrink-0"
                        : "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white shrink-0"
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

          </div>
        </aside>

        <section className="min-w-0 flex-1 space-y-6 pb-10">
          <header className={`${adminCardClassName} overflow-hidden p-6 sm:p-8`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100">
                  Admin Workspace
                </span>
                <div>
                  <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
              {topActions ? <div className="flex flex-wrap gap-3">{topActions}</div> : null}
            </div>
          </header>

          {children}
        </section>
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
    <section className={`${adminCardClassName} p-6 sm:p-8`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function AdminManagerLayout({ sidebar, editor }: AdminManagerLayoutProps) {
  return <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">{sidebar}{editor}</div>;
}

export function AdminDirectoryList({ children }: { children: ReactNode }) {
  return (
    <PersistentScrollArea
      storageKey="admin-directory-scroll"
      className="grid gap-3 xl:max-h-[calc(100vh-18rem)] xl:overflow-y-auto xl:pr-2"
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
      className={
        active
          ? "flex items-start gap-4 rounded-[22px] border border-sky-400/30 bg-sky-400/10 px-4 py-4 text-slate-900 dark:text-white"
          : "flex items-start gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-slate-900 dark:text-white transition hover:border-white/16 hover:bg-white/[0.05]"
      }
    >
      {leading ? (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-sky-100">
          {leading}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
          </div>
          {trailing ? <div className="shrink-0">{trailing}</div> : null}
        </div>
        {meta ? <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{meta}</p> : null}
      </div>
    </Link>
  );
}

export function AdminField({ label, hint, children, className = "" }: AdminFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
      {hint ? <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">{hint}</p> : null}
      {children}
    </div>
  );
}

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-[18px] border border-white/10 bg-[#0f172a]/80 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/35 ${props.className ?? ""}`}
    />
  );
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-32 w-full rounded-[18px] border border-white/10 bg-[#0f172a]/80 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/35 ${props.className ?? ""}`}
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
    <label className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-sky-400" />
      {label}
    </label>
  );
}

export function AdminMetricCard({ label, value, description }: AdminMetricCardProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">{value}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

export function StatusNotice({ tone, message }: StatusNoticeProps) {
  return (
    <div
      className={
        tone === "success"
          ? "rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-50"
          : "rounded-[24px] border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-50"
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

  return null;
}
