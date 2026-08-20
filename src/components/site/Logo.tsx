export function ShortcutMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="oklch(0.33 0.066 162)" />
      <path
        d="M8.5 23c3.4 0 4.8-3 6.5-6.1 1.7-3.1 3.1-6.1 6.6-6.1"
        stroke="oklch(0.79 0.125 88)"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18.2 7.4L22.6 10.6L18.5 14.2"
        stroke="oklch(0.79 0.125 88)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="8.5" cy="23" r="2.6" fill="#ffffff" />
    </svg>
  );
}

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <ShortcutMark className="h-9 w-9" />
      <span
        className={`text-[1.3rem] font-extrabold tracking-[-0.045em] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        Shortcut
      </span>
    </span>
  );
}
