import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { sampleSources } from "@/lib/sample-data";

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let document:
    | {
        id: string;
        title: string;
        citation?: string | null;
        jurisdiction?: string | null;
        documentType?: string | null;
        rawText: string;
        chunks: Array<{ id: string; chunkIndex: number; sectionLabel?: string | null; text: string }>;
      }
    | null = null;

  try {
    document = await prisma.legalDocument.findUnique({
      where: { id },
      include: { chunks: { orderBy: { chunkIndex: "asc" } } }
    });
  } catch {
    const sample = sampleSources.find((source) => source.documentId === id || source.id === id);
    if (sample) {
      document = {
        id: sample.documentId,
        title: sample.documentTitle,
        citation: sample.citation,
        jurisdiction: sample.jurisdiction,
        documentType: "seed_source",
        rawText: sample.text,
        chunks: [{ id: sample.id, chunkIndex: 0, sectionLabel: sample.sectionLabel, text: sample.text }]
      };
    }
  }

  if (!document) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link className="text-sm font-semibold text-pine" href="/search">
        Back to search
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">{document.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded bg-field px-2 py-1">{document.jurisdiction || "Unknown jurisdiction"}</span>
        <span className="rounded bg-field px-2 py-1">{document.documentType || "legal document"}</span>
        {document.citation && <span className="rounded bg-pine/10 px-2 py-1 text-pine">{document.citation}</span>}
      </div>
      <section className="mt-6 rounded border border-line bg-paper p-5">
        <h2 className="text-xl font-semibold">Source text</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink/72">{document.rawText}</p>
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Chunks</h2>
        <div className="mt-3 space-y-3">
          {document.chunks.map((chunk) => (
            <article key={chunk.id} className="rounded border border-line bg-field p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                {chunk.sectionLabel || `Chunk ${chunk.chunkIndex + 1}`}
              </p>
              <p className="mt-2 text-sm leading-6">{chunk.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
