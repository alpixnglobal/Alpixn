"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BulletItem } from "./BulletItem";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

type OffshoreItem = {
  label: string;
  href: string;
  slug?: string;
};

type OffshoreCategory = {
  key: string;
  label: string;
  menuHeading: string;
  items: OffshoreItem[];
};

function buildColumns(items: OffshoreItem[]) {
  const columns = [[], [], []] as OffshoreItem[][];
  const maxPerColumn = Math.ceil(items.length / 3);

  items.forEach((item, index) => {
    const columnIndex = Math.min(Math.floor(index / maxPerColumn), 2);
    columns[columnIndex].push(item);
  });

  return columns;
}

function OurOfferingsGrid({ items }: { items: OffshoreItem[] }) {
  const columns = buildColumns(items);

  return (
    <div className="grid grid-cols-3 text-white mt-[25px]">
      {columns.map((columnItems, colIndex) => (
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
          {columnItems.map((item) => (
            <NavigationMenuLink asChild key={item.slug ?? item.href}>
              <Link href={item.href} className="group transition-all duration-200 hover:opacity-80 hover:translate-x-1">
                <BulletItem>{item.label}</BulletItem>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      ))}
    </div>
  );
}

export function OffshoreDeveloperDropdownMenu({ categories }: { categories: OffshoreCategory[] }) {
  const resolvedCategories = categories.length > 0 ? categories : [];
  const defaultValue = resolvedCategories[0]?.key;

  if (!defaultValue) {
    return null;
  }

  return (
    <Tabs defaultValue={defaultValue} className="my-[35px] mx-auto w-full max-w-[1122px]">
      <div className="relative">
        <TabsList className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${resolvedCategories.length}, minmax(0, 1fr))` }}>
          {resolvedCategories.map((category) => (
            <TabsTrigger key={category.key} value={category.key} className="offshore-developer-tab-trigger">
              <h4 className="offshore-developer-tab-list-heading">{category.label}</h4>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[25px] border-b w-[1182px] border-white/20" />
      </div>

      {resolvedCategories.map((category) => (
        <TabsContent key={category.key} value={category.key} className="mt-[25px]">
          <div className="w-full">
            <div className="tab-content-heading">{category.menuHeading}</div>
            <OurOfferingsGrid items={category.items} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
