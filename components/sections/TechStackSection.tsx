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
      className="group flex flex-col items-center gap-3 animate-in fade-in-0 zoom-in-95 duration-500 fill-mode-both"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <span className="relative grid h-[76px] w-[76px] place-items-center rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#0d2a50,#071a33_70%)] ring-1 ring-[rgba(246,215,122,0.28)] shadow-[0_10px_30px_-12px_rgba(4,13,28,0.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-[rgba(246,215,122,0.7)] group-hover:shadow-[0_16px_40px_-12px_rgba(46,168,255,0.55)] sm:h-[84px] sm:w-[84px]">
        <span aria-hidden className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_120%,rgba(46,168,255,0.35),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src={src}
          alt=""
          width={44}
          height={44}
          className="relative h-10 w-10 object-contain sm:h-11 sm:w-11"
          unoptimized={src.startsWith("data:") || src.startsWith("http")}
          onError={handleError}
        />
      </span>
      <span className="text-center text-[13px] font-medium leading-tight text-fg-muted transition-colors group-hover:text-fg sm:text-sm">{item.label}</span>
    </li>
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
    <section aria-labelledby="techstack-title" className="relative w-full overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      {/* Animated circuit connections */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1440 800">
        <defs>
          <linearGradient id="ts-line" x1="0" x2="1">
            <stop offset="0" stopColor="#2EA8FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#2EA8FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#D99A19" stopOpacity="0" />
          </linearGradient>
        </defs>
        {["M0 160 H360 L420 220 H760", "M1440 260 H1080 L1020 320 H700", "M0 620 H300 L360 560 H640", "M1440 660 H1120 L1060 600 H820"].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#ts-line)" strokeWidth="1" />
            <path d={d} fill="none" stroke="#F6D77A" strokeWidth="1.5" strokeDasharray="6 220" className="[animation:ts-flow_6s_linear_infinite]" style={{ animationDelay: `${i * -1.4}s` }} />
          </g>
        ))}
      </svg>
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
            <TabsPrimitive.Content key={tab.value} value={tab.value} className="mt-14 focus-visible:outline-none">
              <ul className="mx-auto grid max-w-[1000px] grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {tab.items.map((item, itemIndex) => (
                  <TechItem key={`${tab.value}-${item.label}-${itemIndex}`} item={item} index={itemIndex} />
                ))}
              </ul>
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>
      </div>
    </section>
  );
};

export default TechStackSection;
