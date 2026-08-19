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
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="Shortcut" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-[0.95rem] font-bold text-forest/80 transition-colors hover:bg-cream hover:text-forest"
              activeProps={{ className: "bg-cream text-forest" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-divider p-0.5">
            {(["it", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 text-xs font-extrabold uppercase transition-colors ${
                  lang === l ? "bg-forest text-white" : "text-forest/60 hover:text-forest"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link
            to="/download"
            className="pill hidden bg-grass text-white hover:bg-grass-hover sm:inline-flex"
          >
            {c.nav.cta}
          </Link>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={c.nav.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-divider bg-white px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-2 py-3 text-base font-bold text-forest"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
