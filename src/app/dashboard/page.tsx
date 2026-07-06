import Link from "next/link";
import { Clock, FolderOpen, Upload } from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">Case dashboard</h1>
          <p className="mt-2 text-ink/68">Track documents, saved source-backed answers, and attorney packet status.</p>
        </div>
        <Link className="focus-ring inline-flex items-center gap-2 rounded bg-pine px-4 py-2 text-sm font-semibold text-paper" href="/upload">
          <Upload size={16} aria-hidden />
          Upload document
        </Link>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Active documents", "3", FolderOpen],
          ["Verified answers", "2", Clock],
          ["Packet readiness", "67%", FolderOpen]
        ].map(([label, value, Icon]) => (
          <section key={label as string} className="rounded border border-line bg-paper p-5 shadow-soft">
            <Icon className="text-pine" size={22} aria-hidden />
            <p className="mt-4 text-sm text-ink/65">{label as string}</p>
            <p className="mt-1 text-3xl font-semibold">{value as string}</p>
          </section>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <DocumentCard
          title="3 Day Notice to Pay or Quit"
          jurisdiction="CA"
          status="READY"
          detail="Parsed intake document with deadline and rent-demand review fields."
        />
        <DocumentCard
          title="24 CFR 982.310"
          jurisdiction="Federal"
          status="SOURCE"
          detail="Housing Choice Voucher owner-termination source available for RAG retrieval."
        />
      </div>
    </div>
  );
}
