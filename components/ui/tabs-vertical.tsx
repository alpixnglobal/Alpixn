"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-row border-l-8", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        `
        flex
        flex-col

        w-[457px]
        h-[432px]              /* 6 tabs × 72px */

        overflow-y-auto
        overflow-x-hidden

        border-l
        border-white/15

        bg-transparent
        p-0

        scale-x-[-1]           /* 🔥 LEFT SCROLLBAR */
        `,
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `
        scale-x-[-1]          /* 🔥 UN-MIRROR CONTENT */

        h-[72px]
        w-full
        px-4

        flex
        items-center
        justify-start

        text-white
        text-2xl
        font-medium

        bg-transparent
        rounded-none

        border-b-[3px]
        border-white/15

        transition-colors

        data-[state=active]:bg-[linear-gradient(180deg,_#389EFF_0%,_#003098_100%)]
        data-[state=active]:border-transparent
        data-[state=active]:[border-image-source:radial-gradient(50%_1289.19%_at_50%_100%,_#FFFFFF_0%,_#389EFF_100%)]
        data-[state=active]:[border-image-slice:1]
        `,
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
