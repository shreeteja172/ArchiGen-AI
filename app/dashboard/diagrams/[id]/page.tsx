import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CopyButton from "@/components/dashboard/CopyButton";
import DeleteDiagramButton from "@/components/dashboard/DeleteDiagramButton";
import MermaidDiagram from "@/components/MermaidDiagram";
import { getDiagram } from "@/lib/diagrams";
import { toMermaid } from "@/lib/mermaid";

export async function generateMetadata(
  props: PageProps<"/dashboard/diagrams/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const diagram = await getDiagram(id);

  return { title: diagram?.title ?? "Diagram" };
}

export default async function DiagramPage(
  props: PageProps<"/dashboard/diagrams/[id]">,
) {
  const { id } = await props.params;
  const diagram = await getDiagram(id);

  if (!diagram) notFound();

  const chart = toMermaid(diagram.uml);
  const json = JSON.stringify(diagram.uml, null, 2);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4"
            aria-hidden="true"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to dashboard
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {diagram.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {diagram.classCount} classes · {diagram.relationshipCount}{" "}
              relationships ·{" "}
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(diagram.createdAt)}
            </p>
          </div>

          <DeleteDiagramButton id={diagram.id} />
        </div>
      </div>

      <section className="card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-zinc-400">Class diagram</h2>
          <CopyButton value={chart} label="Copy Mermaid" />
        </div>

        <MermaidDiagram chart={chart} />
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card p-5 sm:p-6">
          <h2 className="text-sm font-medium text-zinc-400">Your idea</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
            {diagram.idea}
          </p>
        </section>

        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline bg-surface-2 px-5 py-3">
            <h2 className="text-sm font-medium text-zinc-400">Model · JSON</h2>
            <CopyButton value={json} label="Copy JSON" />
          </div>

          <pre className="max-h-96 overflow-auto p-5 font-mono text-[12px] leading-relaxed text-zinc-400">
            {json}
          </pre>
        </section>
      </div>
    </div>
  );
}
