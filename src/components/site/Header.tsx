import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CITIES, cityCopy, cityUi } from "@/lib/cities";
import { Wordmark } from "./Logo";
import { useWaitlist } from "./WaitlistForm";

export function Header() {
  const { c, lang, setLang } = useI18n();
  const { open } = useWaitlist();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-divider/70 bg-white/80 backdrop-blur-xl">
      <div className="container-site flex h-[68px] items-center justify-between gap-4">
        <Link to="/" aria-label="Shortcut" onClick={() => setMenu(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/features"
            className="rounded-full px-4 py-2 text-[0.92rem] font-bold text-ink/70 transition-colors hover:bg-cream hover:text-ink"
            activeProps={{ className: "bg-cream text-ink" }}
          >
            {c.nav.product}
          </Link>

          <CityMenu />

          <Link
            to="/download"
            className="rounded-full px-4 py-2 text-[0.92rem] font-bold text-ink/70 transition-colors hover:bg-cream hover:text-ink"
            activeProps={{ className: "bg-cream text-ink" }}
          >
            {c.nav.waitlist}
          </Link>
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

      {menu && <MobileMenu onClose={() => setMenu(false)} />}
    </header>
  );
}

/* ------------------------------- desktop menu ------------------------------ */

function CityMenu() {
  const { c, lang } = useI18n();
  const ui = cityUi[lang];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-bold transition-colors hover:bg-cream hover:text-ink ${
          open ? "bg-cream text-ink" : "text-ink/70"
        }`}
      >
        {c.nav.cities}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="animate-scale-in absolute left-1/2 top-[calc(100%+10px)] w-[540px] -translate-x-1/2 rounded-3xl border border-divider bg-white p-5 shadow-float">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm font-extrabold text-ink">{ui.menuTitle}</p>
            <Link
              to="/cities"
              onClick={() => setOpen(false)}
              className="text-xs font-extrabold text-grass hover:underline"
            >
              {ui.allCities}
            </Link>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{ui.menuSub}</p>

          <div className="mt-4 grid grid-cols-3 gap-1">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                to="/cities/$slug"
                params={{ slug: city.slug }}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 transition-colors hover:bg-cream"
                activeProps={{ className: "bg-cream" }}
              >
                <span className="block text-sm font-extrabold text-ink">{city.name}</span>
                <span className="block truncate text-[0.68rem] font-semibold text-muted-foreground">
                  {cityCopy(city, lang).status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- mobile menu ------------------------------- */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { c, lang, setLang } = useI18n();
  const { open } = useWaitlist();
  const ui = cityUi[lang];

  return (
    <div className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-divider bg-white px-5 py-3 md:hidden">
      {[
        { to: "/features", label: c.nav.product },
        { to: "/cities", label: ui.allCities },
        { to: "/download", label: c.nav.waitlist },
      ].map((l) => (
        <Link
          key={l.to}
          to={l.to}
          onClick={onClose}
          className="block rounded-xl px-2 py-3 text-base font-bold text-ink"
        >
          {l.label}
        </Link>
      ))}

      <p className="mt-2 px-2 text-[0.68rem] font-extrabold uppercase tracking-wider text-grass">
        {ui.menuTitle}
      </p>
      <div className="mt-1 grid grid-cols-2 gap-1">
        {CITIES.map((city) => (
          <Link
            key={city.slug}
            to="/cities/$slug"
            params={{ slug: city.slug }}
            onClick={onClose}
            className="rounded-xl px-2 py-2 text-sm font-bold text-ink/80"
          >
            {city.name}
          </Link>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-divider pt-3">
        <button
          onClick={() => {
            onClose();
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
  );
}
