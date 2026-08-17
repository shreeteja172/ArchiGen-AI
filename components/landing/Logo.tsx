export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid size-8 place-items-center rounded-lg bg-accent/15 ring-1 ring-accent/40">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-4.5 text-accent-soft"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="3"
            width="7"
            height="5"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect
            x="14"
            y="10"
            width="7"
            height="5"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect
            x="3"
            y="16"
            width="7"
            height="5"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M10 6h2.5a1.5 1.5 0 0 1 1.5 1.5v3M10 18h2.5a1.5 1.5 0 0 0 1.5-1.5v-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        ArchiGen<span className="text-accent-soft"> AI</span>
      </span>
    </span>
  );
}
