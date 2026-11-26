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
  { name: "India", address: "3rd & 10th Floor, Tower B, Cyber Park, Secot -39, Mumbai", email: "india-sales@axano.in", flagImage: "/images/india.svg", order: 1, isPublished: true },
  { name: "Sydney, Australia", address: "Office 117, The Sebel South Brisbane, 23 Merivale St", email: "aus-sales@axano.in", flagImage: "/images/sydney.svg", order: 2, isPublished: true },
  { name: "Dubai, UAE", address: "Office 1704, Tower B, Business Central, Dubai Internet City", email: "dubai-sales@axano.in", flagImage: "/images/uae.svg", order: 3, isPublished: true },
  { name: "Milan, Italy", address: "Via Monte Napoleone, 8, 20121 Milano, Italy", email: "italy-sales@axano.in", flagImage: "/images/italy.svg", order: 4, isPublished: true },
  { name: "London, UK", address: "100 Liverpool Street, London, EC2M 2RH, United Kingdom", email: "uk-sales@axano.in", flagImage: "/images/uk.svg", order: 5, isPublished: true },
  { name: "New York, USA", address: "750 Highway 121 BYP, STE 100, Lewisville, TX", email: "usa-sales@axano.in", flagImage: "/images/usa.svg", order: 6, isPublished: true },
  { name: "Canada", address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7", email: "canada-sales@axano.in", flagImage: "/images/canada.svg", order: 7, isPublished: true },
  { name: "South Africa", address: "The Zone @ Rosebank, 177 Oxford Road, Johannesburg", email: "sa-sales@axano.in", flagImage: "/images/south-africa.svg", order: 8, isPublished: true },
  { name: "Thailand", address: "1 Empire Tower, South Sathorn Road, Sathorn, Bangkok", email: "thailand-sales@axano.in", flagImage: "/images/thailand.svg", order: 9, isPublished: true },
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

const GlobalServicesSection = ({
  title = "Our Global Offices",
  offices = defaultOffices,
}: GlobalServicesSectionProps) => {
  const sortedOffices = [...offices].filter(o => o.isPublished).sort((a, b) => a.order - b.order);

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 65%, rgba(0, 35, 72, 1) 100%)" }}
      />
      {/* Container */}
      <div className="container max-w-[1122px]">
        <h2 className="heading-gradient font-bold text-2xl sm:text-3xl md:text-4xl text-left sm:text-center">
          {title}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12.5">
          {sortedOffices.map((office, index) => (
            (() => {
              const resolvedFlag = office.flagImage || getFallbackFlagByOfficeName(office.name);
              const shouldUnoptimizeFlag =
                resolvedFlag.startsWith("data:") ||
                resolvedFlag.startsWith("http://") ||
                resolvedFlag.startsWith("https://");

              return (
                <div
                  key={index}
                  className="p-5 w-full h-[182px] rounded-[10px] relative"
                  style={{
                    background: "linear-gradient(180deg, rgba(24, 24, 24, 0.24) 0%, rgba(56, 158, 255, 0.06) 100%)",
                  }}
                >
                  {/* Gradient border overlay */}
                  <div
                    className="absolute inset-0 rounded-[10px] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(100% 100% at 49.96% 0%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 72.87%)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      padding: "1px",
                    }}
                  />

                  <div className="flex flex-col gap-5 relative z-10">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-7 h-7 lg:w-9 lg:h-9 relative flex-shrink-0">
                        <Image src={resolvedFlag} alt={office.name} fill className="object-contain" unoptimized={shouldUnoptimizeFlag} />
                      </div>
                      <span className="font-semibold text-white text-lg lg:text-xl">{office.name}</span>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-3 lg:w-5 lg:h-4 flex-shrink-0"
                      >
                        <path
                          d="M1.75011 0.75H17.7501C18.3001 0.75 18.7501 1.2 18.7501 1.75V13.75C18.7501 14.3 18.3001 14.75 17.7501 14.75H1.75011C1.20011 14.75 0.750107 14.3 0.750107 13.75V1.75C0.750107 1.2 1.20011 0.75 1.75011 0.75Z"
                          stroke="white"
                          strokeOpacity="0.8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M0.750107 2.25L9.75011 7.75L18.7501 2.25"
                          stroke="white"
                          strokeOpacity="0.8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="font-normal text-white/80 text-sm lg:text-base">{office.email}</span>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <div className="w-[18px] h-[22px] lg:w-[22px] lg:h-[26px] relative flex-shrink-0">
                        <Image src="/icons/map.svg" alt="location" fill className="object-contain" />
                      </div>

                      <span className="font-normal text-white/80 text-sm lg:text-base">{office.address}</span>
                    </div>
                  </div>
                </div>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalServicesSection;
