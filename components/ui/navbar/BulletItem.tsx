"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface BulletItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BulletItem({ children, className }: BulletItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("flex items-center gap-2 cursor-pointer", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Horizontal divider */}
      <div
        className="h-px transition-all duration-300 ease-out"
        style={{
          width: hovered ? "1.5rem" : "1rem", // w-6 vs w-4
          backgroundColor: hovered ? "#389EFF" : "white",
        }}
      />
      <span
        className="font-normal text-base leading-none transition-colors duration-300 ease-out"
        style={{
          color: hovered ? "#389EFF" : "white",
        }}
      >
        {children}
      </span>
    </div>
  );
}
