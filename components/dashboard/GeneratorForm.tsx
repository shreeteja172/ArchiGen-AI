"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { generateDiagram, type GenerateState } from "@/app/actions/diagrams";

const EXAMPLE = `A hospital management system.

Doctors manage patients.
Patients book appointments.
Bills belong to patients.`;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 animate-spin"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.5"
              className="opacity-25"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Generating…
        </>
      ) : (
        "Generate UML"
      )}
    </button>
  );
}

export default function GeneratorForm() {
  const [state, formAction] = useActionState<GenerateState, FormData>(
    generateDiagram,
    {},
  );

  const [idea, setIdea] = useState("");

  return (
    <form action={formAction} className="card p-5 sm:p-6">
      <label htmlFor="idea" className="block text-sm font-medium">
        Describe your project
      </label>
      <p className="mt-1 text-sm text-zinc-500">
        A few sentences is plenty. Mention who uses the system and what they do
        with it.
      </p>

      <textarea
        id="idea"
        name="idea"
        rows={8}
        value={idea}
        onChange={(event) => setIdea(event.target.value)}
        required
        maxLength={4000}
        placeholder={EXAMPLE}
        className="mt-4 w-full resize-y rounded-lg border border-hairline bg-canvas p-4 text-sm leading-relaxed text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-accent/60"
      />

      {state.error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-zinc-600">
          Generation usually takes a few seconds.
        </p>

        <SubmitButton />
      </div>
    </form>
  );
}
