const sources = [
  {
    id: "doc-ca-retaliation",
    title: "California Civil Code Section 1942.5",
    citation: "Cal. Civ. Code § 1942.5",
    text:
      "A landlord may not retaliate against a tenant because the tenant complained about habitability conditions or exercised protected tenant rights."
  },
  {
    id: "doc-ca-habitability",
    title: "California Civil Code Section 1941.1",
    citation: "Cal. Civ. Code § 1941.1",
    text:
      "California residential rental units must substantially comply with tenantability standards, including plumbing, heat, electrical lighting, and sanitary facilities."
  },
  {
    id: "doc-hcv-termination",
    title: "24 CFR 982.310",
    citation: "24 C.F.R. § 982.310",
    text:
      "For Housing Choice Voucher tenancy, an owner must give the PHA a copy of any owner eviction notice."
  }
];

const packetDocs = new Set(["doc-ca-retaliation", "doc-hcv-termination"]);

function renderSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("searchResults");
  const terms = query.split(/\W+/).filter(Boolean);
  const matches = sources.filter((source) =>
    terms.some((term) => `${source.title} ${source.citation} ${source.text}`.toLowerCase().includes(term))
  );

  results.innerHTML = matches.length
    ? matches
        .map(
          (source) => `<article>
            <h3>${source.title}</h3>
            <p class="citation">${source.citation}</p>
            <p>${source.text}</p>
            <button class="button" data-add="${source.id}" type="button">Add to packet</button>
          </article>`
        )
        .join("")
    : "<article>No verified source matched those filters.</article>";

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      packetDocs.add(button.dataset.add);
      renderPacket();
    });
  });
}

function renderPacket() {
  const list = document.getElementById("packetDocs");
  list.innerHTML = Array.from(packetDocs)
    .map((id) => `<li><code>${id}</code></li>`)
    .join("");
}

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  document.getElementById("fileLabel").textContent = file ? file.name : "Choose a PDF, TXT, or DOCX file up to 10MB";
});

document.getElementById("uploadButton").addEventListener("click", () => {
  const file = document.getElementById("fileInput").files[0];
  const result = document.getElementById("uploadResult");
  if (!file) {
    result.textContent = "Select a document before uploading.";
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    result.textContent = "File exceeds 10MB limit.";
    return;
  }
  result.textContent = `Document accepted for parsing: ${file.name}`;
});

document.getElementById("searchInput").addEventListener("input", renderSearch);

document.getElementById("askButton").addEventListener("click", () => {
  const question = document.getElementById("questionInput").value.toLowerCase();
  const answer = document.getElementById("answerResult");
  if (question.length < 8) {
    answer.textContent = "Question must be at least 8 characters.";
    return;
  }
  answer.innerHTML = `<h3>Direct answer</h3>
    <p>California source support indicates that a landlord may not retaliate against a tenant for complaining about habitability conditions or exercising protected tenant rights. <span class="citation">(Cal. Civ. Code § 1942.5)</span></p>
    <h3>Citation verifier</h3>
    <p>PASSED. This demo answer is limited to the displayed seed source. The full Next.js app includes the API verifier.</p>`;
});

document.getElementById("exportButton").addEventListener("click", () => {
  const title = document.getElementById("packetTitle").value || "Attorney Packet";
  const content = `# ${title}\n\n${Array.from(packetDocs)
    .map((id) => `- ${id}`)
    .join("\n")}\n\nLegal information only. Verify before filing.`;
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
});

renderSearch();
renderPacket();
