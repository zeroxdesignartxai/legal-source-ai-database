export type ToolkitTool = {
  id: string;
  name: string;
  category: string;
  description: string;
  output: string;
};

export type ConsumerAssistant = {
  id: number;
  title: string;
  category: "Debt, Credit & Finance" | "Housing & Tenant Rights";
  role: string;
  outputs: string[];
};

export const uploadLimitBytes = 900 * 1024 * 1024;
export const uploadLimitLabel = "900 MB";

export const legalEagleTools: ToolkitTool[] = [
  {
    id: "generate-nda",
    name: "Generate Custom NDA",
    category: "Core Document Functions",
    description: "Create an NDA based on party names, jurisdiction, and term length.",
    output: "Review-ready NDA draft"
  },
  {
    id: "extract-clauses",
    name: "Extract Key Clauses",
    category: "Core Document Functions",
    description: "Summarize termination, liability, confidentiality, and other key clauses from contracts or notices.",
    output: "Clause summary cards with risk categories"
  },
  {
    id: "explain-doctrine",
    name: "Explain Legal Doctrine",
    category: "Legal Research & Analysis",
    description: "Explain applicable doctrines for a tort, consumer, housing, or procedural scenario.",
    output: "Plain-English doctrine explanation"
  },
  {
    id: "key-dates-table",
    name: "Generate Key Dates Table",
    category: "Contract Management",
    description: "Extract key dates and deadlines from contracts, notices, and agency letters.",
    output: "Deadline and obligation table"
  },
  {
    id: "draft-complaint",
    name: "Draft Complaint",
    category: "Litigation & Case Support",
    description: "Draft a structured complaint from plaintiff, defendant, cause of action, and facts.",
    output: "Complaint outline and pleading starter"
  },
  {
    id: "validate-compliance",
    name: "Validate Document Compliance",
    category: "Client & Compliance Tools",
    description: "Check document text against GDPR, CCPA, and HIPAA-style compliance issues.",
    output: "Compliance issue list with severity and recommendations"
  },
  {
    id: "image-analyzer",
    name: "Image Analyzer",
    category: "Evidence Intake",
    description: "Analyze photos, screenshots, notices, habitability images, and proof exhibits.",
    output: "Evidence description and follow-up prompt"
  },
  {
    id: "omni-chat",
    name: "Omni Chat",
    category: "AI Research Interface",
    description: "Unified chat workflow with search, map, thinking-mode, voice, and sourced response concepts.",
    output: "Grounded assistant response with optional sources"
  },
  {
    id: "live-conversation",
    name: "Live Conversation",
    category: "AI Research Interface",
    description: "Voice-first intake concept for guided legal-consumer conversations.",
    output: "Conversation transcript and next-step summary"
  }
];

export const consumerAssistants: ConsumerAssistant[] = [
  { id: 1, title: "Debt Defense Draft Assistant", category: "Debt, Credit & Finance", role: "Generate letters for car loans, repossession, charge-offs, and collection accounts.", outputs: ["Strategy bullets", "Draft letter", "Next steps"] },
  { id: 2, title: "Credit Report Dispute Writer", category: "Debt, Credit & Finance", role: "Draft disputes for inaccurate Experian, Equifax, and TransUnion entries.", outputs: ["FCRA overview", "Dispute letter", "Attachments list"] },
  { id: 3, title: "Debt Validation Letter Generator", category: "Debt, Credit & Finance", role: "Create formal FDCPA debt-validation requests.", outputs: ["FDCPA explanation", "Validation letter", "30-day follow-up"] },
  { id: 4, title: "Fair Debt Collection Complaint Builder", category: "Debt, Credit & Finance", role: "Build complaints for harassment or unlawful collection activity.", outputs: ["Violation explanation", "Complaint letter", "Reporting list"] },
  { id: 5, title: "Charge-Off Challenge Writer", category: "Debt, Credit & Finance", role: "Help dispute or correct improper charge-offs.", outputs: ["Charge-off rules", "Letter draft", "Update confirmation steps"] },
  { id: 6, title: "Auto Repossession Response Assistant", category: "Debt, Credit & Finance", role: "Demand proof of lawful repossession and accounting.", outputs: ["Strategy summary", "Accounting request", "Complaint options"] },
  { id: 7, title: "Car Loan Deficiency Dispute Assistant", category: "Debt, Credit & Finance", role: "Challenge inflated deficiency balances after repossession.", outputs: ["UCC rights", "Offer letter", "Accounting checklist"] },
  { id: 8, title: "Predatory Lending Complaint Writer", category: "Debt, Credit & Finance", role: "Report lenders using deceptive or usurious loan terms.", outputs: ["Violation summary", "Complaint letter", "Reporting channels"] },
  { id: 9, title: "Loan Modification Request Assistant", category: "Debt, Credit & Finance", role: "Write hardship and modification requests for loans.", outputs: ["Hardship summary", "Draft letter", "Documentation list"] },
  { id: 10, title: "Credit Card Hardship Negotiator", category: "Debt, Credit & Finance", role: "Request hardship programs from card issuers.", outputs: ["Rights overview", "Hardship letter", "Repayment example"] },
  { id: 11, title: "Debt Settlement Offer Generator", category: "Debt, Credit & Finance", role: "Propose lump-sum settlement agreements.", outputs: ["Settlement logic", "Offer letter", "Record advice"] },
  { id: 12, title: "Billing Error Resolution Writer", category: "Debt, Credit & Finance", role: "Draft Fair Credit Billing Act dispute letters.", outputs: ["FCBA rights", "Dispute letter", "Follow-up steps"] },
  { id: 13, title: "Bank Fee Refund Request Assistant", category: "Debt, Credit & Finance", role: "Draft goodwill refund letters for overdraft or late fees.", outputs: ["Strategy note", "Refund letter", "Follow-up message"] },
  { id: 14, title: "CFPB Complaint Draft Assistant", category: "Debt, Credit & Finance", role: "Generate ready-to-submit CFPB complaints.", outputs: ["Complaint text", "Filing instructions", "Tracking plan"] },
  { id: 15, title: "Credit Freeze & Security Alert Helper", category: "Debt, Credit & Finance", role: "Write requests to place fraud alerts or credit freezes.", outputs: ["Freeze vs alert explanation", "Request letter", "Bureau list"] },
  { id: 16, title: "Tenant Rights Complaint Assistant", category: "Housing & Tenant Rights", role: "Draft complaints about unsafe or illegal housing conditions.", outputs: ["Rights overview", "Complaint letter", "Evidence checklist"] },
  { id: 17, title: "Habitability Demand Letter Assistant", category: "Housing & Tenant Rights", role: "Request urgent repairs from a landlord.", outputs: ["Duty to repair", "Demand letter", "Timeline chart"] },
  { id: 18, title: "Security Deposit Recovery Writer", category: "Housing & Tenant Rights", role: "Demand refund of deposit after move-out.", outputs: ["Timeline overview", "Refund letter", "Small-claims checklist"] },
  { id: 19, title: "Rent Increase Challenge Builder", category: "Housing & Tenant Rights", role: "Challenge unfair rent hikes under rent-stabilization rules.", outputs: ["Rights overview", "Challenge letter", "Escalation guide"] },
  { id: 20, title: "Illegal Eviction Defense Assistant", category: "Housing & Tenant Rights", role: "Respond to unlawful evictions or lockouts.", outputs: ["Legal explanation", "Response letter", "Emergency contacts"] },
  { id: 21, title: "Section 8 / Subsidized Housing Complaint Writer", category: "Housing & Tenant Rights", role: "Draft complaints for Section 8 mismanagement or discrimination.", outputs: ["Rights summary", "Complaint draft", "Agency contacts"] },
  { id: 22, title: "Reasonable Accommodation Request Builder", category: "Housing & Tenant Rights", role: "Create disability accommodation requests in housing or employment.", outputs: ["ADA/FHA overview", "Request letter", "Follow-up steps"] },
  { id: 23, title: "Landlord Neglect Report Generator", category: "Housing & Tenant Rights", role: "Prepare reports of landlord neglect or health code violations.", outputs: ["Report process", "Report template", "Agency submission info"] },
  { id: 24, title: "Property Management Fraud Complaint Assistant", category: "Housing & Tenant Rights", role: "Report fraudulent property managers.", outputs: ["Fraud definition", "Complaint letter", "Authorities to notify"] },
  { id: 25, title: "Housing Discrimination Complaint Writer", category: "Housing & Tenant Rights", role: "Draft housing discrimination complaints.", outputs: ["Fair Housing Act explanation", "Complaint draft", "HUD submission info"] }
];
