"use client";

import { useState } from "react";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UploadResult = {
  id?: string;
  title?: string;
  checksum?: string;
  status?: string;
  error?: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jurisdiction, setJurisdiction] = useState("CA");
  const [result, setResult] = useState<UploadResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function submitUpload() {
    if (!file) {
      setResult({ error: "Select a PDF, text, or DOCX file before uploading." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jurisdiction", jurisdiction);
    setIsUploading(true);
    setResult(null);

    try {
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as UploadResult;
      setResult(payload);
    } catch {
      setResult({ error: "Upload failed. Check the local server and try again." });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-semibold">Upload legal documents</h1>
      <p className="mt-2 text-ink/68">Files are checked for size, type, duplicates, and checksum before persistence.</p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Document intake</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-line bg-field px-6 text-center">
            <FileUp className="text-pine" size={34} aria-hidden />
            <span className="mt-3 font-semibold">{file ? file.name : "Choose a document"}</span>
            <span className="mt-1 text-sm text-ink/62">PDF, TXT, or DOCX up to 10MB</span>
            <input
              className="sr-only"
              type="file"
              accept=".pdf,.txt,.docx,text/plain,application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <label className="block text-sm font-semibold">
            Jurisdiction
            <select
              className="focus-ring mt-2 min-h-10 w-full rounded border border-line bg-white px-3 text-sm"
              value={jurisdiction}
              onChange={(event) => setJurisdiction(event.target.value)}
            >
              <option value="CA">California</option>
              <option value="Federal">Federal</option>
              <option value="Local">Local</option>
            </select>
          </label>
          <Button onClick={submitUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload and parse"}
          </Button>
          {result && (
            <div className={`rounded border p-4 text-sm ${result.error ? "border-clay bg-clay/10" : "border-pine bg-pine/10"}`}>
              {result.error ? (
                result.error
              ) : (
                <div>
                  <p className="font-semibold">Document uploaded successfully. Parsing in progress...</p>
                  <p className="mt-2">Checksum: {result.checksum}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
