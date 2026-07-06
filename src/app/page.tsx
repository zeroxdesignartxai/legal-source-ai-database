import Link from "next/link";
import { ArrowRight, CheckCircle2, FileUp, SearchCheck } from "lucide-react";
import { sampleSources } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <div>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-ink md:text-6xl">
              Fight Eviction with Verified Facts, Not Guesswork.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
              Upload notices, extract source-backed issues, ask California tenant and Section 8 questions, and build
              an attorney packet with citations that can be checked.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="focus-ring rounded bg-pine px-5 py-3 text-sm font-semibold text-paper" href="/upload">
                Upload your notice
              </Link>
              <Link className="focus-ring rounded border border-line px-5 py-3 text-sm font-semibold" href="/ask">
                Ask a source-backed question
              </Link>
            </div>
          </div>
          <div className="rounded border border-line bg-field p-5 shadow-soft">
            <div className="rounded bg-paper p-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-semibold">Verification workflow</span>
                <SearchCheck className="text-pine" size={22} aria-hidden />
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  "Restrict answers to ingested sources",
                  "Generate citations inline",
                  "Run citation verifier before display",
                  "Export a packet for legal aid review"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="text-pine" size={18} aria-hidden />
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-field">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3">
          {sampleSources.map((source) => (
            <article key={source.id} className="rounded border border-line bg-paper p-5">
              <p className="text-sm font-semibold text-pine">{source.citation}</p>
              <h2 className="mt-2 text-lg font-semibold">{source.sectionLabel}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{source.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Build the attorney packet as evidence develops.</h2>
            <p className="mt-2 text-ink/68">Keep documents, answer reports, and source tables reviewable.</p>
          </div>
          <Link className="focus-ring inline-flex items-center gap-2 rounded bg-clay px-5 py-3 text-sm font-semibold text-paper" href="/packet-builder">
            Open packet builder <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
