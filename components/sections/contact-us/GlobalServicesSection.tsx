import Image from "next/image";

interface ContactOffice {
  name: string;
  address: string;
  email: string;
  flagImage: string;
  order: number;
  isPublished: boolean;
}

interface GlobalServicesSectionProps {
  title?: string;
  offices?: ContactOffice[];
}

const defaultOffices: ContactOffice[] = [
  { name: "India", address: "", email: "", flagImage: "/images/india.svg", order: 1, isPublished: true },
  { name: "Sydney, Australia", address: "", email: "", flagImage: "/images/sydney.svg", order: 2, isPublished: true },
  { name: "Dubai, UAE", address: "", email: "", flagImage: "/images/uae.svg", order: 3, isPublished: true },
  { name: "Milan, Italy", address: "", email: "", flagImage: "/images/italy.svg", order: 4, isPublished: true },
  { name: "London, UK", address: "", email: "", flagImage: "/images/uk.svg", order: 5, isPublished: true },
  { name: "New York, USA", address: "", email: "", flagImage: "/images/usa.svg", order: 6, isPublished: true },
  { name: "Canada", address: "", email: "", flagImage: "/images/canada.svg", order: 7, isPublished: true },
  { name: "South Africa", address: "", email: "", flagImage: "/images/south-africa.svg", order: 8, isPublished: true },
  { name: "Thailand", address: "", email: "", flagImage: "/images/thailand.svg", order: 9, isPublished: true },
];

function getFallbackFlagByOfficeName(name: string) {
  const officeFlagMap: Record<string, string> = {
    India: "/images/india.svg",
    "Sydney, Australia": "/images/sydney.svg",
    "Dubai, UAE": "/images/uae.svg",
    "Milan, Italy": "/images/italy.svg",
    "London, UK": "/images/uk.svg",
    "New York, USA": "/images/usa.svg",
    Canada: "/images/canada.svg",
    "South Africa": "/images/south-africa.svg",
    Thailand: "/images/thailand.svg",
  };

  return officeFlagMap[name] ?? "/images/india.svg";
}

const GlobalServicesSection = ({ title = "Markets We Serve", offices = defaultOffices }: GlobalServicesSectionProps) => {
  const sortedOffices = [...offices].filter((o) => o.isPublished).sort((a, b) => a.order - b.order);
  // Legacy CMS title claimed physical offices; markets are what we can state honestly.
  const heading = /global offices/i.test(title) ? "Markets We Serve" : title;
  const tones = ["#0878d1", "#d99a19", "#064a87", "#9a5b08"];

  return (
    <section aria-labelledby="markets-heading" className="bg-canvas-2 py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d99a19]/35 bg-[#f6d77a]/25 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#9a5b08] dark:bg-[#d99a19]/10 dark:text-[#f6d77a]">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Global delivery
          </span>
          <h2 id="markets-heading" className="mt-4 font-display text-[clamp(1.5rem,2.3vw,2.05rem)] font-bold leading-[1.12] tracking-[-0.025em] text-fg">
            {heading}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedOffices.map((office, index) => {
            const flag = office.flagImage || getFallbackFlagByOfficeName(office.name);
            const tone = tones[index % tones.length];
            return (
              <li key={office.name} className="relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: tone }} />
                <div className="flex items-center gap-3">
                  <Image src={flag} alt="" width={36} height={36} unoptimized={flag.startsWith("data:") || flag.startsWith("http")} className="h-9 w-9 rounded-full object-cover ring-1 ring-black/10" />
                  <span className="font-display text-lg font-semibold text-fg">{office.name}</span>
                </div>
                {office.address ? <p className="mt-3 text-sm leading-relaxed text-fg-muted">{office.address}</p> : null}
                {office.email ? (
                  <a href={`mailto:${office.email}`} className="mt-2 inline-block text-sm font-medium text-[#0878d1] hover:underline">
                    {office.email}
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default GlobalServicesSection;
