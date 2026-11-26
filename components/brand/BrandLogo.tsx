import Image from "next/image";
import Link from "next/link";

/** Approved ALPIXN artwork (from the brand guidelines master PNG). */
export const BRAND_LOGO_SRC = "/brand/alpixn-logo-horizontal.webp";
export const BRAND_EMBLEM_SRC = "/brand/alpixn-emblem.webp";
export const BRAND_LOGO_ALT = "ALPIXN";
/** Intrinsic size of the trimmed horizontal lockup — keep for correct aspect ratio. */
const LOGO_W = 2123;
const LOGO_H = 637;

/** Values that meant "no custom logo" in the old CMS (placeholder artwork). */
const LEGACY_LOGO_VALUES = new Set(["", "/images/logo.png", "images/logo.png"]);

/**
 * The header/footer logo still comes from Site Settings (admin can upload a new one),
 * but legacy placeholder values resolve to the approved ALPIXN lockup.
 */
export function resolveBrandLogo(url?: string | null) {
  const trimmed = (url ?? "").trim();
  return LEGACY_LOGO_VALUES.has(trimmed) ? BRAND_LOGO_SRC : trimmed;
}

export function resolveBrandLogoAlt(alt?: string | null) {
  const trimmed = (alt ?? "").trim();
  if (!trimmed || /axaon|^logo$/i.test(trimmed)) return BRAND_LOGO_ALT;
  return trimmed;
}

type BrandLogoProps = {
  src?: string | null;
  alt?: string | null;
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
  href?: string | null;
  onClick?: () => void;
};

export function BrandLogo({ src, alt, height = 44, className = "", priority = false, href = "/", onClick }: BrandLogoProps) {
  const resolvedSrc = resolveBrandLogo(src);
  const resolvedAlt = resolveBrandLogoAlt(alt);
  const isBrand = resolvedSrc === BRAND_LOGO_SRC;
  const unoptimized = resolvedSrc.startsWith("data:") || resolvedSrc.startsWith("http");

  const img = isBrand ? (
    <Image
      src={resolvedSrc}
      alt={resolvedAlt}
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      sizes={`${Math.round((height * LOGO_W) / LOGO_H)}px`}
      style={{ height, width: "auto" }}
      className="block max-w-full object-contain drop-shadow-[0_2px_10px_rgba(217,154,25,0.18)]"
    />
  ) : (
    // Custom admin-uploaded logo: unknown ratio, so constrain by height and let width follow.
    <span className="relative block" style={{ height, width: height * 3.3 }}>
      <Image src={resolvedSrc} alt={resolvedAlt} fill sizes="240px" priority={priority} unoptimized={unoptimized} className="object-contain object-left" />
    </span>
  );

  if (!href) return <span className={`inline-flex ${className}`}>{img}</span>;

  return (
    <Link href={href} onClick={onClick} aria-label={`${resolvedAlt} — home`} className={`inline-flex shrink-0 rounded-md ${className}`}>
      {img}
    </Link>
  );
}
