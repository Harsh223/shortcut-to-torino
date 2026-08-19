import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Wordmark } from "./Logo";

export function Footer() {
  const { c } = useI18n();
  return (
    <footer className="border-t border-divider bg-paper">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{c.footer.tagline}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-divider bg-white px-3 py-1.5 text-xs font-bold text-ink">
            <span className="h-2 w-2 rounded-full bg-teal" />
            {c.footer.made}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {c.footer.product}
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-ink">
            <li>
              <Link to="/features" className="hover:text-azure">
                {c.nav.product}
              </Link>
            </li>
            <li>
              <Link to="/turin" className="hover:text-azure">
                {c.nav.turin}
              </Link>
            </li>
            <li>
              <Link to="/download" className="hover:text-azure">
                {c.nav.download}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {c.footer.legal}
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-ink">
            <li>
              <Link to="/privacy" className="hover:text-azure">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-azure">
                {c.terms.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site border-t border-divider py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shortcut. {c.footer.rights}
      </div>
    </footer>
  );
}
