"use client";

import Image from "next/image";
import Link from "next/link";
import { BulletItem } from "./BulletItem";
import { Button } from "../buttonBtn";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

const defaultResourceItems = [
  { label: "Internship Alumni", href: "/resources/interns-alumni" },
  { label: "Our Team", href: "/resources/our-team" },
  { label: "Portfolio", href: "/resources/portfolio" },
  { label: "Career", href: "/resources/careers" },
  { label: "Blog & Articles", href: "/resources/blogs" },
];

type ProductListProps = {
  listItems: typeof defaultResourceItems;
};

function ProductList({ listItems }: ProductListProps) {
  return (
    <div className="text-fg flex flex-col gap-[26px] h-full border-l border-[#FFFFFF33] ml-20 font-normal size-4 w-full">
      {listItems.map((item, index) => (
        <NavigationMenuLink asChild key={item.href}>
          <Link key={index} href={item.href} className="hover:opacity-80 transition-opacity">
            <BulletItem className="pl-14">{item.label}</BulletItem>
          </Link>
        </NavigationMenuLink>
      ))}
    </div>
  );
}

const ResourcesDropdownMenu = ({
  menu = {
    title: "Resources Library",
    description: "Access in-depth guides, blogs, ebooks, real world case studies created by our subject matter experts, designed to empower you and your team with the right resources and stay ahead.",
    descriptionSecondary: "Browse the latest learning material, portfolio examples, hiring information, and team updates in one place.",
    buttonLabel: "Read More",
    buttonHref: "/resources",
    imageData: "/images/resource-img.svg",
  },
  items = defaultResourceItems,
}: {
  menu?: {
    title: string;
    description: string;
    descriptionSecondary: string;
    buttonLabel: string;
    buttonHref: string;
    imageData: string;
  };
  items?: typeof defaultResourceItems;
}) => {
  const menuImage = menu.imageData || "/images/resource-img.svg";

  return (
    <div className="grid grid-cols-[38%_1fr_1fr] items-center h-full px-6.25 py-8.75">
      <div className="flex flex-col h-full ml-6.25 w-full max-w-131.25">
        <h6 className="text-fg font-semibold">{menu.title}</h6>
        <p className="text-fg opacity-80 mt-5">{menu.description}</p>
        <p className="text-fg opacity-80 mt-4">{menu.descriptionSecondary}</p>
        <Link href={menu.buttonHref}>
          <Button className="lg:max-w-35.75 mt-5">
            {menu.buttonLabel}
            <Image src="/icons/arrow-right.svg" alt="Arrow Right" width={14} height={14} className="ml-2.5" />
          </Button>
        </Link>
      </div>
      <ProductList listItems={items} />
      <div className="text-fg flex">
        <Image src={menuImage} alt="Resource Image" width={429} height={347} unoptimized={menuImage.startsWith("data:") || menuImage.startsWith("http")} />
      </div>
    </div>
  );
};

export default ResourcesDropdownMenu;
