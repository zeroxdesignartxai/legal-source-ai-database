import { ShieldCheck, ShieldAlert } from "lucide-react";
import type { VerificationReport } from "@/types";

export function CitationVerifierReport({ report }: { report: VerificationReport }) {
  const passed = report.status === "PASSED";
  return (
    <div className={`rounded border p-4 ${passed ? "border-pine/30 bg-pine/10" : "border-clay/30 bg-clay/10"}`}>
      <div className="flex items-center gap-2 font-semibold">
        {passed ? <ShieldCheck size={18} aria-hidden /> : <ShieldAlert size={18} aria-hidden />}
        Citation verifier: {report.status}
      </div>
      {report.issues.length > 0 && (
        <ul className="mt-3 space-y-2 text-sm">
          {report.issues.map((issue, index) => (
            <li key={`${issue.type}-${index}`} className="rounded bg-paper p-3">
              <strong>{issue.type}:</strong> {issue.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
