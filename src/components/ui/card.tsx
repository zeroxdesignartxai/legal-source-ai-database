import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded border border-line bg-paper shadow-soft ${className}`}>{children}</section>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="border-b border-line px-5 py-4">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold tracking-normal text-ink">{children}</h2>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>;
}
