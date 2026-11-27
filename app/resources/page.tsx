import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase, FolderKanban, GraduationCap, Users } from "lucide-react";
import PageHero from "@/components/sections/shared/PageHero";
import { Section, tone } from "@/components/ui/v4";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources – Blog, Portfolio, Careers & Team | ALPIXN",
  description: "Articles on AI, robotics and software engineering, ALPIXN project work, open roles, our team and internship programme.",
  path: "/resources",
});

const ITEMS = [
  { icon: BookOpen, title: "Blog & Articles", text: "Practical guides on AI, robotics, software engineering and industry technology.", href: "/resources/blogs" },
  { icon: FolderKanban, title: "Portfolio", text: "Projects and interactive demos across industries and countries.", href: "/resources/portfolio" },
  { icon: Briefcase, title: "Careers", text: "Open roles for engineers, designers and specialists.", href: "/resources/careers" },
  { icon: Users, title: "Our Team", text: "The people behind ALPIXN and how we work.", href: "/resources/our-team" },
  { icon: GraduationCap, title: "Internship Alumni", text: "Our internship programme and the people who completed it.", href: "/resources/interns-alumni" },
];

export default function ResourcesPage() {
  return (
    <main>
      <PageHero eyebrow="Resources" title="Learn, Explore and Join Us" description="Read our articles, explore our work, see open roles and meet the team behind ALPIXN." />
      <Section id="resources-list">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text, href }, i) => (
            <li key={href}>
              <Link href={href} className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: tone(i).c }} />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: tone(i).c, color: tone(i).ink }}>
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h2 className="mt-5 font-display text-lg font-bold text-fg">{title}</h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
