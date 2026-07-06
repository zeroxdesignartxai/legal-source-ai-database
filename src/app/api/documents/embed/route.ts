import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { safeErrorMessage } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const { texts } = await req.json();
    if (!Array.isArray(texts) || texts.some((text) => typeof text !== "string")) {
      return NextResponse.json({ error: "texts must be an array of strings" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        embeddings: texts.map((text: string) => ({
          dimensions: 1536,
          vector: null,
          skipped: true,
          reason: `OPENAI_API_KEY is not configured for ${text.length} characters`
        }))
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts
    });

    return NextResponse.json({
      embeddings: response.data.map((item) => ({
        dimensions: item.embedding.length,
        vector: item.embedding
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
