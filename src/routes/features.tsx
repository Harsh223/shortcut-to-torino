import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ParkingMock, TransitMock } from "@/components/site/PhoneMock";
import { StoreButtons, WaitlistForm } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Shortcut city navigation app" },
      {
        name: "description",
        content:
          "Curbside and garage parking with live availability, corrected transit arrivals, protected connections, traffic-light countdowns, EV charging and a voice assistant.",
      },
      { property: "og:title", content: "Everything Shortcut does" },
      {
        property: "og:description",
        content: "One map for parking, transit, driving, charging and micromobility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const { c } = useI18n();
  return (
    <>
      <section className="forest-wash py-16 text-white sm:py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl">{c.featuresPage.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/70">{c.featuresPage.sub}</p>
            <div className="mt-8 max-w-lg">
              <WaitlistForm source="features-hero" tone="dark" stacked />
            </div>
          </div>
          <div className="animate-float mx-auto hidden lg:block">
            <ParkingMock />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.featuresPage.items.map((f) => (
            <article key={f.name} className="card-soft">
              <h2 className="text-base font-extrabold text-ink">{f.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="flex justify-center">
            <TransitMock />
          </div>
          <div>
            <p className="eyebrow text-grass">{c.transit.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{c.transit.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.transit.body}</p>
            <ul className="mt-6 space-y-3">
              {c.transit.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-grass" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <StoreButtons />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
