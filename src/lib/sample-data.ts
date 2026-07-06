import type { LegalChunk } from "@/types";

export const sampleSources: LegalChunk[] = [
  {
    id: "ca-retaliation-1942-5",
    documentId: "doc-ca-retaliation",
    documentTitle: "California Civil Code Section 1942.5",
    citation: "Cal. Civ. Code § 1942.5",
    jurisdiction: "CA",
    sectionLabel: "Retaliation",
    text:
      "A landlord may not retaliate against a tenant because the tenant complained about habitability conditions, lawfully organized, or exercised protected rights. Source support is limited to retaliation and tenant-rights activity.",
    relevanceScore: 0.94
  },
  {
    id: "ca-habitability-1941",
    documentId: "doc-ca-habitability",
    documentTitle: "California Civil Code Section 1941.1",
    citation: "Cal. Civ. Code § 1941.1",
    jurisdiction: "CA",
    sectionLabel: "Tenantability",
    text:
      "California residential rental units must substantially comply with tenantability standards, including weather protection, plumbing, heat, electrical lighting, clean grounds, and sanitary facilities.",
    relevanceScore: 0.86
  },
  {
    id: "federal-hcv-982-310",
    documentId: "doc-hcv-termination",
    documentTitle: "24 CFR 982.310",
    citation: "24 C.F.R. § 982.310",
    jurisdiction: "Federal",
    sectionLabel: "Owner termination of tenancy",
    text:
      "For Housing Choice Voucher tenancy, an owner may terminate tenancy only on grounds authorized by the lease and federal program rules, and the owner must give the PHA a copy of any owner eviction notice.",
    relevanceScore: 0.81
  }
];
