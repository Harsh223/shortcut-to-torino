import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Wordmark } from "./Logo";

export function Footer() {
  const { c } = useI18n();
  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark tone="light" />
          <p className="mt-4 max-w-xs text-sm text-white/70">{c.footer.tagline}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-extrabold text-white">
            <span className="h-2 w-2 rounded-full bg-amber" />
            {c.footer.made}
          </p>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/50">
            {c.footer.product}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm font-bold text-white/85">
            <li>
              <Link to="/features" className="hover:text-amber">
                {c.nav.product}
              </Link>
            </li>
            <li>
              <Link to="/turin" className="hover:text-amber">
                {c.nav.turin}
              </Link>
            </li>
            <li>
              <Link to="/download" className="hover:text-amber">
                {c.nav.download}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/50">
            {c.footer.legal}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm font-bold text-white/85">
            <li>
              <Link to="/privacy" className="hover:text-amber">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-amber">
                {c.terms.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site border-t border-white/10 py-6 text-xs text-white/55">
        © {new Date().getFullYear()} Shortcut. {c.footer.rights}
      </div>
    </footer>
  );
}
