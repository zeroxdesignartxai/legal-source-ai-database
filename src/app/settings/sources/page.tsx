import { RefreshCcw, ShieldCheck } from "lucide-react";
import { sampleSources } from "@/lib/sample-data";

export default function SourcesSettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold">Source settings</h1>
      <p className="mt-2 text-ink/68">Monitor official source connectors and ingestion readiness.</p>
      <div className="mt-6 overflow-x-auto rounded border border-line bg-paper">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-field text-xs uppercase text-ink/60">
            <tr>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last sync</th>
            </tr>
          </thead>
          <tbody>
            {sampleSources.map((source) => (
              <tr key={source.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{source.documentTitle}</td>
                <td className="px-4 py-3">{source.jurisdiction}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 rounded bg-pine/10 px-2 py-1 text-pine">
                    <ShieldCheck size={14} aria-hidden />
                    Verified seed
                  </span>
                </td>
                <td className="px-4 py-3">Local seed</td>
              </tr>
            ))}
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-semibold">CourtListener California appellate sync</td>
              <td className="px-4 py-3">Court opinions</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2 rounded bg-gold/20 px-2 py-1 text-ink">
                  <RefreshCcw size={14} aria-hidden />
                  Configure API key
                </span>
              </td>
              <td className="px-4 py-3">Not scheduled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
