export type LegalChunk = {
  id: string;
  documentId: string;
  documentTitle: string;
  citation: string;
  jurisdiction: string;
  sectionLabel: string;
  text: string;
  relevanceScore: number;
};

export type VerificationIssue = {
  type: "UNSUPPORTED_CLAIM" | "MISMATCHED_JURISDICTION";
  claim: string;
  reason: string;
};

export type VerificationReport = {
  status: "PASSED" | "FAILED" | "WARNING";
  issues: VerificationIssue[];
};

export type RAGResult = {
  answer: string;
  retrievedChunks: LegalChunk[];
};
