import { NextRequest, NextResponse } from "next/server";
import { getConnector } from "@/lib/source-connectors";

export async function POST(req: NextRequest) {
  const { connectorId } = await req.json();
  const connector = getConnector(connectorId);

  if (!connector) {
    return NextResponse.json({ error: "Unknown connector" }, { status: 404 });
  }

  return NextResponse.json({
    connector,
    status: "READY_FOR_SYNC",
    message:
      connector.syncMode === "user-upload"
        ? "User uploads are handled by /api/documents/upload."
        : "Connector registered. Add provider credentials and a scheduled worker to sync live records."
  });
}
