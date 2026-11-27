import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, FolderOpen, Settings, House, Info, Globe, Boxes, Cpu, Users, UsersRound, Shapes, BriefcaseIcon, Newspaper, Mail } from "lucide-react";

import { AdminMetricCard, AdminShell, adminCardClassName } from "@/components/admin/admin-ui";
import { getAdminInbox, getAdminOverview } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

type ManagementLink = {
  href: string;
  title: string;
  description: string;
  icon: typeof House;
};

type ManagementSection = {
  title: string;
  description: string;
  icon: typeof FileText;
  links: ManagementLink[];
};

const managementSections: ManagementSection[] = [
  {
    title: "Pages",
    description: "Manage your main site pages content",
    icon: FileText,
    links: [
      {
        href: "/admin/home",
        title: "Home",
        description: "Services, industries, tech stack and blog section.",
        icon: House,
      },
      {
        href: "/admin/about",
        title: "About",
        description: "Hero, pillars, journey timeline, why choose us.",
        icon: Info,
      },
      {
        href: "/admin/contact",
        title: "Contact",
        description: "Contact details, offices and form labels.",
        icon: Mail,
      },
    ],
  },
  {
    title: "Services",
    description: "Service offerings and technology pages",
    icon: Sparkles,
    links: [
      {
        href: "/admin/expertise",
        title: "Expertise",
        description: "Expertise dropdown, detail pages, engagement models, FAQs.",
        icon: Sparkles,
      },
      {
        href: "/admin/offshore-developer",
        title: "Offshore Developer",
        description: "Developer pages, navigation groups, case studies, FAQs.",
        icon: Globe,
      },
      {
        href: "/admin/products",
        title: "Products",
        description: "Product navbar items, heroes, and shared sections.",
        icon: Boxes,
      },
      {
        href: "/admin/technologies",
        title: "Technologies",
        description: "Technology pages, hero copy, case studies, stack items.",
        icon: Cpu,
      },
    ],
  },
  {
    title: "Resources",
    description: "Team, portfolio, careers, and blog content",
    icon: FolderOpen,
    links: [
      {
        href: "/admin/team",
        title: "Team",
        description: "Team member profiles, bios, ordering, and portraits.",
        icon: Users,
      },
      {
        href: "/admin/interns",
        title: "Interns & Alumni",
        description: "Alumni cards, awards, filters, and profile images.",
        icon: UsersRound,
      },
      {
        href: "/admin/portfolio",
        title: "Portfolio",
        description: "Case studies, tags, outcomes, and visual covers.",
        icon: Shapes,
      },
      {
        href: "/admin/careers",
        title: "Careers",
        description: "Job roles, salary details, locations, and hiring content.",
        icon: BriefcaseIcon,
      },
      {
        href: "/admin/blogs",
        title: "Blogs",
        description: "Featured posts, categories, articles, and cover media.",
        icon: Newspaper,
      },
    ],
  },
  {
    title: "System",
    description: "Global site settings and configuration",
    icon: Settings,
    links: [
      {
        href: "/admin/settings",
        title: "Site Settings",
        description: "Brand copy, newsletter, locations, and page-level text.",
        icon: Settings,
      },
    ],
  },
];

/** Messages received in the last `days` days (request-time, server only). */
function countSince(items: { createdAt: string }[], days: number) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return items.filter((i) => new Date(i.createdAt) > cutoff).length;
}

function fmt(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

const KIND: Record<string, { label: string; c: string }> = {
  enquiry: { label: "Contact", c: "#0878d1" },
  hire: { label: "Hire devs", c: "#d99a19" },
  application: { label: "Application", c: "#9a5b08" },
};

export default async function AdminDashboardPage() {
  const [{ stats }, inbox] = await Promise.all([getAdminOverview(), getAdminInbox()]);
  const open = inbox.filter((i) => i.status !== "archived");
  const newCount = inbox.filter((i) => i.status === "new").length;
  const thisWeek = countSince(inbox, 7);
  const applications = open.filter((i) => i.kind === "application").length;

  return (
    <AdminShell activePath="/admin" title="Dashboard" description="An overview of your website content and the latest messages from visitors.">
      {/* Highlights */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/inbox?status=new" className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#071a33,#064a87_80%,#0878d1_130%)] p-5 text-white shadow-[0_20px_40px_-24px_rgba(7,26,51,0.7)]">
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-brand-spectrum" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f6d77a]">New messages</p>
          <p className="mt-2 font-display text-[32px] font-bold leading-none">{newCount}</p>
          <p className="mt-2 text-[12.5px] text-white/70">Waiting in your inbox</p>
        </Link>
        <AdminMetricCard label="This week" value={String(thisWeek)} description="Enquiries and applications in the last 7 days." />
        <AdminMetricCard label="Open applications" value={String(applications)} description="Job applications not archived." />
        <AdminMetricCard label="Published content" value={String(stats.blogs + stats.portfolio)} description={`${stats.blogs} articles · ${stats.portfolio} portfolio projects`} />
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Recent inbox */}
        <section className={`${adminCardClassName} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="font-display text-[16px] font-bold text-fg">Latest messages</h2>
              <p className="text-[12.5px] text-fg-muted">From the contact, hire-developer and career forms</p>
            </div>
            <Link href="/admin/inbox" className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0878d1] hover:underline">
              Open inbox <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {open.slice(0, 7).map((i) => (
              <li key={`${i.kind}-${i.id}`}>
                <Link href={`/admin/inbox?id=${i.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-2">
                  <span className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]" style={{ background: `${KIND[i.kind].c}1f`, color: KIND[i.kind].c }}>
                    {KIND[i.kind].label}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[13.5px] text-fg ${i.status === "new" ? "font-bold" : "font-medium"}`}>{i.name || i.email}</span>
                    <span className="block truncate text-[12px] text-fg-muted">{i.subject}</span>
                  </span>
                  <span className="shrink-0 text-[11.5px] text-fg-subtle">{fmt(i.createdAt)}</span>
                </Link>
              </li>
            ))}
            {!open.length ? <li className="px-5 py-12 text-center text-[13px] text-fg-muted">No messages yet. New form submissions will appear here.</li> : null}
          </ul>
        </section>

        {/* Content counts */}
        <section className={`${adminCardClassName} p-5`}>
          <h2 className="font-display text-[16px] font-bold text-fg">Website content</h2>
          <p className="text-[12.5px] text-fg-muted">Items managed in the CMS</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {[
              ["Blog articles", stats.blogs, "/admin/blogs", Newspaper],
              ["Portfolio", stats.portfolio, "/admin/portfolio", Shapes],
              ["Expertise pages", stats.expertisePages, "/admin/expertise", Sparkles],
              ["Technology pages", stats.technologies, "/admin/technologies", Cpu],
              ["Offshore pages", stats.offshoreDevelopers, "/admin/offshore-developer", Globe],
              ["Products", stats.products, "/admin/products", Boxes],
              ["Job openings", stats.jobs, "/admin/careers", BriefcaseIcon],
              ["Team members", stats.team, "/admin/team", Users],
            ].map(([label, n, href, Icon]) => {
              const I = Icon as typeof Users;
              return (
                <li key={label as string}>
                  <Link href={href as string} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5 hover:border-[#d99a19]/50">
                    <I className="h-4 w-4 text-[#0878d1]" />
                    <span className="min-w-0 flex-1 truncate text-[13px] text-fg-muted">{label as string}</span>
                    <span className="font-display text-[15px] font-bold text-fg">{n as number}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Quick edit */}
      <section className="space-y-3">
        <h2 className="px-1 font-display text-[16px] font-bold text-fg">Edit your website</h2>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {managementSections.map((section) => (
            <div key={section.title} className={`${adminCardClassName} p-4`}>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                <section.icon className="h-3.5 w-3.5" /> {section.title}
              </p>
              <ul className="mt-3 space-y-1">
                {section.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-surface-2">
                      <l.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#d99a19]" />
                      <span className="min-w-0">
                        <span className="block text-[13.5px] font-semibold text-fg group-hover:text-[#0878d1]">{l.title}</span>
                        <span className="block text-[12px] leading-snug text-fg-subtle">{l.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
