"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type MobileNavItemProps = {
  label: string;
  href?: string;
  onNavigate: () => void;
  children?: React.ReactNode; // children are optional nested MobileNavItems
};

export function MobileNavItem({ label, href, onNavigate, children }: MobileNavItemProps) {
  // If there are no nested items, render a simple link
  if (!children) {
    return (
      <Link
        href={href!}
        onClick={onNavigate}
        className="block py-3 text-[15px] font-medium text-fg border-b border-line hover:text-tech transition-colors"
      >
        {label}
      </Link>
    );
  }

  // If there are nested items, render an accordion
  return (
    <Accordion.Item value={label} className="border-b border-line">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-[15px] font-semibold text-fg data-[state=open]:text-tech">
          {label}
          <ChevronDown aria-hidden className="h-4 w-4 text-gold transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="flex flex-col pl-4 pb-2 [&_a]:text-fg-muted [&_a]:font-normal">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
