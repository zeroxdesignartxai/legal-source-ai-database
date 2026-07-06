import { FileText } from "lucide-react";

type DocumentCardProps = {
  title: string;
  jurisdiction: string;
  status: string;
  detail: string;
};

export function DocumentCard({ title, jurisdiction, status, detail }: DocumentCardProps) {
  return (
    <article className="rounded border border-line bg-paper p-4">
      <div className="flex items-start gap-3">
        <FileText className="mt-1 shrink-0 text-pine" size={20} aria-hidden />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-ink/65">{detail}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded bg-field px-2 py-1">{jurisdiction}</span>
            <span className="rounded bg-pine/10 px-2 py-1 text-pine">{status}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
