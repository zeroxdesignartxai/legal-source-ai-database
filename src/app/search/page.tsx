"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sampleSources } from "@/lib/sample-data";
import { usePacketStore } from "@/store/usePacketStore";

export default function SearchPage() {
  const [query, setQuery] = useState("retaliation mold");
  const [jurisdiction, setJurisdiction] = useState("CA");
  const addDocument = usePacketStore((state) => state.addDocument);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
    return sampleSources.filter((source) => {
      const haystack = `${source.text} ${source.citation} ${source.sectionLabel}`.toLowerCase();
      return source.jurisdiction === jurisdiction && terms.some((term) => haystack.includes(term));
    });
  }, [query, jurisdiction]);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Search filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block text-sm font-semibold">
            Query
            <Input className="mt-2" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <label className="block text-sm font-semibold">
            Jurisdiction
            <select
              className="focus-ring mt-2 min-h-10 w-full rounded border border-line bg-white px-3 text-sm"
              value={jurisdiction}
              onChange={(event) => setJurisdiction(event.target.value)}
            >
              <option value="CA">California</option>
              <option value="Federal">Federal</option>
            </select>
          </label>
        </CardContent>
      </Card>
      <section>
        <h1 className="text-3xl font-semibold">Source search</h1>
        <div className="mt-5 space-y-4">
          {results.length === 0 ? (
            <div className="rounded border border-line bg-paper p-6 text-ink/68">
              No verified source matched those filters. Refine the query or upload a document.
            </div>
          ) : (
            results.map((source) => (
              <article key={source.id} className="rounded border border-line bg-paper p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-pine">{source.citation}</p>
                    <h2 className="mt-1 text-xl font-semibold">{source.documentTitle}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">{source.text}</p>
                  </div>
                  <Button variant="outline" onClick={() => addDocument(source.documentId)}>
                    <Plus size={16} aria-hidden />
                    Add
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
