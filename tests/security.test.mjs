import test from "node:test";
import assert from "node:assert/strict";

function sanitizeText(input) {
  return input
    .replace(/<\/?script[\s\S]*?>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\u0000/g, "")
    .trim();
}

test("sanitizeText strips script tags and inline handlers", () => {
  const clean = sanitizeText('<script>alert(1)</script><p onclick="bad()">Notice</p>');
  assert.equal(clean.includes("<script>"), false);
  assert.equal(clean.includes("onclick"), false);
});

test("sanitizeText removes null bytes", () => {
  assert.equal(sanitizeText("abc\u0000def"), "abcdef");
});
