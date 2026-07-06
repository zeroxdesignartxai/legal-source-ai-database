import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAnswer } from "@/lib/citation-verifier";
import prisma from "@/lib/db";
import { executeRAGPipeline } from "@/lib/rag-pipeline";
import { safeErrorMessage } from "@/lib/security";
import { askRequestSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const parsed = askRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Question must be 8 to 1000 characters and jurisdiction must be valid" }, { status: 400 });
    }

    const { question, jurisdiction, topic } = parsed.data;
    const { answer, retrievedChunks } = await executeRAGPipeline(question, jurisdiction);
    const verificationReport = await verifyAnswer(answer, retrievedChunks);

    let answerId = crypto.randomUUID();

    try {
      const savedAnswer = await prisma.legalAnswer.create({
        data: {
          userQuestion: question,
          answer,
          jurisdiction,
          topic,
          confidenceLevel: verificationReport.status === "PASSED" ? "HIGH" : "LOW",
          verifications: {
            create: {
              status: verificationReport.status,
              issues: verificationReport.issues
            }
          }
        }
      });
      answerId = savedAnswer.id;
    } catch {
      answerId = `local-${answerId}`;
    }

    return NextResponse.json({
      answerId,
      answer:
        verificationReport.status === "FAILED"
          ? "I do not have enough verified source support to answer that safely."
          : answer,
      citations: retrievedChunks,
      verificationReport
    });
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
