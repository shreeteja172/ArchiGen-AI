"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
});

type Props = {
  chart: string;
};

export default function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function render() {
      if (!ref.current) return;

      const id = "uml-" + Date.now();

      const { svg } = await mermaid.render(id, chart);

      ref.current.innerHTML = svg;
    }

    render();
  }, [chart]);

  return (
    <div
      ref={ref}
      className="mt-10 w-full overflow-auto rounded-xl bg-white p-6"
    />
  );
}