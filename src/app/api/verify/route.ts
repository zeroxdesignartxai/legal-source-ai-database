import { NextRequest, NextResponse } from "next/server";
import { verifyAnswer } from "@/lib/citation-verifier";
import { safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const { answer, chunks } = await req.json();
    if (typeof answer !== "string" || !Array.isArray(chunks)) {
      return NextResponse.json({ error: "answer and chunks are required" }, { status: 400 });
    }

    return NextResponse.json(await verifyAnswer(answer, chunks));
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
