import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const KEY = "shortcut-cookie-consent";

export function CookieConsent() {
  const { c } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (value: "all" | "essential") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-5">
      <div className="animate-rise container-site max-w-3xl rounded-3xl border border-divider bg-white p-5 shadow-float">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-grass">
              <Cookie className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-ink">{c.cookies.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {c.cookies.body}{" "}
                <Link to="/privacy" className="font-bold text-grass underline underline-offset-2">
                  {c.cookies.more}
                </Link>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => decide("essential")}
              className="pill flex-1 border border-divider px-4 py-2.5 text-sm text-ink hover:bg-cream"
            >
              {c.cookies.reject}
            </button>
            <button
              onClick={() => decide("all")}
              className="pill flex-1 bg-grass px-4 py-2.5 text-sm text-white hover:bg-grass-hover"
            >
              {c.cookies.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
