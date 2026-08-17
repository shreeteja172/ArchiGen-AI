"use client";

import { useEffect, useState } from "react";

type Props = {
  value: string;
  label?: string;
};

export default function CopyButton({ value, label = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-zinc-400 transition-colors hover:text-white"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
