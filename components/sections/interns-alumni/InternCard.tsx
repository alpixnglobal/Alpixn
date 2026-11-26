import Image from "next/image";
import InternBadge from "./InternBadge";

type BadgeVariant = "gold" | "silver" | "royalBlue";

interface InternCardProps {
  name: string;
  role: string;
  period: string;
  imageSrc: string;
  imageAlt?: string;
  initials?: string;
  accent?: string;

  badgeVariant?: BadgeVariant;
  badgeLabel?: string;
  badgeCode?: string;
}

const InternCard = ({
  name,
  role,
  period,
  imageSrc,
  imageAlt = "",
  initials = "AX",
  accent = "linear-gradient(135deg, rgba(56,158,255,0.18), rgba(212,33,144,0.22))",
  badgeVariant = "gold",
  badgeLabel = "Gold",
  badgeCode = "AXANO/INT/2025/03",
}: InternCardProps) => {
  const hasImage = Boolean(imageSrc);

  return (
    <div className="group relative flex flex-col rounded-[15px] h-fit lg:h-97.25">
      {/* Base background */}
      <div
        className="absolute inset-0 rounded-[15px] z-0 transition-opacity duration-700 opacity-100 group-hover:opacity-0"
        style={{
          background: "linear-gradient(180deg, rgba(24,24,24,0.24) 0%, rgba(56,158,255,0.06) 100%)",
          border: "1px solid #FFFFFF26",
        }}
      />
      {/* Hover background */}
      <div
        className="absolute inset-0 rounded-[15px] z-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, rgba(24,24,24,0.32) 0%, rgba(56,158,255,0.18) 100%)",
          border: "1px solid #FFFFFF26",
        }}
      />

      {/* Badge */}
      <div className="absolute z-50">
        <InternBadge variant={badgeVariant} label={badgeLabel} code={badgeCode} />
      </div>

      {/* Image */}
      <div className="relative w-full min-h-67 z-10 overflow-hidden rounded-t-[15px]">
        {hasImage ? (
          <Image
            src={imageSrc}
            alt={imageAlt || name}
            fill
            unoptimized={imageSrc.startsWith("data:") || imageSrc.startsWith("http")}
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: accent }}>
            <span className="text-4xl font-semibold tracking-[0.2em] text-white">{initials}</span>
          </div>
        )}
      </div>

      {/* Name & Role */}
      <div className="relative z-10 flex flex-col gap-0.5 ml-2.5 mt-2.5">
        <h6 className="text-sm md:text-base font-semibold leading-snug">{name}</h6>
        <p className="text-white/80 text-sm font-normal leading-relaxed">{role}</p>
      </div>

      {/* Period */}
      <div className="relative z-10 flex gap-2.5 mt-4 lg:mt-auto ml-2.5 mb-2.5">
        <Image src="/icons/calendar.svg" alt="calendar" width={10.74} height={11.93} />
        <div className="text-sm font-normal leading-relaxed text-white">{period}</div>
      </div>
    </div>
  );
};

export default InternCard;
