"use client";

import { useState } from "react";
import IdeaInput from "@/components/IdeaInput";
import GenerateButton from "@/components/GenerateButton";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uml, setUml] = useState<any>(null);

  async function generateUML() {
    if (!idea.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      setUml(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center p-10">

      <h1 className="text-5xl font-bold mb-3">
        UMLify AI
      </h1>

      <p className="text-zinc-400 mb-8">
        Describe your software idea and generate a UML Class Diagram.
      </p>

      <IdeaInput
        value={idea}
        onChange={setIdea}
      />

      <GenerateButton
        loading={loading}
        onClick={generateUML}
      />

      {uml && (
        <pre className="mt-10 w-full max-w-5xl overflow-auto rounded-xl bg-zinc-900 p-6 text-sm">
          {JSON.stringify(uml, null, 2)}
        </pre>
      )}
    </main>
  );
}