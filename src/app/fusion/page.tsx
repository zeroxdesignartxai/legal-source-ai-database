import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardList, FileText, GitMerge, Network, ShieldCheck } from "lucide-react";
import { fusionActions, fusionModules, fusionNodes, fusedScenario } from "@/lib/fusion-data";

const strengthStyles = {
  verified: "border-pine/30 bg-pine/10 text-pine",
  "needs-proof": "border-gold/40 bg-gold/20 text-ink",
  urgent: "border-clay/40 bg-clay/10 text-clay"
};

export default function FusionPage() {
  return (
    <div className="bg-paper">
      <section className="border-b border-line bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-paper/70">
              <GitMerge size={20} aria-hidden />
              <span className="text-sm font-semibold uppercase tracking-[0.12em]">3 repo fusion</span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              Legal Command Center
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-paper/70">
              Combined `smart-contract`, `legal`, and `legal-action` into a single workflow: read the paper, map the
              proof, generate the next legal action, and package it for attorney review.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="focus-ring rounded bg-gold px-5 py-3 text-sm font-semibold text-ink" href="/packet-builder">
                Build packet
              </Link>
              <Link className="focus-ring inline-flex items-center gap-2 rounded border border-paper/25 px-5 py-3 text-sm font-semibold" href="/ask">
                Verify a source <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <aside className="rounded border border-white/20 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.12em] text-paper/60">{fusedScenario.title}</p>
            <p className="mt-4 text-5xl font-semibold text-gold">{fusedScenario.confidence}%</p>
            <p className="mt-3 leading-7 text-paper/75">{fusedScenario.shortAnswer}</p>
            <ul className="mt-5 space-y-2 text-sm text-paper/70">
              {fusedScenario.imports.map((item) => (
                <li key={item} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 shrink-0 text-gold" size={16} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Imported intelligence modules</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {fusionModules.map((module, index) => {
            const Icon = index === 0 ? FileText : index === 1 ? Network : ClipboardList;
            return (
              <article key={module.repo} className="rounded border border-line bg-paper p-5 shadow-soft">
                <Icon className="text-pine" size={24} aria-hidden />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">{module.repo}</p>
                <h3 className="mt-2 text-xl font-semibold">{module.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{module.role}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {module.signals.map((signal) => (
                    <span key={signal} className="rounded bg-field px-2.5 py-1 text-xs font-semibold text-ink/68">
                      {signal}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-field">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="text-clay" size={24} aria-hidden />
              <h2 className="text-2xl font-semibold">Evidence graph preview</h2>
            </div>
            <p className="mt-3 max-w-xl leading-7 text-ink/68">
              Every node gets a type and strength state. Verified rules can support answers; urgent deadlines move into
              the action planner; weak facts become evidence requests.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fusionNodes.map((node) => (
              <article key={node.id} className={`rounded border p-4 ${strengthStyles[node.strength]}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-70">{node.type}</p>
                <h3 className="mt-2 font-semibold">{node.label}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Action pipeline</h2>
        <div className="mt-5 overflow-x-auto rounded border border-line bg-paper">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <thead className="bg-field text-xs uppercase text-ink/60">
              <tr>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Imported source</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Output</th>
              </tr>
            </thead>
            <tbody>
              {fusionActions.map((item) => (
                <tr key={item.action} className="border-t border-line">
                  <td className="px-4 py-4 font-semibold">{item.action}</td>
                  <td className="px-4 py-4">{item.source}</td>
                  <td className="px-4 py-4 text-clay">{item.deadline}</td>
                  <td className="px-4 py-4">{item.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
