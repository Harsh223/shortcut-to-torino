import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Wordmark } from "./Logo";

export function Header() {
  const { c, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/features", label: c.nav.product },
    { to: "/turin", label: c.nav.turin },
    { to: "/download", label: c.nav.download },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/70 backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Shortcut" onClick={() => setOpen(false)}>
          <Wordmark tone="light" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: "bg-white/10 text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/15 p-0.5">
            {(["it", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-colors ${
                  lang === l ? "bg-white text-ink" : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link
            to="/download"
            className="hidden h-11 items-center rounded-full bg-azure px-5 text-sm font-bold text-white transition-colors hover:bg-azure-hover sm:inline-flex"
          >
            {c.nav.cta}
          </Link>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={c.nav.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-deep/95 px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-2 py-3 text-base font-semibold text-white/85"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
