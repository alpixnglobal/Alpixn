"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BulletItem } from "./BulletItem";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

// Define types for technology items
type TechnologyItem = {
  label: string;
  slug: string;
};

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

type TechnologiesGridProps = {
  columns: TechnologyColumn[];
  category: string;
};

function TechnologiesGrid({ columns, category }: TechnologiesGridProps) {
  return (
    <div className="grid grid-cols-3 text-white mt-[25px]">
      {columns.map((items, colIndex) => (
        <div
          key={colIndex}
          className={[
            "flex flex-col gap-5",
            colIndex === 0 && "border-r border-white/20 mr-20",
            colIndex === 1 && "border-r ml-12 border-white/20 mr-16",
            colIndex === 2 && "ml-12",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {items.map((item) => (
            <NavigationMenuLink asChild key={item.slug}>
              <Link
                href={`/technologies/${category}/${item.slug}`}
                className="group transition-all duration-200 hover:opacity-80 hover:translate-x-1"
              >
                <BulletItem>{item.label}</BulletItem>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TechnologiesDropdownMenu() {
  return (
    <Tabs defaultValue="backend" className="my-[35px] mx-auto w-full max-w-[1122px]">
      <div className="relative">
        <TabsList className="grid grid-cols-6 gap-2">
          <TabsTrigger value="backend" className="offshore-developer-tab-trigger">
            <h4 className="offshore-developer-tab-list-heading">Backend</h4>
          </TabsTrigger>
          <TabsTrigger value="frontend" className="offshore-developer-tab-trigger">
            <h4 className="offshore-developer-tab-list-heading">Frontend</h4>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="offshore-developer-tab-trigger">
            <h4 className="offshore-developer-tab-list-heading">Framework</h4>
          </TabsTrigger>
          <TabsTrigger value="ai" className="offshore-developer-tab-trigger">
            <h4 className="offshore-developer-tab-list-heading">Mobile</h4>
          </TabsTrigger>
          <TabsTrigger value="devops" className="offshore-developer-tab-trigger">
            <h4 className="offshore-developer-tab-list-heading">DevOps</h4>
          </TabsTrigger>
          <TabsTrigger value="plartforms" className="offshore-developer-tab-trigger">
            <h4 className="offshore-developer-tab-list-heading">More</h4>
          </TabsTrigger>
        </TabsList>
        {/* Divider */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[25px] border-b w-[1182px] border-white/20" />
      </div>

      <TabsContent value="backend" className="mt-[25px]">
        <div className="w-full">
          <TechnologiesGrid columns={Backend_Developer} category="backend" />
        </div>
      </TabsContent>

      <TabsContent value="frontend" className="mt-[25px]">
        <div className="w-full">
          <TechnologiesGrid columns={Frontend_Developer} category="frontend" />
        </div>
      </TabsContent>

      <TabsContent value="mobile" className="mt-[25px]">
        <div className="w-full">
          <TechnologiesGrid columns={Mobile_App_Developer} category="framework" />
        </div>
      </TabsContent>

      <TabsContent value="ai" className="mt-[25px]">
        <div className="w-full">
          <TechnologiesGrid columns={AI_Engineers} category="mobile" />
        </div>
      </TabsContent>

      <TabsContent value="devops" className="mt-[25px]">
        <div className="w-full">
          <TechnologiesGrid columns={DevOps_Engineers} category="devops" />
        </div>
      </TabsContent>

      <TabsContent value="plartforms" className="mt-[25px]">
        <div className="w-full">
          <TechnologiesGrid columns={Platforms} category="more" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
