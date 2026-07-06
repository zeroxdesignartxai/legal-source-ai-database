import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`focus-ring min-h-10 w-full rounded border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/45 ${className}`}
      {...props}
    />
  );
}
