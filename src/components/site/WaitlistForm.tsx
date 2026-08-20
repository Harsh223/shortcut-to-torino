import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Check, Loader2, X, Apple, Smartphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

/* ---------------------------------- store ---------------------------------- */

const WaitlistCtx = createContext<{ open: (source?: string) => void }>({ open: () => {} });

export function useWaitlist() {
  return useContext(WaitlistCtx);
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const open = useCallback((s = "modal") => setSource(s), []);
  const close = useCallback(() => setSource(null), []);

  useEffect(() => {
    if (!source) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [source, close]);

  return (
    <WaitlistCtx.Provider value={{ open }}>
      {children}
      {source && <WaitlistModal source={source} onClose={close} />}
    </WaitlistCtx.Provider>
  );
}

function WaitlistModal({ source, onClose }: { source: string; onClose: () => void }) {
  const { c } = useI18n();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-forest-deep/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={c.waitlist.title}
      onClick={onClose}
    >
      <div
        className="animate-rise w-full max-w-lg rounded-3xl bg-white p-6 shadow-float sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-grass">{c.common.comingSoon}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink">{c.waitlist.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.waitlist.sub}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-cream hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6">
          <WaitlistForm source={source} stacked />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- form ---------------------------------- */

export function WaitlistForm({
  source = "page",
  stacked = false,
  tone = "light",
}: {
  source?: string;
  stacked?: boolean;
  tone?: "light" | "dark";
}) {
  const { c, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(true);
  const [state, setState] = useState<"idle" | "loading" | "error" | "failed" | "done" | "dup">(
    "idle",
  );

  const dark = tone === "dark";

  if (state === "done" || state === "dup") {
    return (
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold ${
          dark ? "bg-white/10 text-white" : "border border-grass/25 bg-grass/10 text-ink"
        }`}
      >
        <Check className={`h-5 w-5 ${dark ? "text-gold" : "text-grass"}`} />
        {state === "dup" ? c.waitlist.duplicate : c.waitlist.success}
      </div>
    );
  }

  const field = `h-12 w-full rounded-full px-5 text-sm font-medium outline-none transition-colors ${
    dark
      ? "border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-gold"
      : "border border-divider bg-white text-ink placeholder:text-muted-foreground focus:border-grass"
  }`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    const { error } = await supabase.from("waitlist_signups").insert({
      email: email.trim().toLowerCase(),
      city: city.trim() || null,
      source,
      locale: lang,
      marketing_consent: consent,
    });
    if (error) {
      setState(error.code === "23505" ? "dup" : "failed");
      return;
    }
    setState("done");
  }

  return (
    <form className="w-full" onSubmit={submit}>
      <div className={`grid gap-2.5 ${stacked ? "" : "sm:grid-cols-[1.4fr_1fr_auto]"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          placeholder={c.waitlist.email}
          aria-label={c.waitlist.email}
          className={field}
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={c.waitlist.city}
          aria-label={c.waitlist.city}
          className={field}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`pill h-12 disabled:opacity-70 ${
            dark ? "bg-gold text-forest-deep hover:bg-gold-soft" : "bg-grass text-white hover:bg-grass-hover"
          }`}
        >
          {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {c.waitlist.button}
        </button>
      </div>

      <label
        className={`mt-3.5 flex cursor-pointer items-start gap-2.5 text-xs font-medium ${
          dark ? "text-white/65" : "text-muted-foreground"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.45_0.09_163)]"
        />
        <span>{c.waitlist.consent}</span>
      </label>

      <p
        className={`mt-2 text-xs font-medium ${
          state === "error" || state === "failed"
            ? "text-destructive"
            : dark
              ? "text-white/50"
              : "text-muted-foreground"
        }`}
      >
        {state === "error" ? c.waitlist.error : state === "failed" ? c.waitlist.failed : c.waitlist.note}
      </p>
    </form>
  );
}

/* ------------------------------- store badges ------------------------------ */

export function StoreButtons({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { c } = useI18n();
  const { open } = useWaitlist();
  const base =
    "group inline-flex items-center gap-3 rounded-2xl border px-5 py-3 text-left transition-all hover:-translate-y-0.5";
  const skin =
    tone === "dark"
      ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
      : "border-divider bg-white text-ink hover:shadow-float";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {[
        { icon: Apple, top: c.common.comingSoon, label: c.common.ios },
        { icon: Smartphone, top: c.common.comingSoon, label: c.common.android },
      ].map(({ icon: Icon, top, label }) => (
        <button key={label} type="button" onClick={() => open("store-badge")} className={`${base} ${skin}`}>
          <Icon className="h-6 w-6 shrink-0" />
          <span className="leading-tight">
            <span className={`block text-[0.65rem] font-bold uppercase tracking-wider ${tone === "dark" ? "text-gold" : "text-grass"}`}>
              {top}
            </span>
            <span className="block text-sm font-extrabold">{label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
