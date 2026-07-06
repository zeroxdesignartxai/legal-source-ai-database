"use client";

import { useMemo, useState } from "react";
import { Bot, FileSearch, Image, Mic, Search, ShieldCheck } from "lucide-react";
import { consumerAssistants, legalEagleTools, uploadLimitLabel } from "@/lib/toolkit-data";

export default function ToolkitPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(consumerAssistants.map((assistant) => assistant.category)))];
  const filteredAssistants = useMemo(() => {
    const q = query.toLowerCase();
    return consumerAssistants.filter((assistant) => {
      const categoryMatch = category === "All" || assistant.category === category;
      const queryMatch = `${assistant.title} ${assistant.role} ${assistant.outputs.join(" ")}`.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="rounded border border-line bg-ink p-6 text-paper shadow-soft">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-paper/70">
              <Bot size={22} aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-[0.12em]">Expanded imported toolkit</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">Legal Eagle + Consumer Assistant Suite</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-paper/70">
              Added every major function from `Legal-Eagle-AI-Toolkit` and `AI-Legal-Consumer-Assistant`: document
              tools, evidence image analysis concepts, live/omni assistant modes, and the full consumer-law assistant library.
            </p>
          </div>
          <div className="rounded border border-white/15 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-paper/60">Upload ceiling</p>
            <p className="mt-2 text-5xl font-semibold text-gold">{uploadLimitLabel}</p>
            <p className="mt-3 text-sm leading-6 text-paper/70">
              Intake validation now accepts large evidence bundles, videos, PDFs, image sets, and zipped case materials up
              to {uploadLimitLabel}.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Legal Eagle tool functions</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {legalEagleTools.map((tool) => {
            const Icon = tool.id === "image-analyzer" ? Image : tool.id === "live-conversation" ? Mic : tool.id === "validate-compliance" ? ShieldCheck : FileSearch;
            return (
              <article key={tool.id} className="rounded border border-line bg-paper p-5 shadow-soft">
                <Icon className="text-pine" size={24} aria-hidden />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">{tool.category}</p>
                <h3 className="mt-2 text-xl font-semibold">{tool.name}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{tool.description}</p>
                <p className="mt-4 rounded bg-field px-3 py-2 text-xs font-semibold text-ink/68">Output: {tool.output}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded border border-line bg-field p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Consumer assistant library</h2>
            <p className="mt-2 text-ink/68">All 25 imported assistants are searchable and grouped by domain.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-3 text-ink/45" size={16} aria-hidden />
              <input
                className="focus-ring min-h-10 w-full rounded border border-line bg-white pl-9 pr-3 text-sm sm:w-72"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search assistants"
              />
            </label>
            <select
              className="focus-ring min-h-10 rounded border border-line bg-white px-3 text-sm"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {filteredAssistants.map((assistant) => (
            <article key={assistant.id} className="rounded border border-line bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-pine">{assistant.category}</p>
              <h3 className="mt-2 text-lg font-semibold">{assistant.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{assistant.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {assistant.outputs.map((output) => (
                  <span key={output} className="rounded bg-field px-2 py-1 text-xs font-semibold text-ink/60">
                    {output}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
