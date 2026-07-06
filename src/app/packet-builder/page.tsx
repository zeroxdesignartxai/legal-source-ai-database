"use client";

import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePacketStore } from "@/store/usePacketStore";

export default function PacketBuilderPage() {
  const { selectedDocumentIds, activePacketTitle, setPacketTitle, clearPacket, removeDocument } = usePacketStore();

  function handleExport() {
    const markdownContent = `# Attorney Packet: ${activePacketTitle}
Generated on: ${new Date().toLocaleDateString()}

## Included Documents
${selectedDocumentIds.map((id) => `- Document ID: ${id}`).join("\n")}

## Case Timeline
- Review notice date, service method, response deadline, and voucher termination notices.

## Key Legal Issues
- Retaliation
- Habitability
- Section 8 owner-termination notice routing

## Verification Note
This packet contains legal information and source organization only. It is not legal advice.`;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${activePacketTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-semibold">Attorney packet builder</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Packet export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <label className="block text-sm font-semibold">
            Packet title
            <Input className="mt-2" value={activePacketTitle} onChange={(event) => setPacketTitle(event.target.value)} />
          </label>
          <div className="rounded border border-line bg-field p-4">
            <h2 className="font-semibold">Selected documents ({selectedDocumentIds.length})</h2>
            {selectedDocumentIds.length === 0 ? (
              <p className="mt-2 text-sm text-ink/65">No documents selected. Add documents from search results.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {selectedDocumentIds.map((id) => (
                  <li key={id} className="flex items-center justify-between rounded border border-line bg-paper p-3 text-sm">
                    <span className="font-mono">{id}</span>
                    <button
                      className="focus-ring rounded p-2 text-clay hover:bg-clay/10"
                      onClick={() => removeDocument(id)}
                      aria-label={`Remove ${id}`}
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExport} disabled={!selectedDocumentIds.length || !activePacketTitle.trim()}>
              <Download size={16} aria-hidden />
              Export packet
            </Button>
            <Button variant="outline" onClick={clearPacket}>
              Clear selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
