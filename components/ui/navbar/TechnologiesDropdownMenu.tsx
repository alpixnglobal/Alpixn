"use client";

import MegaMenu from "./MegaMenu";

type TechnologyItem = { label: string; slug: string };
type TechnologyColumn = TechnologyItem[];

// Define technology categories
const Backend_Developer: TechnologyColumn[] = [
  [
    { label: ".Net", slug: "dot-net" },
    { label: "SQL", slug: "sql" },
    { label: "Python", slug: "python" },
  ],
  [
    { label: "Java", slug: "java" },
    { label: "Node.Js", slug: "node-js" },
  ],
  [
    { label: "PHP", slug: "php" },
    { label: "Golang", slug: "golang" },
  ],
];

const Frontend_Developer: TechnologyColumn[] = [
  [
    { label: "ReactJS", slug: "reactjs" },
    { label: "JavaScript", slug: "javascript" },
  ],
  [
    { label: "Angular", slug: "angular" },
    { label: "TypeScript", slug: "typescript" },
  ],
  [
    { label: "Vue Js", slug: "vue-js" },
    { label: "NextJS", slug: "nextjs" },
  ],
];

const Mobile_App_Developer: TechnologyColumn[] = [
  [{ label: "Django", slug: "django" }],
  [{ label: "Express", slug: "express" }],
  [{ label: "Spring Boot", slug: "spring-boot" }],
];

const AI_Engineers: TechnologyColumn[] = [
  [{ label: "Flutter", slug: "flutter" }],
  [{ label: "Java", slug: "java-mobile" }],
  [{ label: "React Native", slug: "react-native" }],
];

const DevOps_Engineers: TechnologyColumn[] = [
  [{ label: "AWS", slug: "aws" }],
  [{ label: "Azure", slug: "azure" }],
  [{ label: "Google Cloud", slug: "google-cloud" }],
];

const Platforms: TechnologyColumn[] = [
  [{ label: "Salesforce", slug: "salesforce" }],
  [{ label: "MS Power Apps", slug: "ms-power-apps" }],
  [{ label: "Metaverse", slug: "metaverse" }],
];

const GROUPS: { key: string; label: string; description: string; category: string; columns: TechnologyColumn[] }[] = [
  { key: "backend", label: "Backend", description: "APIs, services and data", category: "backend", columns: Backend_Developer },
  { key: "frontend", label: "Frontend", description: "Web interfaces", category: "frontend", columns: Frontend_Developer },
  { key: "framework", label: "Frameworks", description: "Server frameworks", category: "framework", columns: Mobile_App_Developer },
  { key: "mobile", label: "Mobile", description: "iOS and Android apps", category: "mobile", columns: AI_Engineers },
  { key: "devops", label: "Cloud & DevOps", description: "Infrastructure and delivery", category: "devops", columns: DevOps_Engineers },
  { key: "platforms", label: "Platforms", description: "Low-code and enterprise", category: "more", columns: Platforms },
];

export function TechnologiesDropdownMenu() {
  return (
    <MegaMenu
      columns={3}
      categories={GROUPS.map((g) => ({
        key: g.key,
        label: g.label,
        description: g.description,
        heading: `${g.label} technologies`,
        items: g.columns.flat().map((t) => ({ label: t.label, href: `/technologies/${g.category}/${t.slug}` })),
      }))}
      promo={{ eyebrow: "Right tool for the job", title: "We pick proven technology and explain why", text: "Stacks chosen for performance, security and easy maintenance.", href: "/technologies", cta: "Explore technologies" }}
    />
  );
}
