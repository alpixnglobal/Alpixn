/** Friendly robot head used for the website assistant (pure SVG + CSS animation). */
export default function RobotAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className={className}>
      <defs>
        <linearGradient id="rb-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0878d1" />
          <stop offset="1" stopColor="#071a33" />
        </linearGradient>
        <linearGradient id="rb-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6d77a" />
          <stop offset="1" stopColor="#d99a19" />
        </linearGradient>
      </defs>
      <line x1="32" y1="6" x2="32" y2="14" stroke="#d99a19" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="6" r="3.5" fill="url(#rb-gold)" className="assistant-antenna" />
      <rect x="9" y="14" width="46" height="38" rx="14" fill="url(#rb-head)" />
      <rect x="4" y="27" width="6" height="13" rx="3" fill="#d99a19" />
      <rect x="54" y="27" width="6" height="13" rx="3" fill="#d99a19" />
      <rect x="15" y="21" width="34" height="22" rx="10" fill="#040d1c" />
      <g className="assistant-eyes">
        <ellipse cx="25" cy="31" rx="4" ry="4.6" fill="url(#rb-gold)" />
        <ellipse cx="39" cy="31" rx="4" ry="4.6" fill="url(#rb-gold)" />
      </g>
      <path d="M26 38 Q32 42 38 38" stroke="#f6d77a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <rect x="22" y="52" width="20" height="6" rx="3" fill="#064a87" />
    </svg>
  );
}
