"use client";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import NavbarItems from "./ui/navbar/NavbarItems";
import Link from "next/link";
import { breakpoints } from "@/lib/breakpoints";
import { Button } from "./ui/button";
import * as Accordion from "@radix-ui/react-accordion";
import { mobileNavigation, withDynamicExpertiseNavigation, withDynamicOffshoreNavigation, withDynamicProductsNavigation } from "@/lib/mobileNavigation";
import { MobileNavItem } from "./ui/navbar/MobileNavItem";

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

type ResourcesMenuCopy = {
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

function hasChildren(item: {
  label: string;
  href?: string;
  children?: typeof mobileNavigation;
}): item is { label: string; children: typeof mobileNavigation; href?: string } {
  return Array.isArray(item.children);
}


const MainMenu = ({
  products,
  productMenu,
  resourcesMenu,
  expertiseCategories,
  offshoreCategories,
  logoUrl,
  logoAlt,
}: {
  products: ProductNavItem[];
  productMenu: ProductMenuCopy;
  resourcesMenu: ResourcesMenuCopy;
  expertiseCategories: ExpertiseCategory[];
  offshoreCategories: OffshoreCategory[];
  logoUrl?: string;
  logoAlt?: string;
}) => {
  const resolvedLogoUrl = logoUrl || "/images/logo.png";
  const resolvedLogoAlt = logoAlt || "Logo";
  const shouldUnoptimizeLogo = resolvedLogoUrl.startsWith("data:") || resolvedLogoUrl.startsWith("http");
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
  const [open, setOpen] = useState(false);
  const productNavigation = products.length > 0 ? withDynamicProductsNavigation(products, mobileNavigation) : mobileNavigation;
  const expertiseNavigation =
    expertiseCategories.length > 0
      ? withDynamicExpertiseNavigation(
          expertiseCategories.map((category) => ({
            label: category.label,
            href: `/our-expertise/${category.key}`,
            children: category.items,
          })),
          productNavigation
        )
      : productNavigation;
  const resolvedMobileNavigation =
    offshoreCategories.length > 0
      ? withDynamicOffshoreNavigation(
          offshoreCategories.map((category) => ({
            label: category.label,
            href: `/offshore-developer/${category.key}`,
            children: category.items,
          })),
          expertiseNavigation
        )
      : expertiseNavigation;

  return isDesktop ? (
    <nav className="max-w-[1440px] px-[45px] mx-0 mx-auto flex items-center h-[84px]">
      {/* Logo - Left side */}
      <div className="flex-shrink-0 relative w-[180px] md:w-[200px] lg:w-[214px] h-[60px] md:h-[70px] lg:h-[82px]">
        <Link href="/" className="block w-full h-full">
          <Image src={resolvedLogoUrl} alt={resolvedLogoAlt} fill className="object-contain" priority unoptimized={shouldUnoptimizeLogo} />
        </Link>
      </div>

      {/* Navigation items - Centered */}
      <NavbarItems
        products={products}
        productMenu={productMenu}
        resourcesMenu={resourcesMenu}
        expertiseCategories={expertiseCategories}
        offshoreCategories={offshoreCategories}
      />

      {/* Contact button - Right side */}
      <div className="flex-shrink-0">
        <Link href="/contact-us">
          <Button className="w-[125px] h-[52px] text-sm md:text-base font-medium leading-snug cursor-pointer">Contact Us</Button>
        </Link>
      </div>
    </nav>
  ) : (
    // Mobile
    <nav className="container flex justify-between items-center h-[70px]">
      {/* Logo - Left side */}
      <div className="relative w-[140px] sm:w-[160px] h-[50px] sm:h-[60px]">
        <Link href="/" className="block w-full h-full">
          <Image src={resolvedLogoUrl} alt={resolvedLogoAlt} fill className="object-contain" priority unoptimized={shouldUnoptimizeLogo} />
        </Link>
      </div>
      {/* MenuIcon - Right side */}
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button type="button" aria-label="Open navigation menu" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MenuIcon size={28} className="text-black" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-full sm:w-[400px] bg-white">
          <DrawerHeader className="border-b bg-white">
            <DrawerTitle className="flex justify-center py-4">
              <Link href="/" onClick={() => setOpen(false)}>
                <div className="relative w-[180px] h-[70px]">
                  <Image src={resolvedLogoUrl} alt={resolvedLogoAlt} fill className="object-contain" unoptimized={shouldUnoptimizeLogo} />
                </div>
              </Link>
            </DrawerTitle>
          </DrawerHeader>
          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6">
              <Accordion.Root type="multiple" className="w-full flex flex-col gap-2">
                {resolvedMobileNavigation.map((item) =>
                  hasChildren(item) ? (
                    <MobileNavItem key={item.label} label={item.label} onNavigate={() => setOpen(false)}>
                      {item.children.map((child) =>
                        hasChildren(child) ? (
                          <MobileNavItem key={child.label} label={child.label} onNavigate={() => setOpen(false)}>
                            {child.children.map((subChild) => (
                              <MobileNavItem
                                key={subChild.label}
                                label={subChild.label}
                                href={subChild.href}
                                onNavigate={() => setOpen(false)}
                              />
                            ))}
                          </MobileNavItem>
                        ) : (
                          <MobileNavItem
                            key={child.label}
                            label={child.label}
                            href={child.href}
                            onNavigate={() => setOpen(false)}
                          />
                        ),
                      )}
                    </MobileNavItem>
                  ) : (
                    <MobileNavItem
                      key={item.label}
                      label={item.label}
                      href={item.href}
                      onNavigate={() => setOpen(false)}
                    />
                  ),
                )}
              </Accordion.Root>
            </nav>
          </div>

          {/* Add contact button in drawer */}
          <div className="p-6 border-t bg-white">
            <Link href="/contact-us" onClick={() => setOpen(false)}>
              <Button className="w-full rounded-[10px] h-[48px] py-3 text-sm md:text-base font-medium leading-snug">Contact Us</Button>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default MainMenu;
