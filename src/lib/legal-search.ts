import prisma from "@/lib/db";
import { sampleSources } from "@/lib/sample-data";
import type { LegalChunk } from "@/types";

function relevanceScore(query: string, text: string): number {
  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
  if (!terms.length) {
    return 0;
  }
  const haystack = text.toLowerCase();
  return terms.filter((term) => haystack.includes(term)).length / terms.length;
}

export async function searchLegalSources(params: {
  query: string;
  jurisdiction?: string;
  sourceType?: string;
  limit?: number;
}): Promise<LegalChunk[]> {
  const limit = params.limit ?? 10;
  try {
    const rows = await prisma.legalChunk.findMany({
      where: {
        text: {
          contains: params.query,
          mode: "insensitive"
        },
        document: {
          jurisdiction: params.jurisdiction || undefined,
          documentType: params.sourceType || undefined
        }
      },
      include: { document: true },
      take: limit
    });

    return rows.map((row) => ({
      id: row.id,
      documentId: row.documentId,
      documentTitle: row.document.title,
      citation: row.document.citation ?? row.document.title,
      jurisdiction: row.document.jurisdiction ?? "Unknown",
      sectionLabel: row.sectionLabel ?? "Source chunk",
      text: row.text,
      relevanceScore: relevanceScore(params.query, row.text)
    }));
  } catch {
    return sampleSources
      .map((source) => ({
        ...source,
        relevanceScore: relevanceScore(params.query, `${source.text} ${source.citation} ${source.documentTitle}`)
      }))
      .filter((source) => source.relevanceScore > 0 && (!params.jurisdiction || source.jurisdiction === params.jurisdiction))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }
}
