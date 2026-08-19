import { createFileRoute } from "@tanstack/react-router";
import { Car, Bus, Footprints, ParkingSquare, Zap, Bike, WifiOff, TrafficCone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { DriveMock, TransitMock, WalkMock, ExploreMock } from "@/components/site/PhoneMock";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Product — Shortcut for Turin" },
      {
        name: "description",
        content:
          "Drive, GTT transit, walking, parking, charging, micromobility, offline maps and traffic signals — with the limits written next to each one.",
      },
      { property: "og:title", content: "Product — Shortcut for Turin" },
      {
        property: "og:description",
        content:
          "Every Shortcut feature in detail, with honest constraints: scheduled vs live, timed signals, curb occupancy.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: Features,
});

const ICONS = [Car, Bus, Footprints, ParkingSquare, Zap, Bike, WifiOff, TrafficCone];

function Features() {
  const { c } = useI18n();
  return (
    <>
      <section className="bg-navy-deep py-20">
        <div className="container-site max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{c.features.title}</h1>
          <p className="mt-4 text-lg text-white/70">{c.features.sub}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {c.features.items.map((f, i) => {
            const Icon = ICONS[i] ?? Car;
            return (
              <article key={f.name} className="rounded-3xl border border-divider bg-paper p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-azure shadow-chrome">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-xl font-extrabold text-ink">{f.name}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                <p className="mt-5 rounded-2xl border border-divider bg-white px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-bold uppercase tracking-wider">
                    {c.features.constraintLabel}
                  </span>
                  <br />
                  {f.constraint}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="container-site flex snap-x gap-6 overflow-x-auto pb-4 no-scrollbar">
          <DriveMock />
          <TransitMock />
          <WalkMock />
          <ExploreMock />
        </div>
      </section>
    </>
  );
}
