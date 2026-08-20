import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Shortcut by Civimatica" },
      {
        name: "description",
        content:
          "How Shortcut handles waitlist emails, cookies and location data, and how to exercise your GDPR rights.",
      },
      { property: "og:title", content: "Shortcut privacy policy" },
      { property: "og:description", content: "Plain-language privacy policy for the Shortcut app and site." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { c } = useI18n();
  return (
    <section className="bg-white py-16">
      <div className="container-site max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{c.privacy.title}</h1>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {c.privacy.updated}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{c.privacy.intro}</p>

        <div className="mt-10 space-y-8">
          {c.privacy.sections.map((s) => (
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
