import Link from "next/link";
import { Button } from "../ui/buttonBtn";
import { InputField } from "../ui/Input";
import Image from "next/image";
import CountryItem from "./CountryItem";
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

const originalFooterColumnWidths = ["154px", "207px", "184px", "206px", "102px"];
const originalOfficeWidths = ["72px", "142px", "164px", "117px", "121px", "115px", "100px", "128px", "93px"];
const originalOfficeWidthByName: Record<string, string> = {
  India: "72px",
  "New York, USA": "142px",
  "Sydney, Australia": "164px",
  "Dubai, UAE": "117px",
  "London, UK": "121px",
  "Milan, Italy": "115px",
  Thailand: "100px",
  "South Africa": "128px",
  Canada: "93px",
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

function normalizeOfficeFlag(flagImage: string | undefined, officeName: string) {
  const normalizedName = normalizeOfficeName(officeName);

  const officeFlagMap: Record<string, string> = {
    India: "/images/india.svg",
    "New York, USA": "/images/usa.svg",
    "Sydney, Australia": "/images/australia.svg",
    "Dubai, UAE": "/images/uae.svg",
    "London, UK": "/images/uk.svg",
    "Milan, Italy": "/images/italy.svg",
    Thailand: "/images/thailand.svg",
    "South Africa": "/images/south-africa.svg",
    Canada: "/images/canada.svg",
  };

  const defaultByName = officeFlagMap[normalizedName] ?? "/images/india.svg";

  if (!flagImage || !flagImage.trim()) {
    return defaultByName;
  }

  const trimmedFlag = flagImage.trim();
  const normalizedFlag =
    trimmedFlag.startsWith("data:") || trimmedFlag.startsWith("http://") || trimmedFlag.startsWith("https://")
      ? trimmedFlag
      : trimmedFlag.startsWith("/")
        ? trimmedFlag
        : `/${trimmedFlag}`;

  // Fix known legacy/content mistakes without needing DB cleanup.
  if (normalizedName === "Thailand" && normalizedFlag === "/images/south-africa.svg") {
    return "/images/thailand.svg";
  }

  if (normalizedName === "South Africa" && (normalizedFlag === "/images/zulu.svg" || normalizedFlag === "/images/thailand.svg")) {
    return "/images/south-africa.svg";
  }

  return normalizedFlag;
}

const Footer = ({ settings }: FooterProps) => {
  // Use settings or fallback to defaults
  const newsletterTitle = settings?.newsletterTitle || "Subscribe To Our Newsletter";
  const copyrightText = settings?.copyrightText || <>©2016–{new Date().getFullYear()} <a href="https://alpixn.com" target="_blank" rel="noopener noreferrer">Alpixn</a> All Rights Reserved.</>;
  const footerColumns = settings?.footerColumns?.length ? settings.footerColumns : defaultFooterColumns;
  const offices = settings?.offices?.length ? settings.offices.filter(o => o.isPublished) : defaultOffices;
  const socialMedia = settings?.socialMedia || {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  };

  // Sort columns and offices by order
  const sortedColumns = normalizeFooterColumns([...footerColumns]).sort((a, b) => a.order - b.order);
  const sortedOffices = [...offices].sort((a, b) => a.order - b.order);
  const useOriginalColumnLayout = sortedColumns.length === originalFooterColumnWidths.length;
  const useOriginalOfficeLayout = sortedOffices.length === originalOfficeWidths.length;
  const originalOfficeGridTemplate = sortedOffices
    .flatMap((office, index) => {
      const normalizedOfficeName = normalizeOfficeName(office.name);
      const width = originalOfficeWidthByName[normalizedOfficeName] ?? originalOfficeWidths[index] ?? "120px";
      return index < sortedOffices.length - 1 ? [width, "auto"] : [width];
    })
    .join(" ");

  const renderColumn = (column?: FooterColumn, addTopMargin = false) => {
    if (!column) return null;

    return (
      <div className={`flex flex-col ${addTopMargin ? "mt-6 lg:mt-0" : ""}`}>
        <p className="font-semibold text-xl sm:text-2xl leading-snug">{column.title}</p>
        <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4">
          {[...column.links].sort((a, b) => a.order - b.order).map((link, linkIndex) => (
            <Link href={link.href} key={linkIndex} className="font-normal text-base leading-relaxed hover:text-blue-300 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <footer
      className="relative w-full text-white pt-12.5 overflow-hidden"
      style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 75%, rgba(0, 35, 72, 1) 100%)" }}
    >
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-gradient-to-t from-[#0c1822] to-[rgba(0,0,0,0.15)]" />
      <div className="absolute top-0 z-[-1] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div
        className="absolute w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px] 
                   left-[-40px] sm:left-[-60px] lg:left-[-79px] top-[-40px] sm:top-[-60px] lg:top-[-80px] 
                   bg-[#389EFF] opacity-[0.53] rounded-full"
        style={{ filter: "blur(250px)" }}
      />
      <div
        className="absolute w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px] 
                   right-[-40px] sm:right-[-60px] lg:right-[calc(100%-1183px)] top-[-40px] sm:top-[-60px] lg:top-[-80px] 
                   bg-[#389EFF] opacity-[0.53] rounded-full"
        style={{ filter: "blur(250px)" }}
      />
      <div
        className="absolute w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px] 
                   left-[-40px] sm:left-[-60px] lg:left-[-79px] bottom-[-40px] sm:bottom-[-60px] lg:top-[680px] 
                   bg-[#389EFF] opacity-[0.53] rounded-full"
        style={{ filter: "blur(250px)" }}
      />
      <div
        className="absolute w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px] 
                   right-[-40px] sm:right-[-60px] lg:right-[calc(100%-1183px)] bottom-[-40px] sm:bottom-[-60px] lg:top-[680px] 
                   bg-[#389EFF] opacity-[0.53] rounded-full"
        style={{ filter: "blur(250px)" }}
      />

      {/* Newsletter Section */}
      <div className="container max-w-[1350px]">
        <div className="flex flex-col gap-5 sm:gap-0">
          <p className="text-left sm:text-center font-semibold text-xl sm:text-2xl sm:mb-6">{newsletterTitle}</p>
          <div className="flex flex-col sm:flex-row w-full max-w-[469px] mx-auto items-center justify-center">
            <InputField
              type="email"
              label="Email Address"
              className="h-12 sm:h-[60px] border-r-0 rounded-l-[3px] w-full rounded-r-[3px] sm:rounded-r-none  bg-white"
              labelClassName="!text-[#6F6F6F] !font-medium"
            />
            <Button
              type="submit"
              className="rounded-l-none h-12 sm:h-[60px] rounded-l-[3px] sm:rounded-l-none rounded-r-[3px] w-full sm:w-auto sm:max-w-[134px] font-medium px-8 mt-1 sm:mt-0 text-sm sm:text-base"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links Grid - Dynamic columns */}
        {useOriginalColumnLayout ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[154px_207px_184px_206px_102px] gap-6 lg:gap-10 justify-between mt-6 sm:mt-20">
            {renderColumn(sortedColumns[0])}
            {renderColumn(sortedColumns[1], true)}
            {renderColumn(sortedColumns[2], true)}
            {renderColumn(sortedColumns[3], true)}
            {renderColumn(sortedColumns[4], true)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 justify-between mt-6 sm:mt-20">
            {sortedColumns.map((column, colIndex) => (
              <div key={colIndex}>{renderColumn(column, colIndex > 0)}</div>
            ))}
          </div>
        )}

        {/* Countries Grid - Dynamic offices */}
        {useOriginalOfficeLayout ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 xl:gap-0 justify-between my-8 sm:my-12.5"
            style={{ gridTemplateColumns: originalOfficeGridTemplate }}
          >
            {sortedOffices.map((office, index) => (
              <div key={index} className="contents">
                <CountryItem
                  flag={normalizeOfficeFlag(office.flagImage, office.name)}
                  name={normalizeOfficeName(office.name)}
                  alt={`${normalizeOfficeName(office.name).split(",")[0]} Flag`}
                />
                {index < sortedOffices.length - 1 ? <div className="hidden lg:block" /> : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 justify-between my-8 sm:my-12.5">
            {sortedOffices.map((office, index) => (
              <CountryItem
                key={index}
                flag={normalizeOfficeFlag(office.flagImage, office.name)}
                name={normalizeOfficeName(office.name)}
                alt={`${normalizeOfficeName(office.name).split(",")[0]} Flag`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Bottom */}
      <div className="relative border-t border-t-white/20 min-h-[77px] w-full flex items-center">
        <div className="w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          {/* Mobile layout */}
          <div className="flex flex-col items-center gap-4 py-4 xl:hidden">
            <div className="flex items-center gap-3">
              <span className="font-medium text-xs text-white/80">Follow:</span>
              <div className="flex items-center gap-3">
                <Link href={socialMedia.instagram || "#"} aria-label="Instagram">
                  <Image src="/images/ig.svg" alt="IG" width={20} height={20} className="w-5 h-5" />
                </Link>
                <Link href={socialMedia.linkedin || "#"} aria-label="LinkedIn">
                  <Image src="/images/in.svg" alt="IN" width={20} height={20} className="w-5 h-5" />
                </Link>
                <Link href={socialMedia.facebook || "#"} aria-label="Facebook">
                  <Image src="/images/fb.svg" alt="FB" width={20} height={20} className="w-5 h-5" />
                </Link>
                <Link href={socialMedia.twitter || "#"} aria-label="X">
                  <Image src="/images/x.svg" alt="X" width={20} height={20} className="w-5 h-5" />
                </Link>
                <Link href={socialMedia.youtube || "#"} aria-label="YouTube">
                  <Image src="/images/yt.svg" alt="YT" width={20} height={20} className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="font-normal text-xs text-white/80 whitespace-nowrap">{copyrightText}</div>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="uppercase font-medium text-xs hover:text-blue-300 text-white/80">
                Privacy Policy
              </Link>
              <div className="h-4 border-l border-white/40" />
              <Link href="/sitemap" className="uppercase font-medium text-xs hover:text-blue-300 text-white/80">
                Sitemap
              </Link>
            </div>
          </div>

          {/* XL layout */}
          <div className="hidden xl:grid xl:grid-cols-[269px_auto_174px_auto_190px] items-center justify-between h-[77px]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-white/80">Follow Us :</span>
              <div className="flex items-center justify-between gap-[5px] flex-1">
                <Link href={socialMedia.instagram || "#"} aria-label="Instagram">
                  <Image src="/images/ig.svg" alt="IG" width={25} height={25} />
                </Link>
                <Link href={socialMedia.linkedin || "#"} aria-label="LinkedIn">
                  <Image src="/images/in.svg" alt="IN" width={24.79} height={24.79} />
                </Link>
                <Link href={socialMedia.facebook || "#"} aria-label="Facebook">
                  <Image src="/images/fb.svg" alt="FB" width={26} height={26} />
                </Link>
                <Link href={socialMedia.twitter || "#"} aria-label="X">
                  <Image src="/images/x.svg" alt="X" width={26} height={23} />
                </Link>
                <Link href={socialMedia.youtube || "#"} aria-label="YouTube">
                  <Image src="/images/yt.svg" alt="YT" width={29} height={20} />
                </Link>
              </div>
            </div>
            <div></div>
            <div className="font-normal text-sm text-center text-white/80 whitespace-nowrap">{copyrightText}</div>
            <div></div>
            <div className="flex items-center justify-between">
              <Link href="/privacy-policy" className="uppercase font-medium text-sm hover:text-blue-300 text-white/80">
                Privacy Policy
              </Link>
              <div className="flex justify-center">
                <div className="h-[19px] border-l border-white/40" />
              </div>
              <Link href="/sitemap" className="uppercase font-medium text-sm hover:text-blue-300 text-white/80">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
