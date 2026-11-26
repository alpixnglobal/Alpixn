"use client";

import Image from "next/image";
import { BulletItem } from "./BulletItem";
import { Button } from "../buttonBtn";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

type ProductNavItem = {
  label: string;
  href: string;
};

type ProductMenuCopy = {
  title: string;
  description: string;
  descriptionSecondary: string;
  buttonLabel: string;
  buttonHref: string;
  imageData: string;
};

function ProductList({ items }: { items: ProductNavItem[] }) {
  return (
    <div className="text-white flex flex-col gap-6 h-full border-l border-[#FFFFFF33] ml-[57.2px] font-normal text-base w-full">
      {items.map((item) => (
        <NavigationMenuLink asChild key={item.label}>
          <Link
            href={item.href}
            className="group transition-all duration-200 hover:opacity-80 hover:translate-x-1"
          >
            <BulletItem className="pl-14 cursor-pointer hover:text-[#389EFF]">{item.label}</BulletItem>
          </Link>
        </NavigationMenuLink>
      ))}
    </div>
  );
}

const ProductsDropdownMenu = ({
  items,
  menu,
}: {
  items: ProductNavItem[];
  menu: ProductMenuCopy;
}) => {
  const menuImage = menu.imageData || "/images/contact.svg";
  const shouldUnoptimizeMenuImage = menuImage.startsWith("data:") || menuImage.startsWith("http");

  return (
    <div className="grid grid-cols-[38%_1fr_1fr] items-center h-full px-[25px] py-[35px]">
      <div className="flex flex-col gap-[20px] h-full ml-[25px] w-full max-w-[525px]">
        <h6 className="text-white font-medium text-lg">{menu.title}</h6>
        <p className="text-white/80 font-normal text-base">{menu.description}</p>
        <p className="text-white opacity-80">{menu.descriptionSecondary}</p>
        <NavigationMenuLink asChild>
          <Link href={menu.buttonHref}>
            <Button className="w-[143px] h-[48px] cursor-pointer">
              {menu.buttonLabel}
              <Image src="/icons/arrow-right.svg" alt="Arrow Right" width={14} height={14} className="ml-2.5" />
            </Button>
          </Link>
        </NavigationMenuLink>
      </div>

      <ProductList items={items} />

      <div className="text-white flex">
        <Image src={menuImage} alt="Contact Image" width={429} height={347} unoptimized={shouldUnoptimizeMenuImage} />
      </div>
    </div>
  );
};

export default ProductsDropdownMenu;
