"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CitationVerifierReport } from "@/components/CitationVerifierReport";
import { SourceTable } from "@/components/SourceTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LegalChunk, VerificationReport } from "@/types";

type AskResult = {
  answerId?: string;
  answer?: string;
  citations?: LegalChunk[];
  verificationReport?: VerificationReport;
  error?: string;
};

export default function AskPage() {
  const [question, setQuestion] = useState("Can my landlord evict me for complaining about mold?");
  const [jurisdiction, setJurisdiction] = useState("CA");
  const [result, setResult] = useState<AskResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitQuestion() {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, jurisdiction, topic: "habitability" })
      });
      setResult((await response.json()) as AskResult);
    } catch {
      setResult({ error: "The ask endpoint could not be reached." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
      <section>
        <h1 className="text-3xl font-semibold">Ask verified sources</h1>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Legal information query</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="focus-ring min-h-32 w-full rounded border border-line bg-white p-3 text-sm"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <select
                className="focus-ring min-h-10 rounded border border-line bg-white px-3 text-sm"
                value={jurisdiction}
                onChange={(event) => setJurisdiction(event.target.value)}
              >
                <option value="CA">California</option>
                <option value="Federal">Federal</option>
              </select>
              <Button onClick={submitQuestion} disabled={loading || question.trim().length < 8}>
                <Send size={16} aria-hidden />
                {loading ? "Verifying..." : "Ask"}
              </Button>
            </div>
          </CardContent>
        </Card>
        {result?.error && <div className="mt-5 rounded border border-clay bg-clay/10 p-4">{result.error}</div>}
        {result?.answer && (
          <article className="mt-5 rounded border border-line bg-paper p-5">
            <div className="prose max-w-none whitespace-pre-wrap text-sm leading-7 text-ink">{result.answer}</div>
            {result.verificationReport && (
              <div className="mt-5">
                <CitationVerifierReport report={result.verificationReport} />
              </div>
            )}
          </article>
        )}
      </section>
      <aside>
        <h2 className="text-lg font-semibold">Retrieved sources</h2>
        <div className="mt-4">
          {result?.citations?.length ? (
            <SourceTable sources={result.citations} />
          ) : (
            <div className="rounded border border-line bg-field p-4 text-sm text-ink/68">
              Sources appear here after a verified query.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
