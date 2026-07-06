export type SourceConnector = {
  id: string;
  name: string;
  sourceType: string;
  baseUrl: string;
  official: boolean;
  requiresApiKey: boolean;
  description: string;
  syncMode: "api" | "user-upload";
};

export const trustedSourceConnectors: SourceConnector[] = [
  {
    id: "courtlistener",
    name: "CourtListener / Free Law Project",
    sourceType: "court_opinion",
    baseUrl: "https://www.courtlistener.com/api/rest/v4/",
    official: false,
    requiresApiKey: true,
    description: "Case law and court metadata connector for public legal decisions.",
    syncMode: "api"
  },
  {
    id: "govinfo",
    name: "GovInfo",
    sourceType: "agency_guidance",
    baseUrl: "https://api.govinfo.gov/",
    official: true,
    requiresApiKey: true,
    description: "Official federal publication and metadata source from the U.S. Government Publishing Office.",
    syncMode: "api"
  },
  {
    id: "ecfr",
    name: "eCFR",
    sourceType: "regulation",
    baseUrl: "https://www.ecfr.gov/api/",
    official: true,
    requiresApiKey: false,
    description: "Official current federal regulations API.",
    syncMode: "api"
  },
  {
    id: "federal-register",
    name: "Federal Register",
    sourceType: "agency_guidance",
    baseUrl: "https://www.federalregister.gov/api/v1/",
    official: true,
    requiresApiKey: false,
    description: "Public API for federal rules, notices, and proposed rules.",
    syncMode: "api"
  },
  {
    id: "california-leginfo",
    name: "California Legislative Information",
    sourceType: "statute",
    baseUrl: "https://leginfo.legislature.ca.gov/",
    official: true,
    requiresApiKey: false,
    description: "Official California code and bill information source.",
    syncMode: "api"
  },
  {
    id: "user-uploads",
    name: "User uploads",
    sourceType: "user_upload",
    baseUrl: "local://uploads",
    official: false,
    requiresApiKey: false,
    description: "Authorized PDFs, notices, complaints, emails, photos, and court documents uploaded by the user.",
    syncMode: "user-upload"
  }
];

export function getConnector(id: string): SourceConnector | undefined {
  return trustedSourceConnectors.find((connector) => connector.id === id);
}
