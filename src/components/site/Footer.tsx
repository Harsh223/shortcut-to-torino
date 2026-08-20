import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Wordmark } from "./Logo";
import { useWaitlist } from "./WaitlistForm";

export function Footer() {
  const { c } = useI18n();
  const { open } = useWaitlist();

  return (
    <footer className="forest-wash text-white">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Wordmark tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{c.footer.tagline}</p>
          <button
            onClick={() => open("footer")}
            className="pill mt-6 bg-gold px-5 py-2.5 text-sm text-forest-deep hover:bg-gold-soft"
          >
            {c.nav.cta}
          </button>
        </div>

        <div>
          <p className="eyebrow text-white/45">{c.footer.product}</p>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/85">
            <li>
              <Link to="/features" className="hover:text-gold">
                {c.nav.product}
              </Link>
            </li>
            <li>
              <Link to="/turin" className="hover:text-gold">
                {c.nav.cities}
              </Link>
            </li>
            <li>
              <Link to="/download" className="hover:text-gold">
                {c.nav.waitlist}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/45">{c.footer.company}</p>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/85">
            <li>
              <a
                href="https://civimatica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-gold"
              >
                Civimatica <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
            <li>
              <a href="mailto:hello@civimatica.com" className="hover:text-gold">
                hello@civimatica.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/45">{c.footer.legal}</p>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/85">
            <li>
              <Link to="/privacy" className="hover:text-gold">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gold">
                {c.terms.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Civimatica. {c.footer.rights}
        </p>
        <p>
          {c.footer.byline}{" "}
          <a
            href="https://civimatica.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold hover:underline"
          >
            Civimatica
          </a>
        </p>
      </div>
    </footer>
  );
}
