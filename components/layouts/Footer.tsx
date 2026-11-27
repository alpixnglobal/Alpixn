import Image from "next/image";
import Link from "next/link";
import { InputField } from "../ui/Input";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "../brand/BrandLogo";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "../brand/SocialIcons";
import LocalTime from "@/components/ui/LocalTime";
import { zoneFor } from "@/lib/time-zones";
import type { SiteSettings, FooterColumn, OfficeLocation } from "@/lib/content-types";

// Default fallback data (used when settings not provided)
const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Company",
    order: 1,
    links: [
      { label: "Home", href: "/", order: 1 },
      { label: "About", href: "/about", order: 2 },
      { label: "Offshore Developers", href: "/offshore-developer", order: 3 },
      { label: "Products", href: "/products", order: 4 },
      { label: "Our Expertise", href: "/our-expertise", order: 5 },
      { label: "Technologies", href: "/technologies", order: 6 },
      { label: "Contact", href: "/contact-us", order: 7 },
    ],
  },
  {
    title: "Services",
    order: 2,
    links: [
      { label: "Software Development", href: "/our-expertise/software-solution/software-development", order: 1 },
      { label: "Mobile App Development", href: "/our-expertise/software-solution/mobile-app-development", order: 2 },
      { label: "Application Modernization", href: "/our-expertise/software-solution/application-modernization", order: 3 },
      { label: "CRM Development Services", href: "/our-expertise/software-solution/crm-development", order: 4 },
      { label: "ERP Software", href: "/our-expertise/software-solution/erp-software", order: 5 },
      { label: "Data Analytics", href: "/our-expertise/software-solution/data-analytics", order: 6 },
      { label: "DevOps Services", href: "/our-expertise/software-solution/devops-services", order: 7 },
      { label: "Cloud Consulting", href: "/our-expertise/software-solution/cloud-consulting", order: 8 },
      { label: "Staff Augmentation", href: "/our-expertise/software-solution/staff-augmentation", order: 9 },
      { label: "Hire Developers", href: "/offshore-developer", order: 10 },
    ],
  },
  {
    title: "Industries",
    order: 3,
    links: [
      { label: "FinTech", href: "/our-expertise/industries/fintech", order: 1 },
      { label: "Insurtech", href: "/our-expertise/industries/insuretech", order: 2 },
      { label: "Proptech", href: "/our-expertise/industries/proptech", order: 3 },
      { label: "EdTech", href: "/our-expertise/industries/edtech", order: 4 },
      { label: "Media & Entertainment", href: "/our-expertise/industries/media-entertainment", order: 5 },
      { label: "Healthcare", href: "/our-expertise/industries/healthtech", order: 6 },
      { label: "Retail", href: "/our-expertise/industries/retail", order: 7 },
      { label: "Facility Management", href: "/our-expertise/industries/facility-management", order: 8 },
      { label: "Supply Chain & Logistics", href: "/our-expertise/industries/transport", order: 9 },
      { label: "Telecom", href: "/our-expertise/industries/telecom", order: 10 },
      { label: "Travel & Hospitality", href: "/our-expertise/industries/travel", order: 11 },
    ],
  },
  {
    title: "Offshore Developers",
    order: 4,
    links: [
      { label: "Hire Backend Developer", href: "/offshore-developer/backend-developer/nodejs-developer", order: 1 },
      { label: "Hire Frontend Developer", href: "/offshore-developer/frontend-developer/reactjs-developer", order: 2 },
      { label: "Hire App Developer", href: "/offshore-developer/mobile-app-developer/react-native-developer", order: 3 },
      { label: "Hire DevOps Engineer", href: "/offshore-developer/devops-engineers/aws-developer", order: 4 },
      { label: "Hire AI Engineer", href: "/offshore-developer/ai-engineers/ai-development-teams", order: 5 },
      { label: "Hire Full Stack Developer", href: "/offshore-developer/mobile-app-developer/full-stack-developer", order: 6 },
      { label: "Hire Salesforce Developer", href: "/offshore-developer/platforms/salesforce-developer", order: 7 },
      { label: "Hire PowerApps Developers", href: "/offshore-developer/platforms/ms-power-apps-developer", order: 8 },
    ],
  },
  {
    title: "Resources",
    order: 5,
    links: [
      { label: "Portfolio", href: "/resources/portfolio", order: 1 },
      { label: "Careers", href: "/resources/careers", order: 2 },
      { label: "Blog", href: "/resources/blogs", order: 3 },
      { label: "Our Team", href: "/resources/our-team", order: 4 },
      { label: "Interns", href: "/resources/interns-alumni", order: 5 },
    ],
  },
];

const defaultOffices: OfficeLocation[] = [
  { name: "India", address: "", email: "", flagImage: "/images/india.svg", order: 1, isPublished: true },
  { name: "New York, USA", address: "", email: "", flagImage: "/images/usa.svg", order: 2, isPublished: true },
  { name: "Sydney, Australia", address: "", email: "", flagImage: "/images/australia.svg", order: 3, isPublished: true },
  { name: "Dubai, UAE", address: "", email: "", flagImage: "/images/uae.svg", order: 4, isPublished: true },
  { name: "London, UK", address: "", email: "", flagImage: "/images/uk.svg", order: 5, isPublished: true },
  { name: "Milan, Italy", address: "", email: "", flagImage: "/images/italy.svg", order: 6, isPublished: true },
  { name: "Thailand", address: "", email: "", flagImage: "/images/thailand.svg", order: 7, isPublished: true },
  { name: "South Africa", address: "", email: "", flagImage: "/images/south-africa.svg", order: 8, isPublished: true },
  { name: "Canada", address: "", email: "", flagImage: "/images/canada.svg", order: 9, isPublished: true },
];

type FooterProps = {
  settings?: Partial<SiteSettings>;
};

const legacyOffshoreLabels = [
  "Hire Node.js Developer",
  "Hire React Developer",
  "Hire Python Developer",
  "Hire Flutter Developer",
  "Hire DevOps Engineer",
  "Hire AWS Developer",
  "Hire Full Stack Developer",
  "Hire AI Developer",
];
const legacyResourceLabels = ["Blogs", "Careers", "Our Team", "Interns & Alumni", "Portfolio"];

function normalizeFooterColumns(columns: FooterColumn[]) {
  return columns.map((column) => {
    if (column.title === "Offshore Developers") {
      const labels = column.links.map((link) => link.label);
      const isLegacy = labels.length === legacyOffshoreLabels.length && legacyOffshoreLabels.every((label) => labels.includes(label));

      if (isLegacy) {
        return defaultFooterColumns.find((item) => item.title === "Offshore Developers") ?? column;
      }
    }

    if (column.title === "Resources") {
      const labels = column.links.map((link) => link.label);
      const isLegacy = labels.length === legacyResourceLabels.length && legacyResourceLabels.every((label) => labels.includes(label));

      if (isLegacy) {
        return defaultFooterColumns.find((item) => item.title === "Resources") ?? column;
      }
    }

    return column;
  });
}

function normalizeOfficeName(name: string) {
  const officeMap: Record<string, string> = {
    "New York USA": "New York, USA",
    "Sydney Australia": "Sydney, Australia",
    "Dubai UAE": "Dubai, UAE",
    "London UK": "London, UK",
    "Milan Italy": "Milan, Italy",
  };

  return officeMap[name] ?? name;
}

const FLAGS: Record<string, string> = {
  india: "/images/india.svg", usa: "/images/usa.svg", australia: "/images/australia.svg", uae: "/images/uae.svg", uk: "/images/uk.svg",
  italy: "/images/italy.svg", thailand: "/images/thailand.svg", "south africa": "/images/south-africa.svg", canada: "/images/canada.svg",
};

const Footer = ({ settings }: FooterProps) => {
  // Use settings or fallback to defaults
  const newsletterTitle = settings?.newsletterTitle || "Subscribe To Our Newsletter";
  const copyrightText = settings?.copyrightText || <>©2016–{new Date().getFullYear()} <a href="https://alpixn.com" target="_blank" rel="noopener noreferrer">Alpixn</a> All Rights Reserved.</>;
  const footerColumns = settings?.footerColumns?.length ? settings.footerColumns : defaultFooterColumns;
  const offices = settings?.offices?.length ? settings.offices.filter(o => o.isPublished) : defaultOffices;
  const socialMedia = settings?.socialMedia || {
    instagram: "https://www.instagram.com/Alpixnglobal",
    linkedin: "https://www.linkedin.com/company/alpixn",
    facebook: "https://www.facebook.com/Alpixn",
    twitter: "https://x.com/Alpixn",
    youtube: "https://youtube.com/@Alpixnglobal",
  };
  const footerDescription = settings?.footerDescription;

  // Sort columns and offices by order
  const sortedColumns = normalizeFooterColumns([...footerColumns]).sort((a, b) => a.order - b.order);
  const sortedOffices = [...offices].sort((a, b) => a.order - b.order);

  const socials = [
    { href: socialMedia.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: socialMedia.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: socialMedia.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: socialMedia.twitter, label: "X", Icon: XIcon },
    { href: socialMedia.youtube, label: "YouTube", Icon: YouTubeIcon },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-canvas text-fg">
      {/* Ambient brand lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-azure/20 blur-[140px] dark:bg-azure/25" />
        <div className="absolute -bottom-40 right-[-5%] h-[380px] w-[380px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_20%,transparent_80%)]" />
      </div>
      <div aria-hidden className="rule-gold relative" />

      <div className="relative mx-auto w-full max-w-[1350px] px-4 sm:px-6 lg:px-8 xl:px-0">
        {/* Brand + newsletter band */}
        <div className="grid gap-10 border-b border-line py-12 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="flex flex-col gap-5">
            <BrandLogo src={settings?.logoUrl} alt={settings?.logoAlt} height={48} />
            {footerDescription ? (
              <p className="max-w-[460px] text-sm sm:text-[15px] leading-relaxed text-fg-muted">{footerDescription}</p>
            ) : null}
          </div>

          <div className="glass rounded-2xl p-5 sm:p-6">
            <p className="font-display text-lg sm:text-xl font-semibold leading-snug">{newsletterTitle}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <InputField
                type="email"
                name="newsletterEmail"
                label="Email Address"
                autoComplete="email"
                className="h-12 sm:h-[52px] rounded-full !border-line !bg-[var(--surface)] px-5 !text-fg"
                labelClassName="!left-5"
              />
              <button type="submit" className="btn-brand shrink-0 !py-0 h-12 sm:h-[52px]">
                Subscribe
                <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Link columns (CMS driven) */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {sortedColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-ink">{column.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {[...column.links].sort((a, b) => a.order - b.order).map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[15px] leading-snug text-fg-muted transition-colors hover:text-fg"
                    >
                      <span aria-hidden className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Offices (CMS driven): flag + city + live local time */}
        {sortedOffices.length ? (
          <div className="border-t border-line py-8">
            <div>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm lg:justify-between">
                {sortedOffices.map((office, index) => {
                  const name = normalizeOfficeName(office.name);
                  const { zone } = zoneFor(name);
                  return (
                    <li key={index} className="flex items-center gap-2 text-fg-muted">
                      <span className="relative block h-5 w-5 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-white shadow-[0_0_0_1px_rgba(7,26,51,0.12)]">
                        <Image src={office.flagImage || FLAGS[name.split(",").pop()!.trim().toLowerCase()] || "/images/india.svg"} alt="" fill sizes="20px" unoptimized={(office.flagImage || "").startsWith("data:") || (office.flagImage || "").startsWith("http")} className="scale-[1.08] object-cover" />
                      </span>
                      <span className="font-medium text-fg">{name.split(",")[0]}</span>
                      <LocalTime zone={zone} className="font-mono text-xs text-fg-subtle" />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-line">
        <div className="mx-auto flex w-full max-w-[1350px] flex-col items-center gap-5 px-4 py-6 sm:px-6 lg:px-8 xl:flex-row xl:justify-between xl:px-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-fg-subtle">Follow</span>
            <ul className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <Link
                    href={href || "#"}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center text-xs sm:text-sm text-fg-subtle [&_a]:text-fg-muted [&_a:hover]:text-gold">{copyrightText}</div>

          <div className="flex items-center gap-4 text-xs sm:text-sm font-medium uppercase tracking-[0.12em]">
            <Link href="/privacy-policy" prefetch={false} className="text-fg-muted transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <span aria-hidden className="h-4 w-px bg-line" />
            <Link href="/sitemap" prefetch={false} className="text-fg-muted transition-colors hover:text-gold">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
