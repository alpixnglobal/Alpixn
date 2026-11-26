"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menuNav";
import Link from "next/link";
import { OffshoreDeveloperDropdownMenu } from "./OffshoreDeveloperDropdownMenu";
import { OurExpertiseDropdownMenu } from "./OurExpertiseDropdownMenu";
import ProducstsDropdownMenu from "./ProducstsDropdownMenu";
import ResourcesDropdownMenu from "./ResourcesDropdownMenu";
import { TechnologiesDropdownMenu } from "./TechnologiesDropdownMenu";

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

type OffshoreCategory = {
  key: string;
  label: string;
  menuHeading: string;
  items: ProductNavItem[];
};

type ExpertiseCategory = {
  key: string;
  label: string;
  description: string;
  menuHeading: string;
  items: ProductNavItem[];
};

type ResourcesMenuCopy = {
  title: string;
  description: string;
  descriptionSecondary: string;
  buttonLabel: string;
  buttonHref: string;
  imageData: string;
};

const defaultProductMenu: ProductMenuCopy = {
  title: "Innovative Products Lineup",
  description:
    "Discover a diverse suite of advanced products crafted to revolutionize how businesses operate.",
  descriptionSecondary:
    "From automating complex workflows to enhancing efficiency and scalability, our products are designed to empower organizations.",
  buttonLabel: "Let's Talk",
  buttonHref: "/products",
  imageData: "/images/contact.svg",
};

const defaultResourcesMenu: ResourcesMenuCopy = {
  title: "Resources Library",
  description:
    "Access in-depth guides, blogs, ebooks, real world case studies created by our subject matter experts, designed to empower you and your team with the right resources and stay ahead.",
  descriptionSecondary:
    "Browse the latest learning material, portfolio examples, hiring information, and team updates in one place.",
  buttonLabel: "Read More",
  buttonHref: "/resources",
  imageData: "/images/resource-img.svg",
};

export default function Navbar({
  products = [],
  productMenu = defaultProductMenu,
  resourcesMenu = defaultResourcesMenu,
  expertiseCategories = [],
  offshoreCategories = [],
}: {
  products?: ProductNavItem[];
  productMenu?: ProductMenuCopy;
  resourcesMenu?: ResourcesMenuCopy;
  expertiseCategories?: ExpertiseCategory[];
  offshoreCategories?: OffshoreCategory[];
}) {

  return (
    <NavigationMenu className="" viewport={false}>
      <NavigationMenuList className="xl:gap-[10px]">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="text-black text-base font-medium leading-snug hover:text-blue-600 transition-colors px-3 py-2">
            <Link href="/">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className="text-black text-base font-medium leading-snug hover:text-blue-600 transition-colors px-3 py-2">
            <Link href="/about">
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black text-base font-medium leading-snug hover:text-blue-600 data-[state=open]:text-blue-600 bg-transparent hover:bg-transparent px-3 py-2">
            <span className="flex items-center gap-2">Our Expertise</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="dropdown-content-menu-panel">
            <OurExpertiseDropdownMenu categories={expertiseCategories} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black text-base font-medium leading-snug hover:text-blue-600 data-[state=open]:text-blue-600 bg-transparent hover:bg-transparent px-3 py-2">
            <span className="flex items-center gap-2">Offshore Developer</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="dropdown-content-menu-panel flex items-center">
            <OffshoreDeveloperDropdownMenu categories={offshoreCategories} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black text-base font-medium leading-snug hover:text-blue-600 data-[state=open]:text-blue-600 bg-transparent hover:bg-transparent px-3 py-2">
            <span className="flex items-center gap-2">Products</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="dropdown-content-menu-panel flex items-center">
            <ProducstsDropdownMenu items={products} menu={productMenu} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black text-base font-medium leading-snug hover:text-blue-600 data-[state=open]:text-blue-600 bg-transparent hover:bg-transparent px-3 py-2">
            <span className="flex items-center gap-2">Technologies</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="dropdown-content-menu-panel flex items-center">
            <TechnologiesDropdownMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black text-base font-medium leading-snug hover:text-blue-600 data-[state=open]:text-blue-600 bg-transparent hover:bg-transparent px-3 py-2">
            <span className="flex items-center gap-2">Resources</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="dropdown-content-menu-panel flex items-center">
            <ResourcesDropdownMenu menu={resourcesMenu} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
