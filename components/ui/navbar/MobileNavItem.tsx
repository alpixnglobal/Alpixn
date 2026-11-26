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
        className="py-2 text-sm font-medium text-gray-900 border-b border-gray-200 hover:text-blue-600 transition-colors"
      >
        {label}
      </Link>
    );
  }

  // If there are nested items, render an accordion
  return (
    <Accordion.Item value={label} className="border-b border-gray-200">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-sm font-medium text-gray-900">
          {label}
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="flex flex-col pl-4 pb-2">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
