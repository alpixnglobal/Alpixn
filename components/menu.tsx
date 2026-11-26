"use client";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { ArrowUpRight, MenuIcon, X } from "lucide-react";
import NavbarItems from "./ui/navbar/NavbarItems";
import Link from "next/link";
import { BrandLogo } from "./brand/BrandLogo";
import { ThemeToggle } from "./theme-toggle";
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

  return (
    <>
      {/* Desktop (xl+) — layout switched with CSS so there is no hydration flash */}
      <nav aria-label="Main" className="hidden xl:flex max-w-[1440px] mx-auto h-[84px] items-center gap-3 px-5 2xl:gap-6 2xl:px-[45px]">
        <BrandLogo src={logoUrl} alt={logoAlt} height={64} priority className="[&_img]:!h-[50px] 2xl:[&_img]:!h-16" />

        <div className="flex flex-1 justify-center">
          <NavbarItems
            products={products}
            productMenu={productMenu}
            resourcesMenu={resourcesMenu}
            expertiseCategories={expertiseCategories}
            offshoreCategories={offshoreCategories}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2.5 2xl:gap-3">
          <ThemeToggle />
          <Link href="/contact-us" className="btn-brand !px-5 !py-3 text-sm">
            Contact Us
            <ArrowUpRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Mobile & tablet */}
      <nav aria-label="Main" className="xl:hidden flex h-[68px] items-center justify-between gap-3 px-4 sm:px-6">
        <BrandLogo src={logoUrl} alt={logoAlt} height={44} priority />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-fg transition-colors hover:border-gold/60 hover:text-gold"
              >
                <MenuIcon aria-hidden size={20} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-full w-full sm:w-[420px] bg-canvas text-fg border-l border-line">
              <DrawerHeader className="flex flex-row items-center justify-between border-b border-line px-5 py-4">
                <DrawerTitle className="m-0">
                  <BrandLogo src={logoUrl} alt={logoAlt} height={30} onClick={() => setOpen(false)} />
                </DrawerTitle>
                <DrawerDescription className="sr-only">Site navigation</DrawerDescription>
                <DrawerClose asChild>
                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg hover:text-gold"
                  >
                    <X aria-hidden size={18} />
                  </button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto">
                <div className="px-5 py-4">
                  <Accordion.Root type="multiple" className="w-full flex flex-col">
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
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-line p-5">
                <Link href="/contact-us" onClick={() => setOpen(false)} className="btn-brand flex-1">
                  Contact Us
                  <ArrowUpRight aria-hidden className="btn-arrow h-4 w-4" />
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </>
  );
};

export default MainMenu;
