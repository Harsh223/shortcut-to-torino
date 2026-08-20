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
import { HeroScene } from "@/components/site/HeroScene";
import { Reveal } from "@/components/site/Reveal";
import { DriveMock, ParkingMock, TransitMock } from "@/components/site/PhoneMock";
import { StoreButtons, WaitlistForm, useWaitlist } from "@/components/site/WaitlistForm";
import parkingScene from "@/assets/parking-scene.png";
import transitScene from "@/assets/transit-scene.png";
import driveScene from "@/assets/drive-scene.png";
import voiceScene from "@/assets/voice-scene.png";
import cityScene from "@/assets/city-scene.png";




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
      {/* --------------------------- act 1 · the stage --------------------------- */}
      <section className="sky-wash relative overflow-hidden">
        <TurinMap
          variant="day"
          className="animate-pan absolute inset-0 h-full w-full opacity-[0.12]"
          showRoutes={false}
        />

        <div className="container-site relative pt-8 sm:pt-14">
          <div className="animate-rise mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex rounded-full border border-forest/15 bg-white/70 px-3 py-1 text-grass">
              <Sparkles className="h-3.5 w-3.5" />
              {c.hero.badge}
            </p>

            <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.04] text-forest-deep sm:mt-5 sm:text-5xl lg:text-[4.2rem]">
              {c.hero.title} <span className="text-gold">{c.hero.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[0.95rem] text-forest/70 sm:mt-4 sm:text-lg">
              {c.hero.sub}
            </p>

            <div className="mx-auto mt-5 max-w-lg text-left sm:mt-7">
              <WaitlistForm source="hero" tone="light" />
            </div>

          </div>
        </div>

        <HeroScene />
      </section>


      {/* ------------------------- act 2 · one app, deep green ------------------- */}
      <section className="bg-paper py-12 sm:py-16">
        <div className="container-site">
          <div className="mb-10 flex justify-center">
            <StoreButtons />
          </div>


          <Reveal className="forest-wash block-round block px-6 py-14 text-white sm:px-10 lg:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="max-w-md text-3xl font-extrabold sm:text-4xl lg:text-[2.8rem] lg:leading-[1.05]">
                  {c.pillars.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                  {c.pillars.sub}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {c.pillars.items.map((p) => {
                    const Icon = pillarIcons[p.key as keyof typeof pillarIcons] ?? Navigation;
                    return (
                      <div
                        key={p.key}
                        className="rounded-2xl border border-white/12 bg-white/5 p-4"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-forest-deep">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <h3 className="mt-3 text-sm font-extrabold">{p.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/65">{p.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex items-end justify-center -space-x-14 sm:-space-x-16 lg:-space-x-20">
                <div className="hidden shrink-0 origin-bottom rotate-[-5deg] scale-[0.8] sm:block">
                  <TransitMock />
                </div>
                <div className="z-10 shrink-0 scale-[0.86] sm:scale-100">
                  <DriveMock />
                </div>
                <div className="hidden shrink-0 origin-bottom rotate-[5deg] scale-[0.8] lg:block">
                  <ParkingMock />
                </div>
              </div>


            </div>
          </Reveal>

        </div>
      </section>

      {/* ------------------------ act 3 · parking, cream block ------------------- */}
      <section className="bg-white pb-12 sm:pb-16">
        <div className="container-site">
          <Reveal className="block-round block bg-cream px-6 py-14 sm:px-10 lg:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">

              <div>
                <p className="eyebrow text-grass">{c.parking.kicker}</p>
                <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.06]">
                  {c.parking.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {c.parking.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {c.parking.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-grass" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src={parkingScene}
                  alt="Sezione di una strada con parcheggio sotterraneo"
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full object-contain"
                />
                <div className="absolute left-[6%] top-[8%] rounded-xl bg-forest px-3 py-1.5 text-[0.7rem] font-extrabold text-gold shadow-float">
                  {c.scene.parkBody}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ------------------------- act 4 · transit, gold block ------------------- */}
      <section className="bg-white pb-12 sm:pb-16">
        <div className="container-site">
          <Reveal className="block-round block bg-gold-soft/60 px-6 py-14 sm:px-10 lg:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">

              <div className="lg:order-2">
                <p className="eyebrow text-grass">{c.transit.kicker}</p>
                <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.06]">
                  {c.transit.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {c.transit.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {c.transit.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-grass" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex justify-center lg:order-1">
                <img
                  src={transitScene}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full max-w-md object-contain"
                />
                <div className="absolute bottom-2 left-0 max-w-[70%] rounded-2xl border border-divider bg-white/95 px-3.5 py-2.5 text-[0.72rem] font-extrabold text-ink shadow-float">
                  <span className="mb-0.5 block text-[0.62rem] uppercase tracking-wider text-grass">
                    {c.scene.transitTitle}
                  </span>
                  {c.scene.transitBody}
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </section>


      {/* --------------------------------- drive --------------------------------- */}
      <section className="forest-wash relative overflow-hidden pt-20 text-white">
        <div className="container-site grid gap-12 pb-16 lg:grid-cols-2">
          <Reveal>
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
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={80} className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/5 p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-gold text-2xl font-extrabold text-gold">
                12
              </div>
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[0]}</p>
            </Reveal>
            <Reveal delay={160} className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <TrafficCone className="h-8 w-8 text-gold" />
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[1]}</p>
            </Reveal>
            <Reveal delay={240} className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <Zap className="h-8 w-8 text-gold" />
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[2]}</p>
            </Reveal>
            <Reveal delay={320} className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <Navigation className="h-8 w-8 text-gold" />
              <p className="mt-6 text-sm font-bold text-white/80">{c.drive.points[3]}</p>
            </Reveal>
          </div>
        </div>

        <div className="relative h-[150px] w-full overflow-hidden sm:h-[220px] lg:h-[280px]">
          <img
            src={driveScene}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1536}
            height={640}
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
          />
        </div>
      </section>


      {/* --------------------------------- voice --------------------------------- */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-grass">{c.voice.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{c.voice.title}</h2>
            <p className="mt-4 text-base text-muted-foreground">{c.voice.sub}</p>
            <button onClick={() => open("voice")} className="pill mt-7 bg-grass text-white hover:bg-grass-hover">
              {c.common.joinWaitlist}
              <ArrowRight className="h-4 w-4" />
            </button>
            <img
              src={voiceScene}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={1024}
              height={768}
              className="mt-10 w-full max-w-md object-contain"
            />
          </Reveal>

          <Reveal delay={120} className="rounded-3xl border border-divider bg-paper p-5 sm:p-7">
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
          </Reveal>
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
        <Reveal className="container-site block overflow-hidden rounded-[2rem] border border-divider bg-white">
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
          <img
            src={cityScene}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1536}
            height={560}
            className="h-[110px] w-full min-w-[720px] object-cover object-top sm:h-[150px]"
          />
        </Reveal>
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
