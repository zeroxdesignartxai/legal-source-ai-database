import OpenAI from "openai";
import prisma from "@/lib/db";
import { sampleSources } from "@/lib/sample-data";
import { sanitizeText } from "@/lib/security";
import type { LegalChunk, RAGResult } from "@/types";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function scoreChunk(question: string, chunk: LegalChunk): number {
  const terms = question.toLowerCase().split(/\W+/).filter(Boolean);
  const haystack = `${chunk.text} ${chunk.citation} ${chunk.sectionLabel}`.toLowerCase();
  const matches = terms.filter((term) => haystack.includes(term)).length;
  return matches / Math.max(terms.length, 1);
}

async function retrieveWithDatabase(question: string, jurisdiction: string): Promise<LegalChunk[]> {
  try {
    const rows = await prisma.legalChunk.findMany({
      where: {
        document: {
          jurisdiction
        }
      },
      include: {
        document: true
      },
      take: 10,
      orderBy: {
        createdAt: "desc"
      }
    });

    return rows
      .map((row) => ({
        id: row.id,
        documentId: row.documentId,
        documentTitle: row.document.title,
        citation: row.document.citation ?? row.document.title,
        jurisdiction: row.document.jurisdiction ?? "CA",
        sectionLabel: row.sectionLabel ?? "Source chunk",
        text: row.text,
        relevanceScore: scoreChunk(question, {
          id: row.id,
          documentId: row.documentId,
          documentTitle: row.document.title,
          citation: row.document.citation ?? row.document.title,
          jurisdiction: row.document.jurisdiction ?? "CA",
          sectionLabel: row.sectionLabel ?? "Source chunk",
          text: row.text,
          relevanceScore: 0
        })
      }))
      .filter((chunk) => chunk.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);
  } catch {
    return [];
  }
}

function retrieveFromSamples(question: string, jurisdiction: string): LegalChunk[] {
  return sampleSources
    .filter((chunk) => chunk.jurisdiction === jurisdiction || jurisdiction === "CA")
    .map((chunk) => ({ ...chunk, relevanceScore: scoreChunk(question, chunk) }))
    .filter((chunk) => chunk.relevanceScore > 0.05)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
}

function deterministicAnswer(question: string, chunks: LegalChunk[]): string {
  if (!chunks.length) {
    return "I do not have enough verified source support to answer that safely.";
  }

  const primary = chunks[0];
  const normalizedQuestion = question.toLowerCase();

  if (normalizedQuestion.includes("mold") || normalizedQuestion.includes("retaliat")) {
    return [
      "## Direct answer",
      `California source support indicates that a landlord may not retaliate against a tenant for complaining about habitability conditions or exercising protected tenant rights. (${primary.citation})`,
      "",
      "## What the source supports",
      `The retrieved source supports a retaliation framing when the tenant complaint concerns habitability or lawful tenant-rights activity. (${primary.citation})`,
      "",
      "## Source limit",
      "This is legal information, not legal advice. The uploaded or retrieved sources do not establish your exact deadline, local rent-control coverage, or case outcome."
    ].join("\n");
  }

  return [
    "## Direct answer",
    `The safest supported answer is limited to the retrieved source: ${primary.text} (${primary.citation})`,
    "",
    "## Source limit",
    "I do not have enough verified source support to go beyond that source-backed statement."
  ].join("\n");
}

export async function executeRAGPipeline(question: string, jurisdiction: string): Promise<RAGResult> {
  const cleanQuestion = sanitizeText(question);
  const dbChunks = await retrieveWithDatabase(cleanQuestion, jurisdiction);
  const retrievedChunks = dbChunks.length ? dbChunks : retrieveFromSamples(cleanQuestion, jurisdiction);

  if (!openai || !retrievedChunks.length) {
    return {
      answer: deterministicAnswer(cleanQuestion, retrievedChunks),
      retrievedChunks
    };
  }

  const systemPrompt = `
You are an elite legal research assistant. You provide legal information, NOT legal advice.
Answer using ONLY the retrieved legal chunks below.
If source support is absent, say: "I do not have enough verified source support to answer that safely."
Every legal claim must include an inline citation.

Retrieved Chunks:
${retrievedChunks.map((chunk) => `[ID: ${chunk.id}] ${chunk.text} Citation: ${chunk.citation}`).join("\n\n")}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: cleanQuestion }
    ]
  });

  return {
    answer: completion.choices[0].message.content ?? deterministicAnswer(cleanQuestion, retrievedChunks),
    retrievedChunks
  };
}
