"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getBackendDevelopersData } from "@/lib/offshore developer/backend-developers-data";
import type { OffshoreDeveloperGridItemRecord } from "@/lib/content-types";

// CDN fallbacks keyed by developer name (lowercase, trimmed)
const developerCdnFallback: Record<string, string> = {
  "golang developer": "https://cdn.simpleicons.org/go/00ADD8",
  "java developer": "https://cdn.simpleicons.org/openjdk/FFFFFF",
  "ruby developer": "https://cdn.simpleicons.org/ruby/CC342D",
  "php developer": "https://cdn.simpleicons.org/php/777BB4",
  "express.js developer": "https://cdn.simpleicons.org/express/FFFFFF",
  "express js developer": "https://cdn.simpleicons.org/express/FFFFFF",
  "node.js developer": "https://cdn.simpleicons.org/nodedotjs/339933",
  "python developer": "https://cdn.simpleicons.org/python/3776AB",
  "django developer": "https://cdn.simpleicons.org/django/092E20",
  "spring boot developer": "https://cdn.simpleicons.org/springboot/6DB33F",
  ".net developer": "https://cdn.simpleicons.org/dotnet/512BD4",
};

interface BackendDeveloperSectionProps {
  slug?: string;
  data?: {
    title: string;
    developers: OffshoreDeveloperGridItemRecord[];
  };
}

function DeveloperItem({ developer }: { developer: OffshoreDeveloperGridItemRecord }) {
  const [src, setSrc] = useState(developer.imageData);

  const handleError = () => {
    const key = developer.name.trim().toLowerCase();
    const cdn = developerCdnFallback[key];
    if (cdn && src !== cdn) {
      setSrc(cdn);
    }
  };

  return (
    <Image
      src={src}
      alt={developer.alt}
      width={developer.width}
      height={developer.height}
      className="w-8 h-8 lg:w-10 lg:h-10"
      unoptimized={src.startsWith("data:") || src.startsWith("http")}
      onError={handleError}
    />
  );
}

const BackendDeveloperSection = ({ slug = "default", data }: BackendDeveloperSectionProps) => {
  const fallbackData = getBackendDevelopersData(slug);
  const resolvedData = data ?? {
    title: fallbackData.title,
    developers: fallbackData.developers.map((developer) => ({
      name: developer.name,
      imageData: developer.image,
      alt: developer.alt,
      width: developer.width,
      height: developer.height,
      link: developer.link || "#",
    })),
  };
  const { title, developers } = resolvedData;

  // Function to get border classes based on index
  const getBorderClasses = (index: number, totalItems: number) => {
    const isLastInRow = (index + 1) % 5 === 0;
    const isFirstInRow = index % 5 === 0;
    const rowIndex = Math.floor(index / 5);
    const isLastRow = rowIndex === Math.floor((totalItems - 1) / 5);

    let borderClasses = "";

    // Horizontal borders
    if (rowIndex === 0) {
      // First row - no top border
    } else {
      borderClasses += " border-t ";
    }

    // Vertical borders
    if (!isLastInRow && index !== totalItems - 1) {
      borderClasses += " border-r ";
    }

    // Special cases for responsive borders
    if (isFirstInRow) {
      borderClasses += " sm:border-r ";
    }

    if (isLastInRow) {
      borderClasses += " sm:border-r-0 md:border-r ";
      if (rowIndex === 0) {
        borderClasses += " border-r ";
      }
    }

    // Last row special cases
    if (isLastRow && isLastInRow) {
      borderClasses += " border-r-0 ";
    }

    return borderClasses + " border-fg/10 ";
  };

  return (
    <section className="sectionDefault">
      {/* Background Color */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, var(--canvas) 15%, var(--glow) 100%)",
        }}
      />

      {/* Container */}
      <div className="container max-w-303.75">
        {/* Heading */}
        <h2 className="title heading-gradient max-w-[826px] mx-auto text-start sm:text-center">{title}</h2>

        {/* Grid */}
        <div className="mt-8 md:mt-10 lg:mt-12.5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
          {developers.map((developer, index) => {
            const borderClasses = getBorderClasses(index, developers.length);
            const isFirstItem = index === 0;

            return (
              <Link
                key={`${developer.name}-${index}`}
                href={developer.link || "#"}
                className={`
                  flex flex-col items-center gap-[5px] p-3 lg:p-[15px] h-[100px] lg:h-[112px]
                  hover:border-r-2 hover:border-b-2 hover:border-white/15
                  bg-[linear-gradient(180deg,rgba(24,24,24,0.24)_0%,color-mix(in_srgb,var(--tech)_6%,transparent)_100%)]
                  hover:bg-[linear-gradient(249.67deg,color-mix(in_srgb,var(--tech)_35%,transparent)_0%,rgba(24,24,24,0)_49.04%,color-mix(in_srgb,var(--tech)_35%,transparent)_100%)]
                  hover:shadow-[0_0_20px_0_color-mix(in_srgb,var(--tech)_40%,transparent)]
                  ${borderClasses}
                  ${isFirstItem ? "hover:border-r-2 hover:border-b-2 hover:border-white/15" : ""}
                `}
              >
                <DeveloperItem developer={developer} />
                <p className="text-sm lg:text-base font-normal text-fg/80 text-center">{developer.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BackendDeveloperSection;
