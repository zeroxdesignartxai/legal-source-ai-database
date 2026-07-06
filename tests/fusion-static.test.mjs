import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("static deployment includes fusion command center anchors", () => {
  const html = readFileSync("deploy-static/index.html", "utf8");
  assert.match(html, /id="fusion"/);
  assert.match(html, /Legal Command Center/);
  assert.match(html, /fusionModules/);
  assert.match(html, /fusionNodes/);
  assert.match(html, /fusionActions/);
});

test("static fusion script includes all imported repo modules", () => {
  const script = readFileSync("deploy-static/app.js", "utf8");
  assert.match(script, /smart-contract/);
  assert.match(script, /legal-action/);
  assert.match(script, /Legal Knowledge Graph/);
});
