import Link from "next/link";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

import GeneratorForm from "@/components/dashboard/GeneratorForm";
import { listDiagrams, type DiagramSummary } from "@/lib/diagrams";

export const metadata: Metadata = {
  title: "Dashboard",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="card px-5 py-4">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </p>
    </div>
  );
}

function DiagramCard({ diagram }: { diagram: DiagramSummary }) {
  return (
    <Link
      href={`/dashboard/diagrams/${diagram.id}`}
      className="card block p-5 transition-colors hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 font-semibold leading-snug">
          {diagram.title}
        </h3>
        <span className="shrink-0 text-xs text-zinc-600">
          {formatDate(diagram.createdAt)}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
        {diagram.idea}
      </p>

      <div className="mt-4 flex gap-2 font-mono text-[11px] text-zinc-500">
        <span className="rounded-md border border-hairline bg-surface-2 px-2 py-1">
          {diagram.classCount} classes
        </span>
        <span className="rounded-md border border-hairline bg-surface-2 px-2 py-1">
          {diagram.relationshipCount} relationships
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-xl bg-accent/10 ring-1 ring-accent/25">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-6 text-accent-soft"
          aria-hidden="true"
        >
          <path
            d="M4 5h6v4H4zM14 15h6v4h-6zM4 15h6v4H4zM10 7h2a2 2 0 012 2v8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="mt-4 font-semibold">No diagrams yet</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Describe a project above and your generated class diagrams will collect
        here.
      </p>
    </div>
  );
}

export default async function DashboardPage() {
  const [user, diagrams] = await Promise.all([currentUser(), listDiagrams()]);

  const firstName = user?.firstName ?? null;
  const totalClasses = diagrams.reduce((sum, d) => sum + d.classCount, 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h1>
        <p className="mt-2 text-zinc-400">
          Describe a system and ArchiGen will design the class model for it.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_260px] lg:items-start">
        <GeneratorForm />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Stat label="Diagrams saved" value={diagrams.length} />
          <Stat label="Classes modelled" value={totalClasses} />
        </div>
      </div>

      <section>
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Your diagrams</h2>
          {diagrams.length > 0 && (
            <span className="text-sm text-zinc-600">
              {diagrams.length} saved
            </span>
          )}
        </div>

        {diagrams.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {diagrams.map((diagram) => (
              <DiagramCard key={diagram.id} diagram={diagram} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
