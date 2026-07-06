import OpenAI from "openai";
import type { LegalChunk, VerificationReport } from "@/types";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function deterministicVerify(answer: string, chunks: LegalChunk[]): VerificationReport {
  const citations = chunks.map((chunk) => chunk.citation.toLowerCase());
  const hasCitation = citations.some((citation) => answer.toLowerCase().includes(citation));

  if (!chunks.length) {
    return {
      status: "FAILED",
      issues: [
        {
          type: "UNSUPPORTED_CLAIM",
          claim: "No retrieved legal sources were available.",
          reason: "The system must refuse unsupported legal answers."
        }
      ]
    };
  }

  if (!hasCitation) {
    return {
      status: "WARNING",
      issues: [
        {
          type: "UNSUPPORTED_CLAIM",
          claim: "Answer did not include an inline citation matching retrieved source metadata.",
          reason: "Every legal claim must map to a retrieved source citation."
        }
      ]
    };
  }

  return { status: "PASSED", issues: [] };
}

export async function verifyAnswer(answer: string, chunks: LegalChunk[]): Promise<VerificationReport> {
  if (!openai) {
    return deterministicVerify(answer, chunks);
  }

  const verificationPrompt = `
You are a strict QA Legal Citation Verifier.
Verify that every claim in the generated answer is fully supported by the retrieved legal chunks.

Generated Answer:
${answer}

Retrieved Chunks:
${chunks.map((chunk) => `[ID: ${chunk.id}] ${chunk.text}`).join("\n\n")}

Return JSON only with:
{
  "status": "PASSED" | "FAILED" | "WARNING",
  "issues": [
    {
      "type": "UNSUPPORTED_CLAIM" | "MISMATCHED_JURISDICTION",
      "claim": "The claim in the answer",
      "reason": "Why it is unsupported"
    }
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: verificationPrompt }]
  });

  const content = response.choices[0].message.content ?? "{}";
  return JSON.parse(content) as VerificationReport;
}
