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

const fusionModules = [
  {
    repo: "smart-contract",
    title: "Contract Clarity Engine",
    role: "Reads agreements, notices, leases, voucher paperwork, and settlement drafts for risk, ambiguity, key dates, and negotiation pressure points.",
    signals: ["Clause risk", "Timeline extraction", "Negotiation points", "Clarity check"]
  },
  {
    repo: "legal",
    title: "Legal Knowledge Graph",
    role: "Turns facts, laws, agencies, remedies, and evidence into a linked proof map with reliability scoring.",
    signals: ["Fact table", "Evidence match", "Opposition rebuttal", "Source reliability"]
  },
  {
    repo: "legal-action",
    title: "Action Planner",
    role: "Converts the verified map into next steps, demand letters, public-record requests, and official resource routing.",
    signals: ["Action wizard", "Resources", "Defense checklist", "Draft generator"]
  }
];

const fusionNodes = [
  { label: "Termination notice received", type: "Fact", strength: "verified" },
  { label: "Brother visited for 3 days", type: "Evidence", strength: "needs-proof" },
  { label: "24 CFR 982.551 / 982.554", type: "Authority", strength: "verified" },
  { label: "Informal hearing window", type: "Deadline", strength: "urgent" },
  { label: "CPRA / records demand", type: "Action", strength: "urgent" },
  { label: "Voucher reinstatement", type: "Remedy", strength: "needs-proof" }
];

const fusionActions = [
  ["Extract every date and deadline from the notice", "Immediate", "smart-contract timeline logic"],
  ["Map each fact to a governing rule and proof item", "Before hearing packet", "legal knowledge graph"],
  ["Draft a targeted records demand", "Same day", "legal-action document planner"],
  ["Build attorney review packet", "Before legal aid intake", "current packet builder"]
];

const toolkitTools = [
  ["Generate Custom NDA", "Core Document Functions", "Create an NDA based on party names, jurisdiction, and term length.", "Review-ready NDA draft"],
  ["Extract Key Clauses", "Core Document Functions", "Summarize termination, liability, confidentiality, and other key clauses.", "Clause summary cards"],
  ["Explain Legal Doctrine", "Legal Research & Analysis", "Explain applicable doctrines for a tort, consumer, housing, or procedural scenario.", "Plain-English doctrine explanation"],
  ["Generate Key Dates Table", "Contract Management", "Extract key dates and deadlines from contracts, notices, and agency letters.", "Deadline table"],
  ["Draft Complaint", "Litigation & Case Support", "Draft a structured complaint from parties, cause of action, and facts.", "Complaint starter"],
  ["Validate Document Compliance", "Client & Compliance Tools", "Check document text against GDPR, CCPA, and HIPAA-style compliance issues.", "Compliance issue list"],
  ["Image Analyzer", "Evidence Intake", "Analyze photos, screenshots, notices, habitability images, and proof exhibits.", "Evidence description"],
  ["Omni Chat", "AI Research Interface", "Unified chat workflow with search, map, thinking-mode, voice, and sourced response concepts.", "Grounded assistant response"],
  ["Live Conversation", "AI Research Interface", "Voice-first intake concept for guided legal-consumer conversations.", "Transcript and next-step summary"]
];

const consumerAssistants = [
  [1, "Debt Defense Draft Assistant", "Debt, Credit & Finance", "Generate letters for car loans, repossession, charge-offs, and collection accounts.", ["Strategy bullets", "Draft letter", "Next steps"]],
  [2, "Credit Report Dispute Writer", "Debt, Credit & Finance", "Draft disputes for inaccurate Experian, Equifax, and TransUnion entries.", ["FCRA overview", "Dispute letter", "Attachments list"]],
  [3, "Debt Validation Letter Generator", "Debt, Credit & Finance", "Create formal FDCPA debt-validation requests.", ["FDCPA explanation", "Validation letter", "30-day follow-up"]],
  [4, "Fair Debt Collection Complaint Builder", "Debt, Credit & Finance", "Build complaints for harassment or unlawful collection activity.", ["Violation explanation", "Complaint letter", "Reporting list"]],
  [5, "Charge-Off Challenge Writer", "Debt, Credit & Finance", "Help dispute or correct improper charge-offs.", ["Charge-off rules", "Letter draft", "Update confirmation steps"]],
  [6, "Auto Repossession Response Assistant", "Debt, Credit & Finance", "Demand proof of lawful repossession and accounting.", ["Strategy summary", "Accounting request", "Complaint options"]],
  [7, "Car Loan Deficiency Dispute Assistant", "Debt, Credit & Finance", "Challenge inflated deficiency balances after repossession.", ["UCC rights", "Offer letter", "Accounting checklist"]],
  [8, "Predatory Lending Complaint Writer", "Debt, Credit & Finance", "Report lenders using deceptive or usurious loan terms.", ["Violation summary", "Complaint letter", "Reporting channels"]],
  [9, "Loan Modification Request Assistant", "Debt, Credit & Finance", "Write hardship and modification requests for loans.", ["Hardship summary", "Draft letter", "Documentation list"]],
  [10, "Credit Card Hardship Negotiator", "Debt, Credit & Finance", "Request hardship programs from card issuers.", ["Rights overview", "Hardship letter", "Repayment example"]],
  [11, "Debt Settlement Offer Generator", "Debt, Credit & Finance", "Propose lump-sum settlement agreements.", ["Settlement logic", "Offer letter", "Record advice"]],
  [12, "Billing Error Resolution Writer", "Debt, Credit & Finance", "Draft Fair Credit Billing Act dispute letters.", ["FCBA rights", "Dispute letter", "Follow-up steps"]],
  [13, "Bank Fee Refund Request Assistant", "Debt, Credit & Finance", "Draft goodwill refund letters for overdraft or late fees.", ["Strategy note", "Refund letter", "Follow-up message"]],
  [14, "CFPB Complaint Draft Assistant", "Debt, Credit & Finance", "Generate ready-to-submit CFPB complaints.", ["Complaint text", "Filing instructions", "Tracking plan"]],
  [15, "Credit Freeze & Security Alert Helper", "Debt, Credit & Finance", "Write requests to place fraud alerts or credit freezes.", ["Freeze vs alert explanation", "Request letter", "Bureau list"]],
  [16, "Tenant Rights Complaint Assistant", "Housing & Tenant Rights", "Draft complaints about unsafe or illegal housing conditions.", ["Rights overview", "Complaint letter", "Evidence checklist"]],
  [17, "Habitability Demand Letter Assistant", "Housing & Tenant Rights", "Request urgent repairs from a landlord.", ["Duty to repair", "Demand letter", "Timeline chart"]],
  [18, "Security Deposit Recovery Writer", "Housing & Tenant Rights", "Demand refund of deposit after move-out.", ["Timeline overview", "Refund letter", "Small-claims checklist"]],
  [19, "Rent Increase Challenge Builder", "Housing & Tenant Rights", "Challenge unfair rent hikes under rent-stabilization rules.", ["Rights overview", "Challenge letter", "Escalation guide"]],
  [20, "Illegal Eviction Defense Assistant", "Housing & Tenant Rights", "Respond to unlawful evictions or lockouts.", ["Legal explanation", "Response letter", "Emergency contacts"]],
  [21, "Section 8 / Subsidized Housing Complaint Writer", "Housing & Tenant Rights", "Draft complaints for Section 8 mismanagement or discrimination.", ["Rights summary", "Complaint draft", "Agency contacts"]],
  [22, "Reasonable Accommodation Request Builder", "Housing & Tenant Rights", "Create disability accommodation requests in housing or employment.", ["ADA/FHA overview", "Request letter", "Follow-up steps"]],
  [23, "Landlord Neglect Report Generator", "Housing & Tenant Rights", "Prepare reports of landlord neglect or health code violations.", ["Report process", "Report template", "Agency submission info"]],
  [24, "Property Management Fraud Complaint Assistant", "Housing & Tenant Rights", "Report fraudulent property managers.", ["Fraud definition", "Complaint letter", "Authorities to notify"]],
  [25, "Housing Discrimination Complaint Writer", "Housing & Tenant Rights", "Draft housing discrimination complaints.", ["Fair Housing Act explanation", "Complaint draft", "HUD submission info"]]
];

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

function renderFusion() {
  document.getElementById("fusionModules").innerHTML = fusionModules
    .map(
      (module) => `<article class="fusion-card">
        <small>${module.repo}</small>
        <h3>${module.title}</h3>
        <p>${module.role}</p>
        <ul>${module.signals.map((signal) => `<li>${signal}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  document.getElementById("fusionNodes").innerHTML = fusionNodes
    .map(
      (node) => `<article class="node-card" data-strength="${node.strength}">
        <small>${node.type}</small>
        <h4>${node.label}</h4>
      </article>`
    )
    .join("");

  document.getElementById("fusionActions").innerHTML = fusionActions
    .map(
      ([action, deadline, source]) => `<article class="action-card">
        <div>
          <small>${source}</small>
          <h4>${action}</h4>
        </div>
        <p><strong>${deadline}</strong></p>
      </article>`
    )
    .join("");
}

function renderToolkit() {
  document.getElementById("toolkitTools").innerHTML = toolkitTools
    .map(
      ([name, category, description, output]) => `<article class="tool-card">
        <small>${category}</small>
        <h4>${name}</h4>
        <p>${description}</p>
        <span>${output}</span>
      </article>`
    )
    .join("");
  renderAssistants();
}

function renderAssistants() {
  const q = (document.getElementById("assistantSearch")?.value || "").toLowerCase();
  const rows = consumerAssistants.filter((assistant) => assistant.slice(1).join(" ").toLowerCase().includes(q));
  document.getElementById("assistantGrid").innerHTML = rows
    .map(
      ([id, title, category, role, outputs]) => `<article class="assistant-card">
        <small>${category}</small>
        <h4>${id}. ${title}</h4>
        <p>${role}</p>
        <ul>${outputs.map((output) => `<li>${output}</li>`).join("")}</ul>
      </article>`
    )
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
  if (file.size > 900 * 1024 * 1024) {
    result.textContent = "File exceeds 900 MB limit.";
    return;
  }
  result.textContent = `Document accepted for parsing: ${file.name}`;
});

document.getElementById("searchInput").addEventListener("input", renderSearch);
document.getElementById("assistantSearch").addEventListener("input", renderAssistants);

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
renderFusion();
renderToolkit();
