"use client";

import Image from "next/image";
import { useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

import type { ExpertiseTechStackItemRecord, ExpertiseTechStackTabRecord } from "@/lib/content-types";

const defaultTabs: ExpertiseTechStackTabRecord[] = [
  {
    name: "Languages",
    value: "languages",
    items: [
      { label: ".Net", imageData: "/images/dotnet.png" },
      { label: "C#", imageData: "/images/dotnet.png" },
      { label: "Golang", imageData: "/images/logoipsum.png" },
      { label: "Java", imageData: "/images/logoipsum.png" },
      { label: "JavaScript", imageData: "/images/typescript.svg" },
      { label: "PHP", imageData: "/images/logoipsum.png" },
      { label: "Python", imageData: "/images/python.png" },
      { label: "RoR", imageData: "/images/logoipsum.png" },
      { label: "Swift", imageData: "/images/logoipsum.png" },
      { label: "Angular", imageData: "/images/logoipsum.png" },
      { label: "AWS", imageData: "/images/aws.svg" },
      { label: "Django", imageData: "/images/python.png" },
      { label: "Docker", imageData: "/images/docker.svg" },
      { label: "Flutter", imageData: "/images/logoipsum.png" },
      { label: "Laravel", imageData: "/images/logoipsum.png" },
      { label: "Node.js", imageData: "/images/node.png" },
      { label: "React", imageData: "/images/logoipsum.png" },
      { label: "Vue.js", imageData: "/images/logoipsum.png" },
    ],
  },
  {
    name: "Databases",
    value: "databases",
    items: [
      { label: "Amazone RDS", imageData: "/images/logoipsum.png" },
      { label: "Azure SQL", imageData: "/images/azure-sql.svg" },
      { label: "Cassandra", imageData: "/images/cassandra.svg" },
      { label: "Dynamo", imageData: "/images/logoipsum.png" },
      { label: "Elasticsearch", imageData: "/images/logoipsum.png" },
      { label: "MongoDB", imageData: "/images/mongodb.svg" },
      { label: "Mysql", imageData: "/images/mysql.svg" },
      { label: "Oracle", imageData: "/images/oracle.svg" },
      { label: "PostgresSQL", imageData: "/images/postgres.svg" },
      { label: "SQL Server", imageData: "/images/sqlserver.svg" },
    ],
  },
  {
    name: "Framework",
    value: "framework",
    items: [
      { label: "AWS", imageData: "/images/aws.svg" },
      { label: "Google Cloud", imageData: "/images/google-cloud.svg" },
      { label: "Cassandra", imageData: "/images/cassandra2.svg" },
      { label: "Power BI", imageData: "/images/bi.svg" },
      { label: "Skype", imageData: "/images/skype.svg" },
      { label: "MongoDB", imageData: "/images/mongo.svg" },
      { label: "Kafka", imageData: "/images/kafka.svg" },
      { label: "Jenkins", imageData: "/images/jenkins.svg" },
      { label: "Azure", imageData: "/images/azure.svg" },
      { label: "Docker", imageData: "/images/docker.svg" },
    ],
  },
];

const defaultTitle = "Our Tech Stack";
const defaultDescription =
  "We employ a modern, scalable technology stack—encompassing programming languages, frameworks, databases, cloud services, and DevOps—to deliver safe, high-performance software solutions tailored to your business requirements, ensuring flexibility, speed, and enduring value.";

const fallbackLogoByLabel: Record<string, string> = {
  golang: "https://cdn.simpleicons.org/go/00ADD8",
  java: "https://cdn.simpleicons.org/openjdk/FFFFFF",
  php: "https://cdn.simpleicons.org/php/777BB4",
  ror: "https://cdn.simpleicons.org/rubyonrails/CC0000",
  swift: "https://cdn.simpleicons.org/swift/F05138",
  angular: "https://cdn.simpleicons.org/angular/DD0031",
  flutter: "https://cdn.simpleicons.org/flutter/02569B",
  laravel: "https://cdn.simpleicons.org/laravel/FF2D20",
  react: "https://cdn.simpleicons.org/react/61DAFB",
  "vue.js": "https://cdn.simpleicons.org/vuedotjs/4FC08D",
  "amazone rds": "https://cdn.simpleicons.org/amazonaws/FF9900",
  dynamo: "https://cdn.simpleicons.org/amazondynamodb/4053D6",
  elasticsearch: "https://cdn.simpleicons.org/elasticsearch/005571",
  kafka: "https://cdn.simpleicons.org/apachekafka/FFFFFF",
};

// List of local image paths that are known placeholders or have display issues
const SKIP_IMAGE_PATHS = ["logoipsum", "/images/dynamo.svg", "/images/kafka.svg"];

function resolveTechLogo(item: ExpertiseTechStackItemRecord) {
  if (item.imageData && !SKIP_IMAGE_PATHS.some((p) => item.imageData.includes(p))) {
    return item.imageData;
  }
  const key = item.label.trim().toLowerCase();
  return fallbackLogoByLabel[key] ?? "/images/logoipsum.png";
}

function TechItem({ item, index }: { item: ExpertiseTechStackItemRecord; index: number }) {
  const [src, setSrc] = useState(() => resolveTechLogo(item));

  const handleError = () => {
    const key = item.label.trim().toLowerCase();
    const cdnUrl = fallbackLogoByLabel[key];
    if (cdnUrl && src !== cdnUrl) {
      setSrc(cdnUrl);
    } else if (src !== "/images/logoipsum.png") {
      setSrc("/images/logoipsum.png");
    }
  };

  return (
    <li
      className="group relative z-10 flex flex-col items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-500 fill-mode-both"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_20%,#0d2a50,#071a33_70%)] ring-1 ring-[rgba(246,215,122,0.28)] shadow-[0_10px_30px_-12px_rgba(4,13,28,0.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-[rgba(246,215,122,0.7)] group-hover:shadow-[0_16px_40px_-12px_rgba(46,168,255,0.55)] sm:h-14 sm:w-14">
        <span aria-hidden className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_120%,rgba(46,168,255,0.35),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src={src}
          alt=""
          width={28}
          height={28}
          className="relative h-6 w-6 object-contain sm:h-7 sm:w-7"
          unoptimized={src.startsWith("data:") || src.startsWith("http")}
          onError={handleError}
        />
      </span>
      <span className="max-w-full truncate text-center text-[11.5px] font-medium leading-tight text-fg-muted transition-colors group-hover:text-fg sm:text-[12.5px]">{item.label}</span>
    </li>
  );
}

/** Icons laid out in rows joined by circuit lines (a snake path); light pulses travel along each line. */
function ConnectedGrid({ items, tabValue }: { items: ExpertiseTechStackTabRecord["items"]; tabValue: string }) {
  const PER_ROW = 6;
  const rows: (typeof items)[] = [];
  for (let i = 0; i < items.length; i += PER_ROW) rows.push(items.slice(i, i + PER_ROW));
  return (
    <div className="mx-auto max-w-[860px]">
      {rows.map((row, r) => {
        const last = r === rows.length - 1;
        const span = (row.length / PER_ROW) * 100;
        const inset = 100 / PER_ROW / 2; // centre of first / last cell
        const reverse = r % 2 === 1;
        return (
          <div key={r} className="relative">
            {/* horizontal rail through the icon centres */}
            <span aria-hidden className="absolute top-6 h-px bg-[linear-gradient(90deg,rgba(46,168,255,0.15),rgba(246,215,122,0.45),rgba(46,168,255,0.15))] sm:top-7" style={{ left: `${inset}%`, width: `${span - inset * 2}%` }}>
              <span className="ts-pulse absolute -top-[2px] h-[5px] w-10 rounded-full bg-[linear-gradient(90deg,transparent,#f6d77a,transparent)] shadow-[0_0_10px_#f6d77a]" style={{ animationDelay: `${r * -0.9}s`, animationDirection: reverse ? "reverse" : "normal" }} />
            </span>
            {/* vertical connector to the next row (alternating ends) */}
            {!last ? (
              <span aria-hidden className="absolute top-6 h-full w-px bg-[linear-gradient(180deg,rgba(246,215,122,0.45),rgba(46,168,255,0.2))] sm:top-7" style={{ left: reverse ? `${inset}%` : `${Math.min(span, 100) - inset}%` }}>
                <span className="ts-pulse-v absolute -left-[2px] h-8 w-[5px] rounded-full bg-[linear-gradient(180deg,transparent,#2ea8ff,transparent)] shadow-[0_0_10px_#2ea8ff]" style={{ animationDelay: `${r * -0.7}s` }} />
              </span>
            ) : null}
            <ul className="grid grid-cols-6 gap-x-2 pb-7 sm:pb-9">
              {row.map((item, i) => (
                <TechItem key={`${tabValue}-${item.label}-${r}-${i}`} item={item} index={r * PER_ROW + i} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

const TechStackSection = ({
  title = defaultTitle,
  description = defaultDescription,
  tabs = defaultTabs,
}: {
  title?: string;
  description?: string;
  tabs?: ExpertiseTechStackTabRecord[];
}) => {
  const resolvedTabs = tabs.length > 0 ? tabs : defaultTabs;

  return (
    <section aria-labelledby="techstack-title" className="relative w-full overflow-hidden bg-canvas py-14 sm:py-16 lg:py-20">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tech/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1190px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading id="techstack-title" eyebrow="Technology" title={title} subtitle={description} />
        </Reveal>

        <TabsPrimitive.Root defaultValue={resolvedTabs[0]?.value} className="mt-12">
          <TabsPrimitive.List aria-label="Technology categories" className="glass mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
            {resolvedTabs.map((tab) => (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-fg-muted transition-all hover:text-fg data-[state=active]:bg-[linear-gradient(135deg,#fbe7a1_0%,#e3a52a_45%,#b8740c_100%)] data-[state=active]:text-[#071a33] data-[state=active]:shadow-[var(--shadow-glow)] sm:px-7"
              >
                {tab.name}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {resolvedTabs.map((tab) => (
            <TabsPrimitive.Content key={tab.value} value={tab.value} className="mt-10 focus-visible:outline-none">
              <ConnectedGrid items={tab.items} tabValue={tab.value} />
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>
      </div>
    </section>
  );
};

export default TechStackSection;
