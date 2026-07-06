import type { LegalChunk } from "@/types";

export type PacketInput = {
  title: string;
  question?: string;
  documents: Array<{
    id: string;
    title: string;
    jurisdiction?: string | null;
    citation?: string | null;
    documentType?: string | null;
    createdAt?: Date | string;
  }>;
  sources?: LegalChunk[];
  deadlines?: string[];
};

export function generateAttorneyPacketMarkdown(input: PacketInput): string {
  const lines = [
    `# Attorney Packet: ${input.title}`,
    "",
    "This system provides legal information and document organization support. It is not a lawyer, does not create an attorney-client relationship, and should not be used as a substitute for advice from a licensed attorney.",
    "",
    "## Intake Question",
    input.question || "Not provided.",
    "",
    "## Document List",
    ...(input.documents.length
      ? input.documents.map((doc) => `- ${doc.title} (${doc.jurisdiction || "unknown jurisdiction"})${doc.citation ? ` — ${doc.citation}` : ""}`)
      : ["- No documents selected."]),
    "",
    "## Timeline",
    ...((input.deadlines?.length ?? 0) > 0 ? input.deadlines!.map((date) => `- Check deadline/date candidate: ${date}`) : ["- No date candidates extracted yet."]),
    "",
    "## Issue Chart",
    "- Jurisdiction and source support must be verified before filing.",
    "- Separate federal, state, and local authority.",
    "- Flag unsupported claims for attorney review.",
    "",
    "## Evidence / Exhibit List",
    ...(input.documents.length ? input.documents.map((doc, index) => `- Exhibit ${index + 1}: ${doc.title}`) : ["- Add uploaded documents before export."]),
    "",
    "## Source List",
    ...((input.sources?.length ?? 0) > 0
      ? input.sources!.map((source) => `- ${source.citation}: ${source.documentTitle}`)
      : ["- No retrieved source chunks attached."]),
    "",
    "## Questions For Lawyer",
    "- Which deadlines are jurisdictional?",
    "- Which source controls if federal, state, and local rules conflict?",
    "- What evidence is missing before filing or hearing?",
    "",
    "## Missing Documents Checklist",
    "- Complete notice or letter",
    "- Rent ledger or payment history",
    "- Hearing notice or court complaint",
    "- Photos, inspection reports, emails, and witness statements",
    "- Agency file, investigator logs, and appeal records"
  ];

  return lines.join("\n");
}
