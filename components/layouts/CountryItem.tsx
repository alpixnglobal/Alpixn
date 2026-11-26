"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const CountryItem = ({ flag, name, alt = "Flag" }: { flag: string; name: string; alt: string }) => {
  const fallbackByName = useMemo(() => {
    const map: Record<string, string> = {
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

    return map[name] ?? "/images/india.svg";
  }, [name]);

  const [src, setSrc] = useState(flag || fallbackByName);
  const shouldUnoptimize = src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://");

  return (
    <div className="flex w-full items-center gap-[5px] text-xs sm:text-base">
      <Image
        src={src}
        alt={alt}
        width={30}
        height={30}
        className="w-[24px] h-[24px] lg:w-[30px] lg:h-[30px]"
        unoptimized={shouldUnoptimize}
        onError={() => {
          if (src !== fallbackByName) {
            setSrc(fallbackByName);
          }
        }}
      />
      <div className="whitespace-nowrap">{name}</div>
    </div>
  );
};

export default CountryItem;
