import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "selection:bg-primary selection:text-primary-foreground placeholder:text-fg/80 placeholder:pl-3.75",
        "dark:bg-input/30 border-input",
        "min-h-32.25 w-full rounded-[5px] border border-fg/25",
        "bg-surface-2  pt-3.75 text-sm shadow-xs",
        "transition-[color,box-shadow] outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "field-sizing-content",
        className,
      )}
      {...props}
    />
  );
}

interface TextareaInputProps extends React.ComponentProps<"textarea"> {
  label: string;
  required?: boolean;
  asteriskColor?: string;
}

function TextareaInput({ label, required, asteriskColor = "#FF4040", className, ...props }: TextareaInputProps) {
  return (
    <div className="relative w-full">
      {/* Textarea field */}
      <textarea
        {...props}
        required={required}
        className={cn(
          "peer w-full rounded-[5px] border border-fg/25 bg-surface-2 px-3 pt-7 pb-2 text-sm text-fg/80 placeholder-transparent outline-none",
          className,
        )}
        placeholder=" "
      />

      {/* Floating label */}
      <span
        className={cn(
          "absolute left-3 pointer-events-none transition-all duration-150",
          // Default (has value): float at top-left, small
          "top-2 translate-y-0 text-xs text-fg/60",
          // When empty (placeholder shown): at top but normal size
          "peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-fg/60",
          // When focused: always float up
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-fg/60",
        )}
      >
        {label}
        {required && (
          <span style={{ color: asteriskColor }} className="ml-1">
            *
          </span>
        )}
      </span>
    </div>
  );
}

export { Textarea, TextareaInput };
