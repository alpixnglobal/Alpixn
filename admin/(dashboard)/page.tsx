import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Sparkles, FolderOpen, Settings, House, Info, Globe, Boxes, Cpu, Users, UsersRound, Shapes, BriefcaseIcon, Newspaper } from "lucide-react";

import { AdminMetricCard, AdminSectionCard, AdminShell, adminCardClassName } from "@/components/admin/admin-ui";
import { LogoutForm } from "@/components/admin/logout-form";
import { getAdminOverview } from "@/lib/content-service";

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
        description: "Hero, solutions, offerings, industries, tech stack, testimonials.",
        icon: House,
      },
      {
        href: "/admin/about",
        title: "About",
        description: "Company story, vision, milestones, why choose us sections.",
        icon: Info,
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

export default async function AdminDashboardPage() {
  const { siteSettings, stats } = await getAdminOverview();

  return (
    <AdminShell
      activePath="/admin"
      title="Content Dashboard"
      description="Manage MongoDB-backed content, job applications, media uploads, and shared content settings from one central workspace."
      topActions={<LogoutForm />}
    >
      {/* Quick Stats - Grouped by category */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <FileText className="h-4 w-4 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Pages</span>
        </div>
        <section className="grid gap-4 md:grid-cols-2">
          <AdminMetricCard
            label="Home"
            value={String(stats.homePages)}
            description="Home page settings document."
          />
          <AdminMetricCard
            label="About"
            value={String(stats.aboutPages)}
            description="About page settings document."
          />
        </section>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Services</span>
        </div>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminMetricCard
            label="Expertise"
            value={String(stats.expertisePages)}
            description="Expertise pages for dropdown and routes."
          />
          <AdminMetricCard
            label="Offshore"
            value={String(stats.offshoreDevelopers)}
            description="Offshore developer pages."
          />
          <AdminMetricCard
            label="Products"
            value={String(stats.products)}
            description="Product pages in navbar and routes."
          />
          <AdminMetricCard
            label="Technologies"
            value={String(stats.technologies)}
            description="Technology pages managed."
          />
        </section>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <FolderOpen className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Resources</span>
        </div>
        <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <AdminMetricCard
            label="Team"
            value={String(stats.team)}
            description="Team member profiles."
          />
          <AdminMetricCard
            label="Interns"
            value={String(stats.interns)}
            description="Alumni profiles managed."
          />
          <AdminMetricCard
            label="Portfolio"
            value={String(stats.portfolio)}
            description="Case studies and outcomes."
          />
          <AdminMetricCard
            label="Careers"
            value={String(stats.jobs)}
            description="Open job roles."
          />
          <AdminMetricCard
            label="Blogs"
            value={String(stats.blogs)}
            description="Article cards."
          />
        </section>
      </div>

      {/* Management Sections */}
      {managementSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <AdminSectionCard
            key={section.title}
            title={section.title}
            description={section.description}
          >
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {section.links.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-400/30 hover:bg-sky-400/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sky-300 transition group-hover:border-sky-400/30 group-hover:bg-sky-400/10">
                      <ItemIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.description}</p>
                    </div>
                    <span className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-300">→</span>
                  </Link>
                );
              })}
            </div>
          </AdminSectionCard>
        );
      })}

      {/* Brand Snapshot */}
      <AdminSectionCard
        title="Brand Snapshot"
        description="Current settings for brand identity and newsletter copy."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Brand Identity</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{siteSettings.companyName}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{siteSettings.headerTagline}</p>
          </div>
          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Newsletter</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{siteSettings.newsletterTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{siteSettings.newsletterDescription}</p>
          </div>
        </div>
      </AdminSectionCard>
    </AdminShell>
  );
}
