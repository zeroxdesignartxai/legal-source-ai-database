import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("static deployment includes toolkit and 900 MB upload limit", () => {
  const html = readFileSync("deploy-static/index.html", "utf8");
  const script = readFileSync("deploy-static/app.js", "utf8");
  assert.match(html, /id="toolkit"/);
  assert.match(html, /900 MB/);
  assert.match(script, /900 \* 1024 \* 1024/);
});

test("static toolkit includes Legal Eagle and consumer assistant functions", () => {
  const script = readFileSync("deploy-static/app.js", "utf8");
  assert.match(script, /Generate Custom NDA/);
  assert.match(script, /Validate Document Compliance/);
  assert.match(script, /Omni Chat/);
  assert.match(script, /Image Analyzer/);
  assert.match(script, /Section 8 \/ Subsidized Housing Complaint Writer/);
  assert.match(script, /Housing Discrimination Complaint Writer/);
});

test("static deployment exposes source RAG builder surface", () => {
  const html = readFileSync("deploy-static/index.html", "utf8");
  const script = readFileSync("deploy-static/app.js", "utf8");
  assert.match(html, /id="rag-system"/);
  assert.match(script, /CourtListener \/ Free Law Project/);
  assert.match(script, /POST \/api\/documents\/chunk/);
  assert.match(script, /POST \/api\/verify/);
});
