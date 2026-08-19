import { useState } from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const { c } = useI18n();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Torino");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  if (state === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-sm font-semibold text-ink">
        <Check className="h-5 w-5 text-success" />
        {c.waitlist.success}
      </div>
    );
  }

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setState("error");
          return;
        }
        setState("done");
      }}
    >
      <div className={`flex flex-col gap-2 ${compact ? "sm:flex-row" : "sm:flex-row"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          placeholder={c.waitlist.email}
          aria-label={c.waitlist.email}
          className="h-12 flex-1 rounded-full border border-divider bg-white px-5 text-sm font-medium text-ink outline-none placeholder:text-muted-foreground focus:border-azure"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label={c.waitlist.city}
          className="h-12 rounded-full border border-divider bg-white px-5 text-sm font-medium text-ink outline-none placeholder:text-muted-foreground focus:border-azure sm:w-40"
        />
        <button
          type="submit"
          className="h-12 rounded-full bg-azure px-6 text-sm font-bold text-white transition-colors hover:bg-azure-hover"
        >
          {c.waitlist.button}
        </button>
      </div>
      <p
        className={`mt-2.5 text-xs font-medium ${state === "error" ? "text-destructive" : "text-muted-foreground"}`}
      >
        {state === "error" ? c.waitlist.error : c.waitlist.note}
      </p>
    </form>
  );
}

export function StoreButtons({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { c } = useI18n();
  const base =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-colors";
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href="#download" className={`${base} bg-azure text-white hover:bg-azure-hover`}>
        {c.common.ios}
      </a>
      <a
        href="#download"
        className={`${base} ${
          tone === "dark"
            ? "border border-white/25 text-white hover:bg-white/10"
            : "border border-divider bg-white text-ink hover:bg-paper"
        }`}
      >
        {c.common.android}
      </a>
    </div>
  );
}

export function StorePlaceholders() {
  const { c } = useI18n();
  return (
    <p className="text-xs font-medium text-muted-foreground">
      {c.common.comingSoon} · {c.common.placeholderIos} · {c.common.placeholderAndroid}
    </p>
  );
}
