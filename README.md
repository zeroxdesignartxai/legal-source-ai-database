# Legal Source AI Database

Source-first California tenant, Section 8, court-document, and consumer-law research MVP built with Next.js, TypeScript, Prisma, PostgreSQL, and pgvector.

This system provides legal information and document organization support. It is not a lawyer, does not create an attorney-client relationship, and should not be used as a substitute for advice from a licensed attorney.

## Install

```powershell
cd "E:\legal app"
$env:PATH = "E:\.codex\node-v20;$env:PATH"
npm install
npm run prisma:generate
```

## Environment

Copy `.env.example` to `.env` and set:

```text
DATABASE_URL=
OPENAI_API_KEY=
COURTLISTENER_API_KEY=
GOVINFO_API_KEY=
NEXT_PUBLIC_APP_NAME="Legal Source AI Database"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database

Start Postgres with pgvector:

```powershell
docker compose up -d db
npm run prisma:migrate
npm run prisma:seed
```

The SQL migration is in `prisma/migrations/0001_init/migration.sql`.

## Run

```powershell
npm run dev
```

Open `http://localhost:3000`.

## Uploads

The upload route accepts authorized legal documents and evidence bundles up to `900 MB`:

- PDF
- TXT
- DOCX
- HTML/text
- images
- video
- ZIP evidence bundles

Uploaded files are validated by size/type, hashed with SHA-256, parsed into safe text or metadata, chunked, and stored without executing file content.

## RAG Pipeline

1. Classify jurisdiction and topic.
2. Search trusted legal sources and user uploads.
3. Rank source chunks by relevance and authority.
4. Generate answers only from retrieved chunks.
5. Verify citations and unsupported claims.
6. Refuse unsafe answers when source support is missing.

Required refusal:

```text
I do not have enough verified source support to answer that safely.
```

## API Routes

- `POST /api/documents/upload`
- `POST /api/documents/parse`
- `POST /api/documents/chunk`
- `POST /api/documents/embed`
- `GET /api/search`
- `POST /api/ask`
- `POST /api/verify`
- `POST /api/packet`
- `GET /api/sources`
- `POST /api/sources/sync`

## Trusted Source Connectors

Connector registry lives at `src/lib/source-connectors.ts`.

Current connectors:

- CourtListener / Free Law Project
- GovInfo
- eCFR
- Federal Register
- California Legislative Information
- User uploads

Connectors are registered as authorized API/user-upload sources only. The app does not scrape restricted databases.

## UI

- `/`
- `/dashboard`
- `/upload`
- `/search`
- `/ask`
- `/documents/[id]`
- `/answers/[id]`
- `/fusion`
- `/toolkit`
- `/packet-builder`
- `/settings/sources`

## Attorney Packet

`POST /api/packet` and `/packet-builder` generate Markdown packets with:

- timeline
- issue chart
- document list
- evidence/exhibit list
- questions for lawyer
- missing documents checklist
- source list

## Tests

```powershell
node --test tests/*.test.mjs
npm run typecheck
```

Coverage includes chunking, jurisdiction detection, source connector registration, unsupported-claim refusal behavior, citation checking, packet generation, static deployment content, and 900 MB upload rules.

## Deployment

The full Next.js source is pushed to GitHub. The static GitHub Pages fallback is generated from `deploy-static` and published through the `gh-pages` branch.
