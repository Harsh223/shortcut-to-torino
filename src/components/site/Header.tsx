import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Wordmark } from "./Logo";
import { useWaitlist } from "./WaitlistForm";

export function Header() {
  const { c, lang, setLang } = useI18n();
  const { open } = useWaitlist();
  const [menu, setMenu] = useState(false);

  const links = [
    { to: "/features", label: c.nav.product },
    { to: "/turin", label: c.nav.cities },
    { to: "/download", label: c.nav.waitlist },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-divider/70 bg-white/80 backdrop-blur-xl">
      <div className="container-site flex h-[68px] items-center justify-between gap-4">
        <Link to="/" aria-label="Shortcut" onClick={() => setMenu(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-[0.92rem] font-bold text-ink/70 transition-colors hover:bg-cream hover:text-ink"
              activeProps={{ className: "bg-cream text-ink" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-divider p-0.5 sm:flex">
            {(["it", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 text-xs font-extrabold uppercase transition-colors ${
                  lang === l ? "bg-forest text-white" : "text-ink/55 hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => open("header")}
            className="pill hidden bg-grass px-5 py-2.5 text-white hover:bg-grass-hover sm:inline-flex"
          >
            {c.nav.cta}
          </button>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setMenu((o) => !o)}
            aria-label={c.nav.menu}
            aria-expanded={menu}
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-divider bg-white px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenu(false)}
              className="block rounded-xl px-2 py-3 text-base font-bold text-ink"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-3 border-t border-divider pt-3">
            <button
              onClick={() => {
                setMenu(false);
                open("mobile-menu");
              }}
              className="pill flex-1 bg-grass text-white"
            >
              {c.nav.cta}
            </button>
            <div className="flex items-center rounded-full border border-divider p-0.5">
              {(["it", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-2.5 py-1.5 text-xs font-extrabold uppercase ${
                    lang === l ? "bg-forest text-white" : "text-ink/55"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
