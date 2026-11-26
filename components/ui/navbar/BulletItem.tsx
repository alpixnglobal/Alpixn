import { cn } from "@/lib/utils";

interface BulletItemProps {
  children: React.ReactNode;
  className?: string;
}

/** Dropdown list item with a gold→blue leader line that extends on hover (pure CSS, no re-renders). */
export function BulletItem({ children, className }: BulletItemProps) {
  return (
    <div className={cn("group/bullet flex items-center gap-2.5 cursor-pointer", className)}>
      <span
        aria-hidden
        className="h-px w-4 bg-fg/40 transition-all duration-300 ease-out group-hover/bullet:w-6 group-hover/bullet:bg-gold group-focus-visible:w-6"
      />
      <span className="font-normal text-[15px] leading-tight text-fg/85 transition-colors duration-300 ease-out group-hover/bullet:text-tech">
        {children}
      </span>
    </div>
  );
}
