import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { chunkLegalText, parseDocumentBuffer } from "@/lib/document-processing";
import { safeErrorMessage, sanitizeText } from "@/lib/security";
import { uploadMetadataSchema } from "@/lib/validation";

const MAX_FILE_SIZE = 900 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "video/mp4",
  "video/quicktime",
  "image/png",
  "image/jpeg",
  "image/webp"
]);

function isAllowedFile(file: File): boolean {
  if (ALLOWED_TYPES.has(file.type)) {
    return true;
  }
  return /\.(pdf|txt|docx|png|jpe?g|webp|mp4|mov|zip)$/i.test(file.name);
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
      return NextResponse.json({ error: "File exceeds 900MB limit" }, { status: 413 });
    }

    if (!isAllowedFile(file)) {
      return NextResponse.json({ error: "Only PDF, TXT, and DOCX files are accepted" }, { status: 415 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsedDocument = parseDocumentBuffer(file.name, file.type, buffer);
    const checksum = crypto.createHash("sha256").update(buffer).digest("hex");

    const existingDoc = await prisma.legalDocument.findUnique({
      where: { checksum }
    });

    if (existingDoc) {
      return NextResponse.json({ error: "Document already exists", documentId: existingDoc.id }, { status: 409 });
    }

    const rawText = parsedDocument.rawText;
    const chunks = chunkLegalText(rawText);

    const doc = await prisma.legalDocument.create({
      data: {
        title: parsedDocument.title,
        checksum,
        rawText,
        jurisdiction: parsedMetadata.data.jurisdiction,
        documentType: "user_upload",
        chunks: {
          create: chunks.length
            ? chunks.map((chunk) => ({
                chunkIndex: chunk.chunkIndex,
                sectionLabel: chunk.sectionLabel,
                pageStart: chunk.pageStart,
                pageEnd: chunk.pageEnd,
                text: chunk.text
              }))
            : [
                {
                  chunkIndex: 0,
                  sectionLabel: "Uploaded text",
                  text: rawText
                }
              ]
        }
      }
    });

    return NextResponse.json(
      {
        id: doc.id,
        title: doc.title,
        checksum: doc.checksum,
        status: "PROCESSING",
        createdAt: doc.createdAt,
        parser: parsedDocument.parser,
        chunksCreated: chunks.length || 1
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
