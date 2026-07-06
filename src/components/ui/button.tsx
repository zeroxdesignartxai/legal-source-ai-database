import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger";
  children: ReactNode;
};

const variants = {
  primary: "bg-pine text-paper hover:bg-[#174738]",
  secondary: "bg-gold text-ink hover:bg-[#a9762a]",
  outline: "border border-line bg-paper text-ink hover:bg-field",
  danger: "bg-clay text-paper hover:bg-[#803f2d]"
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex min-h-10 items-center justify-center rounded px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
