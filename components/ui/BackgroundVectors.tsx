const BackgroundVectors = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Glow Top Right */}
      <svg
        className="absolute top-[-120px] right-[-180px]"
        width="757"
        height="712"
        viewBox="0 0 757 712"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.53" filter="url(#blurGlow1)">
          <circle cx="660" cy="140" r="160" fill="#2EA8FF" />
        </g>
        <defs>
          <filter id="blurGlow1" x="-500" y="-500" width="1600" height="1600">
            <feGaussianBlur stdDeviation="250" />
          </filter>
        </defs>
      </svg>

      {/* Wave Vector */}
      <svg
        className="absolute top-[324px] left-[-760px]"
        width="1498"
        height="548"
        viewBox="0 0 1498 548"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.05" style={{ mixBlendMode: "screen" }}>
          <path
            d="M0 51.4648C820.584 -271.536 887.218 579.363 1498 410.091V315.51C887.218 484.782 820.584 -366.118 0 -43.1168V51.4648Z"
            fill="#BEE5FF"
          />
        </g>
      </svg>

      {/* Glow Bottom Left */}
      <svg
        className="absolute bottom-[-180px] left-[-180px]"
        width="764"
        height="660"
        viewBox="0 0 764 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.53" filter="url(#blurGlow2)">
          <circle cx="104" cy="660" r="160" fill="#2EA8FF" />
        </g>
        <defs>
          <filter id="blurGlow2" x="-500" y="-500" width="1600" height="1600">
            <feGaussianBlur stdDeviation="250" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default BackgroundVectors;
