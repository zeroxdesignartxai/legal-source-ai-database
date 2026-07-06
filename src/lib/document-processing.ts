import crypto from "crypto";
import { sanitizeText } from "@/lib/security";

export type ParsedDocument = {
  title: string;
  rawText: string;
  checksum: string;
  mimeType: string;
  byteSize: number;
  parser: string;
};

export type LegalTextChunk = {
  chunkIndex: number;
  text: string;
  sectionLabel: string;
  pageStart?: number;
  pageEnd?: number;
  metadata: Record<string, string | number | boolean>;
};

export type LegalClassification = {
  jurisdiction: "CA" | "Federal" | "Local";
  topic: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
};

export function checksumBuffer(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function extractPrintableText(buffer: Buffer): string {
  return sanitizeText(
    buffer
      .toString("latin1")
      .replace(/[^\x09\x0A\x0D\x20-\x7E]+/g, " ")
      .replace(/\s+/g, " ")
  );
}

export function parseDocumentBuffer(fileName: string, mimeType: string, buffer: Buffer): ParsedDocument {
  const lowerName = fileName.toLowerCase();
  const checksum = checksumBuffer(buffer);
  let rawText: string;
  let parser = "plain-text";

  if (mimeType === "text/plain" || lowerName.endsWith(".txt") || lowerName.endsWith(".html")) {
    rawText = sanitizeText(buffer.toString("utf-8"));
  } else if (mimeType === "application/pdf" || lowerName.endsWith(".pdf")) {
    parser = "pdf-printable-text";
    rawText = extractPrintableText(buffer);
  } else if (lowerName.endsWith(".docx")) {
    parser = "docx-zip-printable-text";
    rawText = extractPrintableText(buffer);
  } else if (mimeType.startsWith("image/") || mimeType.startsWith("video/") || lowerName.endsWith(".zip")) {
    parser = "evidence-bundle-metadata";
    rawText = `Evidence bundle uploaded: ${sanitizeText(fileName)}. OCR/transcription can be attached by a worker, but the file metadata is preserved for packet tracking.`;
  } else {
    parser = "binary-metadata";
    rawText = `Uploaded binary document: ${sanitizeText(fileName)}.`;
  }

  return {
    title: sanitizeText(fileName).slice(0, 240),
    rawText: rawText || `Uploaded document ${sanitizeText(fileName)} contained no extractable text.`,
    checksum,
    mimeType: mimeType || "application/octet-stream",
    byteSize: buffer.byteLength,
    parser
  };
}

export function chunkLegalText(text: string, maxChars = 1400, overlapChars = 180): LegalTextChunk[] {
  const clean = sanitizeText(text).replace(/\s+/g, " ");
  if (!clean) {
    return [];
  }

  const chunks: LegalTextChunk[] = [];
  let index = 0;
  let cursor = 0;

  while (cursor < clean.length) {
    const hardEnd = Math.min(cursor + maxChars, clean.length);
    const sentenceEnd = clean.lastIndexOf(".", hardEnd);
    const end = sentenceEnd > cursor + Math.floor(maxChars * 0.55) ? sentenceEnd + 1 : hardEnd;
    const chunkText = clean.slice(cursor, end).trim();

    if (chunkText) {
      chunks.push({
        chunkIndex: index,
        text: chunkText,
        sectionLabel: `Chunk ${index + 1}`,
        metadata: {
          charStart: cursor,
          charEnd: end,
          approximate: true
        }
      });
      index += 1;
    }

    if (end >= clean.length) {
      break;
    }
    cursor = Math.max(end - overlapChars, cursor + 1);
  }

  return chunks;
}

export function classifyLegalQuestion(question: string): LegalClassification {
  const text = question.toLowerCase();
  const federalSignals = ["section 8", "hcv", "hud", "federal", "cfr", "voucher", "pha"];
  const californiaSignals = ["california", "ca ", "civil code", "rent control", "habitability", "retaliation"];
  const urgentSignals = ["evict", "termination", "notice", "hearing", "deadline", "lockout", "quit"];

  const jurisdiction = federalSignals.some((term) => text.includes(term))
    ? "Federal"
    : californiaSignals.some((term) => text.includes(term))
      ? "CA"
      : "Local";

  const topic = text.includes("section 8") || text.includes("voucher")
    ? "Section 8 / Housing Choice Voucher"
    : text.includes("mold") || text.includes("repair") || text.includes("habitability")
      ? "Habitability"
      : text.includes("debt") || text.includes("credit")
        ? "Consumer debt"
        : text.includes("contract") || text.includes("clause")
          ? "Contract review"
          : "General legal source research";

  return {
    jurisdiction,
    topic,
    urgency: urgentSignals.some((term) => text.includes(term)) ? "HIGH" : "MEDIUM"
  };
}

export function extractDeadlineCandidates(text: string): string[] {
  const clean = sanitizeText(text);
  const patterns = [
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
    /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}\b/gi,
    /\b\d+\s+(?:calendar\s+)?(?:day|days|business days|hour|hours)\b/gi
  ];

  return Array.from(new Set(patterns.flatMap((pattern) => clean.match(pattern) ?? [])));
}
