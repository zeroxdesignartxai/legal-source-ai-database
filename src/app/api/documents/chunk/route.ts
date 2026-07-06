import { NextRequest, NextResponse } from "next/server";
import { chunkLegalText } from "@/lib/document-processing";
import { safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const { text, maxChars, overlapChars } = await req.json();
    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    return NextResponse.json({
      chunks: chunkLegalText(text, maxChars, overlapChars)
    });
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
