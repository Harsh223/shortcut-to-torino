import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { CityStage, CityStrip } from "@/components/site/CityStage";
import { CityScene } from "@/components/site/CityArt";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { productArt } from "@/lib/product-art";

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

type Act = {
  kicker: string;
  title: string;
  body: string;
  points: readonly string[];
};

function ActBlock({
  act,
  src,
  alt,
  marks,
  flip = false,
  tone = "light",
}: {
  act: Act;
  src: string;
  alt: string;
  marks: readonly [string, string];
  flip?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <p className={`eyebrow ${dark ? "text-gold" : "text-forest"}`}>{act.kicker}</p>
        <h2
          className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {act.title}
        </h2>
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>
          {act.body}
        </p>
        <ul className="mt-6 space-y-3">
          {act.points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                  dark ? "bg-gold text-forest-deep" : "bg-forest text-gold"
                }`}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className={`text-sm ${dark ? "text-white/80" : "text-ink/80"}`}>{p}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
        <CityScene src={src} alt={alt} marks={marks} tone={tone} />
      </Reveal>
    </div>
  );
}

function FeaturesPage() {
  const { c, lang } = useI18n();
  const p = c.featuresPage;

  return (
    <>
      {/* Act 1 — the stage */}
      <section className="forest-wash relative flex min-h-[86svh] flex-col overflow-hidden pt-14 text-white sm:pt-16">
        <div className="container-site relative z-10 text-center">
          <Reveal>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {p.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{p.sub}</p>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-7 max-w-lg">
            <WaitlistForm source="features-hero" tone="dark" />
          </Reveal>
        </div>

        <CityStage
          src={productArt.hero.src}
          alt={productArt.hero.alt[lang]}
          chips={[...p.chips]}
        />
      </section>

      {/* Act 2 — parking */}
      <section className="bg-cream py-20 sm:py-24">
        <ActBlock
          act={c.parking}
          src={productArt.parking.src}
          alt={productArt.parking.alt[lang]}
          marks={[c.scene.parkTitle, c.scene.parkBody]}
        />
      </section>

      {/* Act 3 — transit */}
      <section className="bg-forest-deep py-20 text-white sm:py-24">
        <ActBlock
          act={c.transit}
          src={productArt.transit.src}
          alt={productArt.transit.alt[lang]}
          marks={[c.scene.transitTitle, c.scene.transitBody]}
          flip
          tone="dark"
        />
      </section>

      {/* Act 4 — traffic lights */}
      <section className="bg-gold-soft py-20 sm:py-24">
        <ActBlock
          act={p.lights}
          src={productArt.lights.src}
          alt={productArt.lights.alt[lang]}
          marks={[c.scene.light, p.lights.kicker]}
        />
      </section>

      {/* Act 5 — EV charging */}
      <section className="bg-white py-20 sm:py-24">
        <ActBlock
          act={p.ev}
          src={productArt.ev.src}
          alt={productArt.ev.alt[lang]}
          marks={[p.ev.kicker, "80% · 24 min"]}
          flip
        />
      </section>

      {/* Act 6 — voice */}
      <section className="bg-forest py-20 text-white sm:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-gold">{c.voice.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{c.voice.title}</h2>
            <p className="mt-4 text-lg text-white/70">{c.voice.sub}</p>
            <div className="mt-7 space-y-3">
              {c.voice.lines.map((line, i) => (
                <Reveal
                  key={line}
                  delay={i * 90}
                  className={i % 2 === 0 ? "flex justify-start" : "flex justify-end"}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      i % 2 === 0
                        ? "bg-white/10 text-white"
                        : "bg-gold text-forest-deep font-semibold"
                    }`}
                  >
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CityScene
              src={productArt.voice.src}
              alt={productArt.voice.alt[lang]}
              marks={[c.voice.kicker, c.scene.light]}
              tone="dark"
            />
          </Reveal>
        </div>
      </section>

      {/* Act 7 — the full list */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">{c.more.title}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{c.more.sub}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.items.map((f, i) => (
              <Reveal as="article" key={f.name} delay={(i % 3) * 90} className="card-soft h-full">
                <h3 className="text-base font-extrabold text-ink">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-cream pt-20 sm:pt-24">
        <div className="container-site text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
              {p.closing.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{p.closing.body}</p>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-8 max-w-lg">
            <WaitlistForm source="features-closing" />
          </Reveal>
        </div>
        <CityStrip src={productArt.hero.src} className="mt-14" />
      </section>
    </>
  );
}
