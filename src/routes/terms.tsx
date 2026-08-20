import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Shortcut by Civimatica" },
      {
        name: "description",
        content: "Terms for using the Shortcut product site and waitlist, operated by Civimatica.",
      },
      { property: "og:title", content: "Shortcut terms of service" },
      { property: "og:description", content: "Terms for the Shortcut site and waitlist." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { c } = useI18n();
  return (
    <section className="bg-white py-16">
      <div className="container-site max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{c.terms.title}</h1>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {c.terms.updated}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{c.terms.intro}</p>

        <div className="mt-10 space-y-8">
          {c.terms.sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-extrabold text-ink">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
