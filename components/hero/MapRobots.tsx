/**
 * Tiny animated robots that live on the hero world map.
 * Pure SVG + CSS (keyframes in globals.css under `.world-connect`), sized in % of the map
 * so they scale with it. Decorative only.
 */

const NAVY = "#071a33";

function Head({ visor = NAVY }: { visor?: string }) {
  return (
    <g>
      <line x1="20" y1="2.5" x2="20" y2="6" stroke={NAVY} strokeWidth="1.2" />
      <circle cx="20" cy="2.2" r="1.7" fill="#f0c14b" className="rb-blink-light" />
      <rect x="8" y="6" width="24" height="15" rx="6" fill="#ffffff" stroke={NAVY} strokeWidth="1.4" />
      <rect x="11.5" y="9.5" width="17" height="7.5" rx="3.75" fill={visor} />
      <g className="rb-eyes">
        <circle cx="16.5" cy="13.2" r="1.5" fill="#4fb0ff" />
        <circle cx="23.5" cy="13.2" r="1.5" fill="#4fb0ff" />
      </g>
    </g>
  );
}

/** Walking robot (optionally carrying a parcel). */
function Walker({ body = "#0878d1", parcel = false }: { body?: string; parcel?: boolean }) {
  return (
    <svg viewBox="0 0 40 50" className="h-full w-full overflow-visible">
      <ellipse cx="20" cy="49" rx="9" ry="1.6" fill={NAVY} opacity="0.18" />
      <g className="rb-bob">
        <g className="rb-leg-a">
          <rect x="14" y="35" width="4.5" height="10" rx="2" fill={NAVY} />
        </g>
        <g className="rb-leg-b">
          <rect x="21.5" y="35" width="4.5" height="10" rx="2" fill={NAVY} />
        </g>
        <rect x="11" y="22" width="18" height="15" rx="4.5" fill={body} stroke={NAVY} strokeWidth="1.4" />
        <circle cx="20" cy="29" r="2" fill="#f6d77a" />
        {parcel ? (
          <g>
            <rect x="6" y="23.5" width="5" height="3" rx="1.5" fill={NAVY} />
            <rect x="29" y="23.5" width="5" height="3" rx="1.5" fill={NAVY} />
            <rect x="9.5" y="15.5" width="21" height="11" rx="1.5" fill="#d99a19" stroke="#9a5b08" strokeWidth="1.2" transform="translate(0 7)" />
            <line x1="20" y1="22.5" x2="20" y2="33.5" stroke="#9a5b08" strokeWidth="1.2" />
          </g>
        ) : (
          <g>
            <g className="rb-arm-a">
              <rect x="6.5" y="23" width="4.5" height="10" rx="2" fill={NAVY} />
            </g>
            <g className="rb-arm-b">
              <rect x="29" y="23" width="4.5" height="10" rx="2" fill={NAVY} />
            </g>
          </g>
        )}
        <Head />
      </g>
    </svg>
  );
}

/** Seated robot typing on a laptop, code flickering on the screen. */
function Coder() {
  return (
    <svg viewBox="0 0 64 50" className="h-full w-full overflow-visible">
      <ellipse cx="32" cy="48.5" rx="22" ry="1.8" fill={NAVY} opacity="0.18" />
      {/* robot */}
      <g transform="translate(2 0)">
        <rect x="14" y="38" width="13" height="4.5" rx="2" fill={NAVY} />
        <rect x="11" y="22" width="18" height="17" rx="4.5" fill="#064a87" stroke={NAVY} strokeWidth="1.4" />
        <circle cx="20" cy="30" r="2" fill="#f6d77a" />
        <g className="rb-type-a">
          <rect x="26" y="27" width="12" height="4" rx="2" fill={NAVY} />
        </g>
        <g className="rb-type-b">
          <rect x="25" y="31" width="12" height="4" rx="2" fill={NAVY} />
        </g>
        <Head />
      </g>
      {/* laptop */}
      <path d="M37 41 H62 L58.5 44.5 H40.5 Z" fill="#94a3b8" stroke={NAVY} strokeWidth="1" />
      <g transform="skewX(-10)">
        <rect x="44" y="22" width="20" height="19" rx="2" fill={NAVY} stroke={NAVY} strokeWidth="1" />
        <rect x="46" y="25" width="9" height="1.6" rx="0.8" fill="#f0c14b" className="rb-code-1" />
        <rect x="48" y="28.5" width="11" height="1.6" rx="0.8" fill="#4fb0ff" className="rb-code-2" />
        <rect x="48" y="32" width="7" height="1.6" rx="0.8" fill="#f6d77a" className="rb-code-3" />
        <rect x="46" y="35.5" width="12" height="1.6" rx="0.8" fill="#7cc6ff" className="rb-code-1" />
      </g>
    </svg>
  );
}

/** Robot sketching a UI on a big screen; shapes appear one by one. */
function Designer() {
  return (
    <svg viewBox="0 0 70 52" className="h-full w-full overflow-visible">
      <ellipse cx="34" cy="50.5" rx="26" ry="1.8" fill={NAVY} opacity="0.18" />
      {/* screen on stand */}
      <rect x="2" y="4" width="36" height="26" rx="3" fill="#ffffff" stroke={NAVY} strokeWidth="1.4" />
      <rect x="2" y="4" width="36" height="5" rx="2.5" fill="#e7ecf3" />
      <rect x="18.5" y="30" width="3" height="16" fill={NAVY} />
      <rect x="12" y="45" width="16" height="2.5" rx="1.25" fill={NAVY} />
      <g className="rb-draw-1">
        <rect x="6" y="12" width="12" height="7" rx="1.5" fill="#0878d1" />
      </g>
      <g className="rb-draw-2">
        <circle cx="27" cy="15.5" r="4" fill="#d99a19" />
      </g>
      <g className="rb-draw-3">
        <rect x="6" y="22" width="26" height="2.2" rx="1.1" fill="#9a5b08" />
        <rect x="6" y="25.5" width="17" height="2.2" rx="1.1" fill="#f6d77a" />
      </g>
      {/* robot */}
      <g transform="translate(30 2)">
        <rect x="14" y="36" width="4.5" height="10" rx="2" fill={NAVY} />
        <rect x="21.5" y="36" width="4.5" height="10" rx="2" fill={NAVY} />
        <rect x="11" y="22" width="18" height="15" rx="4.5" fill="#d99a19" stroke={NAVY} strokeWidth="1.4" />
        <circle cx="20" cy="29" r="2" fill="#ffffff" />
        <rect x="29" y="23" width="4.5" height="10" rx="2" fill={NAVY} />
        <g className="rb-pen">
          <rect x="1" y="22" width="12" height="4.5" rx="2" fill={NAVY} />
          <rect x="-4" y="22.5" width="6" height="2" rx="1" fill="#0878d1" />
        </g>
        <Head />
      </g>
    </svg>
  );
}

/** Hovering drone-bot with spinning rotors. */
function Drone() {
  return (
    <svg viewBox="0 0 44 36" className="h-full w-full overflow-visible">
      <ellipse cx="22" cy="35" rx="8" ry="1.3" fill={NAVY} opacity="0.12" />
      <g className="rb-hover">
        <line x1="8" y1="6" x2="36" y2="6" stroke={NAVY} strokeWidth="1.4" />
        <rect x="2" y="3.5" width="12" height="2" rx="1" fill="#4fb0ff" className="rb-rotor" />
        <rect x="30" y="3.5" width="12" height="2" rx="1" fill="#4fb0ff" className="rb-rotor" />
        <line x1="22" y1="6" x2="22" y2="10" stroke={NAVY} strokeWidth="1.4" />
        <rect x="10" y="10" width="24" height="15" rx="7.5" fill="#ffffff" stroke={NAVY} strokeWidth="1.4" />
        <rect x="14" y="13.5" width="16" height="7" rx="3.5" fill={NAVY} />
        <g className="rb-eyes">
          <circle cx="19" cy="17" r="1.4" fill="#f0c14b" />
          <circle cx="25" cy="17" r="1.4" fill="#f0c14b" />
        </g>
        <line x1="22" y1="25" x2="22" y2="29" stroke={NAVY} strokeWidth="1.2" strokeDasharray="1 1" />
        <circle cx="22" cy="30.5" r="1.6" fill="#d99a19" className="rb-blink-light" />
      </g>
    </svg>
  );
}

function Bubble({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-semibold text-white shadow-md lg:text-[10px]" style={{ background: tone }}>
      {children}
      <span className="rb-dots ml-0.5" />
    </span>
  );
}

/** Positions are % of the map box (x from left, y = where the feet touch). */
export default function MapRobots() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[15] hidden sm:block">
      {/* Walker across North America */}
      <div className="absolute" style={{ left: "12%", top: "31%", width: "14%" }}>
        <div className="rb-walk-x absolute bottom-0 aspect-[4/5] w-[36%]" style={{ animationDuration: "14s", ["--end" as string]: "64%" }}>
          <div className="rb-face h-full w-full" style={{ animationDuration: "14s" }}>
            <Walker />
          </div>
        </div>
      </div>

      {/* Parcel carrier across Australia */}
      <div className="absolute" style={{ left: "76%", top: "83%", width: "11%" }}>
        <div className="rb-walk-x absolute bottom-0 aspect-[4/5] w-[44%]" style={{ animationDuration: "11s", animationDelay: "-4s", ["--end" as string]: "56%" }}>
          <div className="rb-face h-full w-full" style={{ animationDuration: "11s", animationDelay: "-4s" }}>
            <Walker body="#9a5b08" parcel />
          </div>
        </div>
      </div>

      {/* Walker across Siberia */}
      <div className="absolute" style={{ left: "62%", top: "19%", width: "18%" }}>
        <div className="rb-walk-x absolute bottom-0 aspect-[4/5] w-[28%]" style={{ animationDuration: "17s", animationDelay: "-9s", ["--end" as string]: "72%" }}>
          <div className="rb-face h-full w-full" style={{ animationDuration: "17s", animationDelay: "-9s" }}>
            <Walker body="#d99a19" />
          </div>
        </div>
      </div>

      {/* Coder on a laptop — Central Asia */}
      <div className="absolute aspect-[64/50] w-[9%] -translate-x-1/2 -translate-y-full" style={{ left: "78%", top: "36%" }}>
        <Bubble tone="#064a87">coding</Bubble>
        <Coder />
      </div>

      {/* Designer at a screen — South America */}
      <div className="absolute aspect-[70/52] w-[10%] -translate-x-1/2 -translate-y-full" style={{ left: "32%", top: "76%" }}>
        <Bubble tone="#d99a19">designing</Bubble>
        <Designer />
      </div>

      {/* Drone over the Pacific */}
      <div className="absolute aspect-[44/36] w-[5.5%] -translate-x-1/2 -translate-y-full" style={{ left: "93%", top: "38%" }}>
        <Drone />
      </div>
    </div>
  );
}
