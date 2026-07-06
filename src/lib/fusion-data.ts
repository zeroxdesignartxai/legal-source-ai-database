export type FusionNode = {
  id: string;
  label: string;
  type: "Fact" | "Evidence" | "Authority" | "Deadline" | "Action" | "Remedy";
  strength: "verified" | "needs-proof" | "urgent";
};

export type FusionAction = {
  action: string;
  source: string;
  deadline: string;
  output: string;
};

export const fusionModules = [
  {
    repo: "smart-contract",
    title: "Contract Clarity Engine",
    role: "Reads agreements, notices, leases, voucher paperwork, and settlement drafts for risk, ambiguity, key dates, and negotiation pressure points.",
    signals: ["Clause risk", "Timeline extraction", "Negotiation points", "Plain-English clarity check"]
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
    signals: ["Action wizard", "Resource directory", "Defense checklist", "Draft generator"]
  }
];

export const fusionNodes: FusionNode[] = [
  { id: "notice", label: "Termination notice received", type: "Fact", strength: "verified" },
  { id: "guest", label: "Brother visited for 3 days", type: "Evidence", strength: "needs-proof" },
  { id: "cfr982", label: "24 CFR 982.551 / 982.554", type: "Authority", strength: "verified" },
  { id: "hearing", label: "Informal hearing window", type: "Deadline", strength: "urgent" },
  { id: "cpra", label: "CPRA / records demand", type: "Action", strength: "urgent" },
  { id: "reinstatement", label: "Voucher reinstatement", type: "Remedy", strength: "needs-proof" }
];

export const fusionActions: FusionAction[] = [
  {
    action: "Extract every date and deadline from the notice",
    source: "smart-contract timeline logic",
    deadline: "Immediate",
    output: "Deadline card for hearing, response, and evidence exchange"
  },
  {
    action: "Map each fact to a governing rule and proof item",
    source: "legal knowledge graph",
    deadline: "Before filing or hearing packet",
    output: "Fact-law-evidence matrix with confidence score"
  },
  {
    action: "Draft a targeted records demand",
    source: "legal-action document planner",
    deadline: "Same day",
    output: "CPRA / agency-file request for investigator logs and exhibits"
  },
  {
    action: "Build attorney review packet",
    source: "current Legal Source AI packet builder",
    deadline: "Before legal aid intake",
    output: "Markdown packet with citations, risk flags, and source table"
  }
];

export const fusedScenario = {
  title: "Section 8 Voucher Defense Stack",
  confidence: 88,
  shortAnswer:
    "The strongest path is to challenge the termination on procedural notice, guest-status evidence, and source-backed HUD hearing protections while requesting the full agency evidence file.",
  imports: [
    "Contract Analyzer: notice clarity, key dates, ambiguity, negotiation risk",
    "Legal Graph: facts, authorities, evidence strength, opposition rebuttals",
    "Legal Action: demand letter, resource routing, defense checklist"
  ]
};
