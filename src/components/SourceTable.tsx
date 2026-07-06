import type { LegalChunk } from "@/types";

export function SourceTable({ sources }: { sources: LegalChunk[] }) {
  return (
    <div className="overflow-x-auto rounded border border-line">
      <table className="w-full min-w-[680px] border-collapse bg-paper text-left text-sm">
        <thead className="bg-field text-xs uppercase text-ink/60">
          <tr>
            <th className="px-4 py-3">Citation</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Jurisdiction</th>
            <th className="px-4 py-3">Relevance</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id} className="border-t border-line">
              <td className="px-4 py-3 font-semibold">{source.citation}</td>
              <td className="px-4 py-3">{source.documentTitle}</td>
              <td className="px-4 py-3">{source.jurisdiction}</td>
              <td className="px-4 py-3">{Math.round(source.relevanceScore * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
