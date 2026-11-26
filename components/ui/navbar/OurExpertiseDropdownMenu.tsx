"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BulletItem } from "./BulletItem";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

type ExpertiseItem = {
  label: string;
  href: string;
  slug?: string;
};

type ExpertiseCategory = {
  key: string;
  label: string;
  description: string;
  menuHeading: string;
  items: ExpertiseItem[];
};

function buildColumns(items: ExpertiseItem[]) {
  const columns = [[], [], []] as ExpertiseItem[][];
  const maxPerColumn = Math.ceil(items.length / 3);

  items.forEach((item, index) => {
    const columnIndex = Math.min(Math.floor(index / maxPerColumn), 2);
    columns[columnIndex].push(item);
  });

  return columns;
}

function OurOfferingsGrid({ items }: { items: ExpertiseItem[] }) {
  const columns = buildColumns(items);
  const columnCount = columns.length;

  return (
    <div className="grid text-white relative" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)`, columnGap: "5rem" }}>
      {columns.map((columnItems, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-5">
          {columnItems.map((item) => (
            <NavigationMenuLink asChild key={item.slug ?? item.href}>
              <Link href={item.href} className="group transition-all duration-200 hover:opacity-80 hover:translate-x-1">
                <BulletItem>{item.label}</BulletItem>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      ))}

      {Array.from({ length: columnCount - 1 }).map((_, index) => (
        <div
          key={index}
          className="absolute top-0 h-full flex justify-center"
          style={{ left: `${(100 / columnCount) * (index + 1)}%`, transform: "translateX(-1.5rem)" }}
        >
          <div className="h-full w-px bg-white/20" />
        </div>
      ))}
    </div>
  );
}

export function OurExpertiseDropdownMenu({ categories }: { categories: ExpertiseCategory[] }) {
  const resolvedCategories = categories.length > 0 ? categories : [];
  const defaultValue = resolvedCategories[0]?.key;

  if (!defaultValue) {
    return null;
  }

  return (
    <Tabs defaultValue={defaultValue} className="py-6 w-full">
      <div className="relative mx-[139px]">
        <TabsList className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${resolvedCategories.length}, minmax(0, 1fr))` }}>
          {resolvedCategories.map((category) => (
            <TabsTrigger key={category.key} value={category.key} className="our-expertise-tab-trigger">
              <h4 className="our-expertise-tab-heading">{category.label}</h4>
              <p className="font-normal text-left text-sm w-full max-w-[295px]">{category.description}</p>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="border-b border-white/20 w-full max-w-[1182px] mx-auto mt-[25px]" />

      {resolvedCategories.map((category) => (
        <TabsContent key={category.key} value={category.key} className="w-full max-w-[1122px] mx-auto">
          <div className="w-full">
            <div className="font-normal text-sm w-full text-[#FFFFFFCC] my-6">{category.menuHeading}</div>
            <OurOfferingsGrid items={category.items} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
