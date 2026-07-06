import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Database, FileSearch } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal Source AI Database",
  description: "Source-first California tenant and Section 8 legal information workspace."
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upload", label: "Upload" },
  { href: "/search", label: "Search" },
  { href: "/ask", label: "Ask" },
  { href: "/packet-builder", label: "Packet" },
  { href: "/settings/sources", label: "Sources" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-line bg-paper/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
              <Link href="/" className="flex items-center gap-3 focus-ring rounded">
                <span className="grid h-10 w-10 place-items-center rounded bg-pine text-paper">
                  <FileSearch size={22} aria-hidden />
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-normal">Legal Source AI Database</span>
                  <span className="block text-xs text-ink/65">California Tenant & Section 8 Edition</span>
                </span>
              </Link>
              <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="focus-ring rounded border border-transparent px-3 py-2 text-sm font-medium text-ink/75 hover:border-line hover:bg-field"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-line bg-field">
              <div className="mx-auto flex max-w-7xl items-start gap-2 px-4 py-3 text-sm text-ink/80">
                <AlertTriangle className="mt-0.5 shrink-0 text-clay" size={18} aria-hidden />
                <p>
                  This system provides legal information and document organization, not legal advice. Verify all
                  deadlines, facts, and filings with a licensed attorney or legal aid clinic.
                </p>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-line bg-ink text-paper">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
              <span>Source-first legal research workspace</span>
              <span className="flex items-center gap-2 text-paper/70">
                <Database size={16} aria-hidden />
                Verified source support required before generated answers are displayed.
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
