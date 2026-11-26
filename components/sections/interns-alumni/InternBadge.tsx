export type BadgeVariant = "gold" | "silver" | "royalBlue";

interface InternBadgeProps {
  variant?: BadgeVariant;
  label?: string;
  code?: string;
}

const BADGE_STYLES: Record<
  BadgeVariant,
  {
    background: string;
    foldColor: string;
    textColor: string;
  }
> = {
  gold: {
    background: "linear-gradient(90deg, #FFA245 0%, #FFD041 100%)",
    foldColor: "#8B6800",
    textColor: "#FFFFFF",
  },
  silver: {
    background: "linear-gradient(278.66deg, var(--heading-from) -86%, #8CA0A7 100%)",
    foldColor: "#6F8288",
    textColor: "#0B1F26",
  },
  royalBlue: {
    background: "linear-gradient(278.66deg, #0D3885 -86%, var(--tech) 100%)",
    foldColor: "#08285F",
    textColor: "#FFFFFF",
  },
};

const InternBadge = ({ variant = "gold", label = "Gold", code = "AXANO/INT/2025/03" }: InternBadgeProps) => {
  const styles = BADGE_STYLES[variant];

  return (
    <div
      style={{
        position: "absolute",
        top: "-13px",
        left: "-11px",
        zIndex: 20,
        width: "137px",
        height: "60px",
      }}
    >
      {/* Ribbon Body */}
      <div
        style={{
          position: "relative",
          width: "137px",
          height: "46px",
          background: styles.background,
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 5px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1.1,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="font-medium text-xs md:text-sm leading-snug text-fg">{label}</span>
            <span className="text-fg text-xs font-normal leading-relaxed">{code}</span>
          </div>
        </div>

        {/* Ribbon Fold (your working triangle) */}
        <span
          style={{
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "0",
            width: 0,
            height: 0,
            borderTop: `8px solid ${styles.foldColor}`,
            borderLeft: "8px solid transparent",
          }}
        />
      </div>
    </div>
  );
};

export default InternBadge;