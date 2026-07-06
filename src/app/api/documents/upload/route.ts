import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { safeErrorMessage, sanitizeText } from "@/lib/security";
import { uploadMetadataSchema } from "@/lib/validation";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

function isAllowedFile(file: File): boolean {
  if (ALLOWED_TYPES.has(file.type)) {
    return true;
  }
  return /\.(pdf|txt|docx)$/i.test(file.name);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const parsedMetadata = uploadMetadataSchema.safeParse({
      jurisdiction: formData.get("jurisdiction") ?? "CA"
    });

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!parsedMetadata.success) {
      return NextResponse.json({ error: "Invalid jurisdiction" }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Uploaded file is empty" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 413 });
    }

    if (!isAllowedFile(file)) {
      return NextResponse.json({ error: "Only PDF, TXT, and DOCX files are accepted" }, { status: 415 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const checksum = crypto.createHash("sha256").update(buffer).digest("hex");

    const existingDoc = await prisma.legalDocument.findUnique({
      where: { checksum }
    });

    if (existingDoc) {
      return NextResponse.json({ error: "Document already exists", documentId: existingDoc.id }, { status: 409 });
    }

    const rawText =
      file.type === "text/plain" || /\.txt$/i.test(file.name)
        ? sanitizeText(buffer.toString("utf-8"))
        : `Uploaded binary document: ${sanitizeText(file.name)}. Full OCR/parsing worker pending provider configuration.`;

    const doc = await prisma.legalDocument.create({
      data: {
        title: sanitizeText(file.name).slice(0, 240),
        checksum,
        rawText,
        jurisdiction: parsedMetadata.data.jurisdiction,
        documentType: "user_upload",
        chunks: {
          create: {
            chunkIndex: 0,
            sectionLabel: "Uploaded text",
            text: rawText
          }
        }
      }
    });

    return NextResponse.json(
      {
        id: doc.id,
        title: doc.title,
        checksum: doc.checksum,
        status: "PROCESSING",
        createdAt: doc.createdAt
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
