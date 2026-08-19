export function ShortcutMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#2F7BFF" />
      <path
        d="M9 22.5c3.2 0 4.6-2.6 6.3-5.4 1.6-2.8 3-5.6 6.2-5.6"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18.4 8.4L22.6 11.4L18.7 14.8"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="9" cy="22.5" r="2.6" fill="#0DB4B9" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <ShortcutMark className="h-8 w-8" />
      <span
        className={`text-[1.35rem] font-extrabold tracking-[-0.04em] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        Shortcut
      </span>
    </span>
  );
}
