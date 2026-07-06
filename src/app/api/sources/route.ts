import { NextResponse } from "next/server";
import { trustedSourceConnectors } from "@/lib/source-connectors";

export async function GET() {
  return NextResponse.json({ sources: trustedSourceConnectors });
}
