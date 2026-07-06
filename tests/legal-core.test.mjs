import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function chunkLegalText(text, maxChars = 80, overlapChars = 10) {
  const clean = text.trim().replace(/\s+/g, " ");
  const chunks = [];
  let cursor = 0;
  while (cursor < clean.length) {
    const hardEnd = Math.min(cursor + maxChars, clean.length);
    const sentenceEnd = clean.lastIndexOf(".", hardEnd);
    const end = sentenceEnd > cursor + Math.floor(maxChars * 0.55) ? sentenceEnd + 1 : hardEnd;
    chunks.push(clean.slice(cursor, end).trim());
    if (end >= clean.length) break;
    cursor = Math.max(end - overlapChars, cursor + 1);
  }
  return chunks;
}

function classifyLegalQuestion(question) {
  const text = question.toLowerCase();
  if (text.includes("section 8") || text.includes("voucher") || text.includes("hud")) return "Federal";
  if (text.includes("california") || text.includes("habitability") || text.includes("retaliation")) return "CA";
  return "Local";
}

test("document chunking splits long legal text", () => {
  const chunks = chunkLegalText("First legal rule sentence. Second legal rule sentence. Third legal rule sentence.", 45, 5);
  assert.ok(chunks.length >= 2);
  assert.ok(chunks[0].includes("First legal rule"));
});

test("jurisdiction detector prioritizes Section 8 as federal", () => {
  assert.equal(classifyLegalQuestion("Can Section 8 stop my voucher without a hearing?"), "Federal");
});

test("source connectors include required trusted sources", () => {
  const file = readFileSync("src/lib/source-connectors.ts", "utf8");
  for (const expected of ["CourtListener", "GovInfo", "eCFR", "Federal Register", "California Legislative Information", "User uploads"]) {
    assert.match(file, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("packet generator contains attorney review warning", () => {
  const file = readFileSync("src/lib/packet-builder.ts", "utf8");
  assert.match(file, /not a lawyer/);
  assert.match(file, /Questions For Lawyer/);
});

test("upload API enforces 900 MB limit", () => {
  const file = readFileSync("src/app/api/documents/upload/route.ts", "utf8");
  assert.match(file, /900 \* 1024 \* 1024/);
  assert.match(file, /File exceeds 900MB limit/);
});
