import Link from "next/link";
import { notFound } from "next/navigation";
import { CitationVerifierReport } from "@/components/CitationVerifierReport";
import prisma from "@/lib/db";
import type { VerificationReport } from "@/types";

export default async function AnswerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let answer:
    | {
        id: string;
        userQuestion: string;
        answer: string;
        jurisdiction?: string | null;
        topic?: string | null;
        verifications: Array<{ status: string; issues: unknown }>;
      }
    | null = null;

  try {
    answer = await prisma.legalAnswer.findUnique({
      where: { id },
      include: { verifications: { orderBy: { createdAt: "desc" }, take: 1 } }
    });
  } catch {
    answer = null;
  }

  if (!answer) {
    notFound();
  }

  const report: VerificationReport =
    answer.verifications[0]
      ? {
          status: answer.verifications[0].status as VerificationReport["status"],
          issues: Array.isArray(answer.verifications[0].issues) ? (answer.verifications[0].issues as VerificationReport["issues"]) : []
        }
      : { status: "WARNING", issues: [{ type: "UNSUPPORTED_CLAIM", claim: "No verifier run", reason: "No verifier report was stored for this answer." }] };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link className="text-sm font-semibold text-pine" href="/ask">
        Back to ask
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">Saved answer</h1>
      <p className="mt-2 text-sm text-ink/65">
        {answer.jurisdiction || "Unknown jurisdiction"} {answer.topic ? `- ${answer.topic}` : ""}
      </p>
      <section className="mt-6 rounded border border-line bg-paper p-5">
        <h2 className="text-lg font-semibold">Question</h2>
        <p className="mt-2">{answer.userQuestion}</p>
      </section>
      <section className="mt-4 rounded border border-line bg-paper p-5">
        <h2 className="text-lg font-semibold">Answer</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{answer.answer}</p>
      </section>
      <div className="mt-4">
        <CitationVerifierReport report={report} />
      </div>
    </div>
  );
}
