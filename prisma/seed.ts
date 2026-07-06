import { createHash } from "crypto";
import prisma from "../src/lib/db";

async function main() {
  const source = await prisma.legalSource.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "California Civil Code",
      sourceType: "statute",
      baseUrl: "https://leginfo.legislature.ca.gov",
      isOfficial: true
    }
  });

  const rawText =
    "California Civil Code Section 1942.5 prohibits a landlord from retaliating against a tenant because the tenant has complained about habitability issues or exercised lawful tenant rights.";

  const checksum = createHash("sha256").update(rawText).digest("hex");

  const doc = await prisma.legalDocument.upsert({
    where: { checksum },
    update: {},
    create: {
      sourceId: source.id,
      title: "California Civil Code Section 1942.5",
      citation: "Cal. Civ. Code § 1942.5",
      jurisdiction: "CA",
      documentType: "statute",
      sourceUrl: "https://leginfo.legislature.ca.gov",
      rawText,
      checksum
    }
  });

  await prisma.legalChunk.upsert({
    where: { id: "00000000-0000-0000-0000-000000000101" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000101",
      documentId: doc.id,
      chunkIndex: 0,
      sectionLabel: "Retaliation",
      text: rawText
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
