import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { extractDeadlineCandidates } from "@/lib/document-processing";
import { generateAttorneyPacketMarkdown } from "@/lib/packet-builder";
import { safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const { title = "Attorney Review Packet", documentIds = [], question } = await req.json();
    if (!Array.isArray(documentIds)) {
      return NextResponse.json({ error: "documentIds must be an array" }, { status: 400 });
    }

    let documents: Array<{
      id: string;
      title: string;
      jurisdiction?: string | null;
      citation?: string | null;
      documentType?: string | null;
      rawText?: string;
      createdAt?: Date;
    }> = [];

    try {
      documents = await prisma.legalDocument.findMany({
        where: { id: { in: documentIds } },
        take: 50
      });
    } catch {
      documents = documentIds.map((id: string) => ({
        id,
        title: `Document ${id}`,
        jurisdiction: "Unknown",
        citation: null,
        documentType: "user_upload",
        rawText: ""
      }));
    }

    const markdown = generateAttorneyPacketMarkdown({
      title,
      question,
      documents,
      deadlines: documents.flatMap((document) => extractDeadlineCandidates(document.rawText ?? ""))
    });

    return NextResponse.json({ title, markdown });
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
