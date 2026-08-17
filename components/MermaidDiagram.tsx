"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "strict",
  themeVariables: {
    background: "#101014",
    primaryColor: "#17171d",
    primaryTextColor: "#ededf2",
    primaryBorderColor: "#3f3f52",
    lineColor: "#7c7c93",
    secondaryColor: "#1c1c25",
    tertiaryColor: "#17171d",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    fontSize: "14px",
  },
});

type Props = {
  chart: string;
};

export default function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const rawId = useId();
  const id = `uml-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const { svg } = await mermaid.render(id, chart);

        if (cancelled || !ref.current) return;

        ref.current.innerHTML = svg;
        setError(null);
      } catch (err) {
        if (cancelled) return;

        console.error("Mermaid render failed", err);
        setError("This diagram could not be rendered.");
      }
    }

    render();

    return () => {
      cancelled = true;
      document.getElementById(`d${id}`)?.remove();
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex w-full justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
    />
  );
}
