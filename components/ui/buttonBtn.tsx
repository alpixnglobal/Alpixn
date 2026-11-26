// components/ui/button.tsx (MODIFY YOUR EXISTING SHADCN BUTTON)
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define your custom variants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-manrope font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Your custom variants
        primary:
          "bg-[#389EFF] text-white border-2 border-[#389EFF] hover:bg-[#2980db] hover:border-[#2980db] shadow-[0_2px_10px_rgba(157,216,255,0.1)]",
        secondary: "bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400",
        outlined: "bg-transparent text-white border-2 border-[#389EFF] hover:bg-[#389EFF] hover:text-white",
        // Keep shadcn's defaults
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Your custom sizes
        small: "h-9 px-4 py-2 text-sm",
        medium: "h-12 px-5 py-2.5 text-base",
        large: "h-14 px-6 py-3 text-lg",
        // Keep shadcn's defaults
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary", // Default to your primary variant
      size: "medium", // Default to your medium size
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, iconPosition = "right", fullWidth = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")} ref={ref} {...props}>
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
