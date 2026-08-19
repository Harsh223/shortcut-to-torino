import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Shortcut" },
      {
        name: "description",
        content:
          "Plain-language terms for using Shortcut: guidance is support not an order, data accuracy limits, and optional accounts.",
      },
      { property: "og:title", content: "Terms — Shortcut" },
      {
        property: "og:description",
        content: "Draft terms for the Shortcut navigation app in Turin.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { c } = useI18n();
  return (
    <>
      <section className="bg-navy-deep py-16">
        <div className="container-site max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white">{c.terms.title}</h1>
          <p className="mt-3 text-sm font-semibold text-white/55">{c.terms.updated}</p>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-site max-w-3xl space-y-8">
          {c.terms.sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-extrabold text-ink">{s.h}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
