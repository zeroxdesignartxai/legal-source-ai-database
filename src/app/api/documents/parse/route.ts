import { NextRequest, NextResponse } from "next/server";
import { parseDocumentBuffer } from "@/lib/document-processing";
import { safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    return NextResponse.json(parseDocumentBuffer(file.name, file.type, buffer));
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
