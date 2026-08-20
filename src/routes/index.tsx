import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bus,
  Check,
  CircleParking,
  Mic,
  Navigation,
  Sparkles,
  TrafficCone,
  Zap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { TurinMap } from "@/components/site/TurinMap";
import { DriveMock, ParkingMock, TransitMock } from "@/components/site/PhoneMock";
import { StoreButtons, WaitlistForm, useWaitlist } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shortcut — Parking, transit and driving in one city app" },
      {
        name: "description",
        content:
          "Shortcut finds live curbside and garage parking, corrects public transport times and guides you with live traffic, traffic-light countdowns and EV charging. Join the waitlist.",
      },
      { property: "og:title", content: "Shortcut — One app to cross the city" },
      {
        property: "og:description",
        content:
          "Live parking, sharper transit times, traffic-light countdowns and EV charging. An app by Civimatica, launching in Turin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const pillarIcons = {
  parking: CircleParking,
  transit: Bus,
  drive: Navigation,
  voice: Mic,
} as const;

function Home() {
  const { c } = useI18n();
  const { open } = useWaitlist();

  return (
    <>
      {/* ---------------------------------- hero --------------------------------- */}
      <section className="forest-wash relative overflow-hidden">
        <TurinMap
          variant="night"
          className="animate-pan absolute inset-0 h-full w-full opacity-30"
          showRoutes={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/70 to-forest-deep" />

        <div className="container-site relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <p className="eyebrow inline-flex rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              {c.hero.badge}
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]">
              {c.hero.title} <span className="text-gold">{c.hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {c.hero.sub}
            </p>

            <div className="mt-8 max-w-xl">
              <WaitlistForm source="hero" tone="dark" />
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {c.hero.proof.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/75"
                >
                  <Check className="h-3.5 w-3.5 text-gold" />
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-float relative mx-auto">
            <DriveMock />
          </div>
        </div>

        <div className="container-site relative border-t border-white/10 py-8">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {c.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-extrabold text-gold">{s.value}</dt>
                <dd className="mt-1 text-sm font-semibold text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------- pillars -------------------------------- */}
      <section className="paper-wash py-20">
        <div className="container-site">
          <h2 className="max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">
            {c.pillars.title}
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">{c.pillars.sub}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.pillars.items.map((p) => {
              const Icon = pillarIcons[p.key as keyof typeof pillarIcons] ?? Navigation;
              return (
                <div key={p.key} className="card-soft">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-ink">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------- parking -------------------------------- */}
      <Story
        kicker={c.parking.kicker}
        title={c.parking.title}
        body={c.parking.body}
        points={c.parking.points}
        media={<ParkingMock />}
      />

      {/* -------------------------------- transit -------------------------------- */}
      <Story
        kicker={c.transit.kicker}
        title={c.transit.title}
        body={c.transit.body}
        points={c.transit.points}
        media={<TransitMock />}
        reverse
        tone="cream"
      />

      {/* --------------------------------- drive --------------------------------- */}
      <section className="forest-wash py-20 text-white">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">{c.drive.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{c.drive.title}</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">{c.drive.body}</p>
            <ul className="mt-6 space-y-3">
              {c.drive.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/5 p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-gold text-2xl font-extrabold text-gold">
                12
              </div>
              <p className="mt-6 text-sm font-bold text-white/80">
                {c.drive.points[0]}
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <TrafficCone className="h-8 w-8 text-gold" />
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[1]}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <Zap className="h-8 w-8 text-gold" />
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[2]}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <Navigation className="h-8 w-8 text-gold" />
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[3]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------- voice --------------------------------- */}
      <section className="bg-white py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-grass">{c.voice.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{c.voice.title}</h2>
            <p className="mt-4 text-base text-muted-foreground">{c.voice.sub}</p>
            <button onClick={() => open("voice")} className="pill mt-7 bg-grass text-white hover:bg-grass-hover">
              {c.common.joinWaitlist}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-3xl border border-divider bg-paper p-5 sm:p-7">
            <div className="space-y-3">
              {c.voice.lines.map((line, i) => (
                <div
                  key={line}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-semibold ${
                    i % 2 === 0
                      ? "ml-auto bg-forest text-white"
                      : "bg-white text-ink shadow-chrome"
                  }`}
                >
                  {i % 2 === 1 && (
                    <span className="mb-1 flex items-center gap-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-grass">
                      <Mic className="h-3 w-3" /> Shortcut
                    </span>
                  )}
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------- more --------------------------------- */}
      <section className="bg-cream py-20">
        <div className="container-site">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">{c.more.title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{c.more.sub}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.more.items.map((m) => (
              <div key={m.name} className="card-soft">
                <h3 className="text-base font-extrabold text-ink">{m.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------- how ---------------------------------- */}
      <section className="bg-white py-20">
        <div className="container-site">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">{c.how.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.how.steps.map((s) => (
              <div key={s.n} className="rounded-3xl border border-divider p-6">
                <span className="text-sm font-extrabold text-gold">{s.n}</span>
                <h3 className="mt-3 text-lg font-extrabold text-ink">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------- cities -------------------------------- */}
      <section className="bg-paper py-16">
        <div className="container-site overflow-hidden rounded-[2rem] border border-divider bg-white">
          <div className="grid items-center gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div>
              <p className="eyebrow text-grass">{c.cities.kicker}</p>
              <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">{c.cities.title}</h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
                {c.cities.body}
              </p>
              <Link to="/turin" className="pill mt-6 border border-divider text-ink hover:bg-cream">
                {c.cities.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative h-56 overflow-hidden rounded-3xl bg-forest-deep sm:h-64">
              <TurinMap variant="night" className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------- faq ---------------------------------- */}
      <section className="bg-white py-20">
        <div className="container-site max-w-3xl">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">{c.faq.title}</h2>
          <div className="mt-8 divide-y divide-divider border-y border-divider">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-ink">
                  {f.q}
                  <span className="text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------- cta ---------------------------------- */}
      <section className="forest-wash py-20 text-white">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{c.cta.title}</h2>
          <p className="mt-3 text-base text-white/70">{c.cta.sub}</p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <WaitlistForm source="footer-cta" tone="dark" />
          </div>
          <div className="mt-8 flex justify-center">
            <StoreButtons tone="dark" />
          </div>
        </div>
      </section>
    </>
  );
}

function Story({
  kicker,
  title,
  body,
  points,
  media,
  reverse = false,
  tone = "white",
}: {
  kicker: string;
  title: string;
  body: string;
  points: string[];
  media: React.ReactNode;
  reverse?: boolean;
  tone?: "white" | "cream";
}) {
  return (
    <section className={`${tone === "cream" ? "bg-cream" : "bg-white"} py-20`}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="eyebrow text-grass">{kicker}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{body}</p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-grass" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${reverse ? "lg:order-1" : ""} flex justify-center`}>{media}</div>
      </div>
    </section>
  );
}
