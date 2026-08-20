/**
 * Shortcut brand mark — a rounded forest tile with a gold "shortcut" chevron
 * cutting a corner off a route, and a white location puck at the start.
 */
export function ShortcutMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Shortcut">
      <defs>
        <linearGradient id="sc-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.38 0.075 162)" />
          <stop offset="100%" stopColor="oklch(0.245 0.055 162)" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="14" fill="url(#sc-tile)" />

      {/* the long way round — faint */}
      <path
        d="M13 35 L13 19 Q13 13 19 13 L34 13"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 5.5"
      />

      {/* the shortcut — gold diagonal */}
      <path
        d="M13 35 L31 17"
        fill="none"
        stroke="oklch(0.79 0.125 88)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M23.5 15.5 L33 15 L32.5 24.5"
        fill="none"
        stroke="oklch(0.79 0.125 88)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* start puck */}
      <circle cx="13" cy="35" r="4.6" fill="#ffffff" />
      <circle cx="13" cy="35" r="1.9" fill="oklch(0.33 0.066 162)" />
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
