"use client";

import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const rowLayouts: Record<string, { counts: number[]; wrapperClasses: string[]; gridClasses: string[]; iconSizes: number[] }> = {
  languages: {
    counts: [8, 6, 4],
    wrapperClasses: ["", "w-full max-w-[684px] mx-auto mt-[50px]", "w-full max-w-[435px] mx-auto mt-[50px]"],
    gridClasses: [
      "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-[49px]",
      "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[49px]",
      "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[49px]",
    ],
    iconSizes: [70, 71, 75],
  },
  databases: {
    counts: [6, 4],
    wrapperClasses: ["", ""],
    gridClasses: [
      "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[49px]",
      "grid grid-cols-3 md:grid-cols-4 mt-[50px]",
    ],
    iconSizes: [64, 64],
  },
  framework: {
    counts: [6, 4],
    wrapperClasses: ["", ""],
    gridClasses: [
      "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[49px]",
      "grid grid-cols-3 md:grid-cols-4 mt-[50px]",
    ],
    iconSizes: [64, 64],
  },
};

function splitIntoRows<T>(items: T[], counts: number[]) {
  const rows: T[][] = [];
  let cursor = 0;
  for (const count of counts) {
    if (cursor >= items.length) break;
    rows.push(items.slice(cursor, cursor + count));
    cursor += count;
  }
  if (cursor < items.length) {
    rows.push(items.slice(cursor));
  }
  return rows;
}

function TechItem({ item, size }: { item: ExpertiseTechStackItemRecord; size: number }) {
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
    <div className="flex flex-col items-center justify-center gap-[5px]">
      <Image
        src={src}
        alt={item.label}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: `${size}px`, height: `${size}px` }}
        unoptimized={src.startsWith("data:") || src.startsWith("http")}
        onError={handleError}
      />
      <span className="text-fg text-sm md:text-base font-normal leading-relaxed text-center">{item.label}</span>
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
    <section className="sectionDefault overflow-x-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle, var(--canvas) 45%, var(--glow) 100%)" }} />

      <div className="container mx-auto max-w-[1190px]">
        <div className="flex flex-col gap-2.5">
          <h2 className="title heading-gradient text-left sm:text-center">{title}</h2>
          <p className="subtitleMeXl80 leading-relaxed text-left sm:text-center">{description}</p>
        </div>

        <div className="w-full mt-12.5">
          <Tabs defaultValue={resolvedTabs[0]?.value}>
            <TabsList className="max-w-[576px] mx-auto">
              {resolvedTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="font-semibold text-base md:text-xl">
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="w-full border-b max-w-[576px] mx-auto mt-2.5 border-[#D8D8D8]" />

            {resolvedTabs.map((tab) => {
              const layout = rowLayouts[tab.value] ?? {
                counts: [tab.items.length],
                wrapperClasses: [""],
                gridClasses: ["grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[49px]"],
                iconSizes: [64],
              };
              const rows = splitIntoRows(tab.items, layout.counts);

              return (
                <TabsContent key={tab.value} value={tab.value} className="justify-center mt-[86px]">
                  <div className="flex flex-col gap-0">
                    {rows.map((row, rowIndex) => (
                      <div key={`${tab.value}-row-${rowIndex}`} className={layout.wrapperClasses[rowIndex] ?? "mt-[50px]"}>
                        <div className={layout.gridClasses[rowIndex] ?? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[49px]"}>
                          {row.map((item, itemIndex) => (
                            <TechItem key={`${tab.value}-${item.label}-${itemIndex}`} item={item} size={layout.iconSizes[rowIndex] ?? 64} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

