import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Shortcut" },
      {
        name: "description",
        content:
          "How Shortcut handles location and accounts: location is for navigation, sign-in is optional, and we don't sell your location to ad networks.",
      },
      { property: "og:title", content: "Privacy — Shortcut" },
      {
        property: "og:description",
        content: "Plain-language privacy draft: optional login, location for navigation, no data selling.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { c } = useI18n();
  return <LegalPage title={c.privacy.title} updated={c.privacy.updated} sections={c.privacy.sections} />;
}

function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <>
      <section className="bg-navy-deep py-16">
        <div className="container-site max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white">{title}</h1>
          <p className="mt-3 text-sm font-semibold text-white/55">{updated}</p>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-site max-w-3xl space-y-8">
          {sections.map((s) => (
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
