# Legal Source AI Database

Source-first California tenant and Section 8 legal research MVP built with Next.js, TypeScript, Prisma, PostgreSQL, and pgvector.

## Run locally

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`.
3. Set `OPENAI_API_KEY` for live embeddings and answer verification.
4. Run:

```powershell
npm install
npm run prisma:generate
npm run dev
```

The app runs at `http://localhost:3000`.

## Deployment

The project is Vercel-ready. Configure `DATABASE_URL`, `OPENAI_API_KEY`, `NEXT_PUBLIC_APP_NAME`, and `NEXT_PUBLIC_APP_URL` in Vercel project settings.
