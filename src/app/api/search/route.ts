import { NextRequest, NextResponse } from "next/server";
import { searchLegalSources } from "@/lib/legal-search";
import { safeErrorMessage } from "@/lib/security";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") ?? "";
    if (!query.trim()) {
      return NextResponse.json({ error: "q is required" }, { status: 400 });
    }

    const results = await searchLegalSources({
      query,
      jurisdiction: url.searchParams.get("jurisdiction") ?? undefined,
      sourceType: url.searchParams.get("sourceType") ?? undefined,
      limit: Number(url.searchParams.get("limit") ?? 10)
    });

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
