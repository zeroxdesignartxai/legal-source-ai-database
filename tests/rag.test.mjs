import test from "node:test";
import assert from "node:assert/strict";

const retaliationSource = {
  id: "ca-retaliation-1942-5",
  documentId: "doc-ca-retaliation",
  documentTitle: "California Civil Code Section 1942.5",
  citation: "Cal. Civ. Code § 1942.5",
  jurisdiction: "CA",
  sectionLabel: "Retaliation",
  text: "A landlord may not retaliate against a tenant because the tenant complained about habitability conditions.",
  relevanceScore: 0.94
};

function deterministicVerify(answer, chunks) {
  const citations = chunks.map((chunk) => chunk.citation.toLowerCase());
  const hasCitation = citations.some((citation) => answer.toLowerCase().includes(citation));

  if (!chunks.length) {
    return { status: "FAILED", issues: [{ type: "UNSUPPORTED_CLAIM" }] };
  }

  if (!hasCitation) {
    return { status: "WARNING", issues: [{ type: "UNSUPPORTED_CLAIM" }] };
  }

  return { status: "PASSED", issues: [] };
}

test("citation verifier passes answers containing retrieved citation", () => {
  const report = deterministicVerify("This is supported. (Cal. Civ. Code § 1942.5)", [retaliationSource]);
  assert.equal(report.status, "PASSED");
});

test("citation verifier fails empty source set", () => {
  const report = deterministicVerify("Unsupported answer", []);
  assert.equal(report.status, "FAILED");
});

test("citation verifier warns when citation is missing", () => {
  const report = deterministicVerify("This answer lacks a citation.", [retaliationSource]);
  assert.equal(report.status, "WARNING");
});
