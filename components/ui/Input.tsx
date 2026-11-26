"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-white/80 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12.5 w-full min-w-0 rounded-[5px] border border-white/25 bg-[#152E46] px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

interface InputFieldProps extends React.ComponentProps<"input"> {
  label: string;
  required?: boolean;
  asteriskColor?: string;
  labelClassName?: string;
}

function  InputField({ label, required, asteriskColor = "#FF4040", className, labelClassName, ...props }: InputFieldProps) {
  const inputId = React.useId();
  const resolvedId = props.id ?? inputId;

  return (
    <div className="relative w-full">
      <input
        {...props}
        id={resolvedId}
        required={required}
        className={cn(
          "peer h-12.5 w-full rounded-[5px] border border-white/25 bg-[#152E46] px-3 pt-5 pb-1 text-sm text-white/80 placeholder-transparent outline-none",
          className,
        )}
        placeholder=" "
      />

      <label
        htmlFor={resolvedId}
        className={cn(
          "absolute left-3 pointer-events-none transition-all duration-150",
          // Default (has value): float at top-left, small
          "top-1.5 translate-y-0 text-xs text-white/60",
          // When empty (placeholder shown): center, normal size
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/60",
          // When focused: always float up
          "peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-white/60",
          labelClassName
        )}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: asteriskColor }}>
            *
          </span>
        )}
      </label>
    </div>
  );
}

function InputDateField({ label, required, className, ...props }: InputFieldProps) {
  const inputId = React.useId();
  const resolvedId = props.id ?? inputId;

  return (
    <div className="relative w-full">
      <input
        {...props}
        id={resolvedId}
        required={required}
        className={cn(
          "h-12.5 w-full rounded-[5px] border border-white/25 bg-[#152E46] px-3 text-sm text-white/80 placeholder-transparent outline-none",
          className
        )}
        placeholder=" "
        style={{
          WebkitAppearance: "textfield",
        }}
      />

      <label htmlFor={resolvedId} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 text-sm pointer-events-none">
        {label}
        {required && <span className="text-[#FF4040] ml-1">*</span>}
      </label>

      <style jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(100%) brightness(100%);
        }
      `}</style>
    </div>
  );
}

interface InputLinkProps extends React.ComponentProps<"input"> {
  label: string;
  required?: boolean;
}

function InputLink({ label, required, className, ...props }: InputLinkProps) {
  const inputId = React.useId();
  const resolvedId = props.id ?? inputId;

  return (
    <div className="relative w-full">
      <input
        id={resolvedId}
        type={props.type}
        data-slot="input"
        className={cn(
          "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12.5 w-full min-w-0 rounded-[5px] border border-white/25 bg-[#152E46] px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      <label htmlFor={resolvedId} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 text-sm pointer-events-none flex items-center gap-1">
        {label}
        {required && <span className="text-[#FF4040]">*</span>}
      </label>

      {/* Right icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none"
      >
        <path
          d="M6.50171 8.66709C6.81268 9.08282 7.20942 9.42681 7.66502 9.67573C8.12062 9.92464 8.62443 10.0727 9.14227 10.1098C9.66011 10.1468 10.1799 10.0721 10.6663 9.89067C11.1527 9.70922 11.5944 9.42528 11.9615 9.0581L14.1338 6.88578C14.7933 6.20294 15.1582 5.28838 15.15 4.33908C15.1417 3.38979 14.761 2.48171 14.0897 1.81043C13.4184 1.13915 12.5103 0.758386 11.561 0.750137C10.6117 0.741888 9.69719 1.10682 9.01435 1.76633L7.76889 3.00456"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.3984 7.21852C9.08743 6.80279 8.69069 6.4588 8.23508 6.20988C7.77948 5.96096 7.27568 5.81294 6.75784 5.77585C6.24 5.73876 5.72024 5.81348 5.23382 5.99493C4.74739 6.17638 4.30568 6.46033 3.93864 6.8275L1.76632 8.99983C1.10682 9.68267 0.741888 10.5972 0.750137 11.5465C0.758386 12.4958 1.13915 13.4039 1.81043 14.0752C2.4817 14.7464 3.38978 15.1272 4.33907 15.1355C5.28836 15.1437 6.20291 14.7788 6.88575 14.1193L8.12397 12.881"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

interface FileInputProps extends React.ComponentProps<"input"> {
  required?: boolean; // show red asterisk if required
}

function FileInput({ required, className, ...props }: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputId = React.useId();
  const resolvedId = props.id ?? inputId;

  return (
    <div className="relative w-[185px]">
      <input ref={inputRef} id={resolvedId} type="file" placeholder="" className="hidden" {...props} required={required} />

      <button
        type="button"
        aria-label="Upload resume"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative h-12.5 w-full rounded-[5px] bg-[#152E46] pl-10 pr-3 text-left text-sm text-white/80 flex items-center gap-2.5",
          className
        )}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(255,255,255,0.5) 0px,
              rgba(255,255,255,0.5) 8px,
              transparent 16px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(255,255,255,0.5) 0px,
              rgba(255,255,255,0.5) 8px,
              transparent 16px
            ),
            repeating-linear-gradient(
              to left,
              rgba(255,255,255,0.5) 0px,
              rgba(255,255,255,0.5) 8px,
              transparent 16px
            ),
            repeating-linear-gradient(
              to top,
              rgba(255,255,255,0.5) 0px,
              rgba(255,255,255,0.5) 8px,
              transparent 16px
            )
          `,
          backgroundSize: "100% 1px, 1px 100%, 100% 1px, 1px 100%",
          backgroundPosition: "top left, top right, bottom left, top left",
          backgroundRepeat: "no-repeat",
        }}
      >
        Upload Resume{" "}
        {required && (
          <span className="mb-1 block text-white/80 text-sm font-medium">
            <span className="text-[#FF4040]">*</span>
          </span>
        )}
      </button>

      {/* Icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
      >
        <path
          d="M19 13V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V13"
          stroke="white"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 6L10 1L5 6"
          stroke="white"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 1V13"
          stroke="white"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
export { Input, InputLink, FileInput, InputField, InputDateField };
