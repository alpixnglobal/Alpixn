"use client";

import Image from "next/image";
import Link from "next/link";
import { Heading, Section, tone } from "@/components/ui/v4";
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

  return (
    <Section id="developer-grid" alt>
      <Heading id="developer-grid" kicker="Related roles" title={title} center />
      <ul className="mt-12 flex flex-wrap justify-center gap-4">
        {developers.map((developer, i) => (
          <li key={`${developer.name}-${i}`} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.7rem)] lg:w-[calc(20%-0.8rem)]">
            <Link href={developer.link || "/contact-us"} className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-5 text-center shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
              <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${tone(i).c}1f` }}>
                {developer.imageData ? (
                  <Image src={developer.imageData} alt={developer.alt || developer.name} width={34} height={34} unoptimized={developer.imageData.startsWith("data:") || developer.imageData.startsWith("http")} className="h-8 w-8 object-contain" />
                ) : (
                  <span className="font-display text-[15px] font-bold" style={{ color: tone(i).c === "#f6d77a" ? "#d99a19" : tone(i).c }}>
                    {developer.name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                  </span>
                )}
              </span>
              <span className="font-display text-[14px] font-semibold text-fg">{developer.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default BackendDeveloperSection;
