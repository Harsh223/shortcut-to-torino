import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Car,
  Bus,
  Footprints,
  Bike,
  ParkingSquare,
  Zap,
  Check,
  ArrowRight,
  MapPin,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { TurinMap } from "@/components/site/TurinMap";
import { DriveMock, TransitMock, WalkMock } from "@/components/site/PhoneMock";
import { WaitlistForm } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shortcut — The shortcut through Turin" },
      {
        name: "description",
        content:
          "Maps, GTT, walking, parking and charging for Torino. Sign-in optional. We don't fake live data.",
      },
      { property: "og:title", content: "Shortcut — The shortcut through Turin" },
      {
        property: "og:description",
        content:
          "Maps, GTT, walking, parking and charging for Torino. Sign-in optional. We don't fake live data.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const MODE_ICONS = [Car, Bus, Footprints, Bike, ParkingSquare, Zap];

function Home() {
  const { c } = useI18n();
  const [layers, setLayers] = useState<Record<string, boolean>>({
    parking: true,
    charging: true,
    transit: true,
    micromobility: false,
    traffic: true,
    signals: false,
  });
  const layerKeys = ["parking", "charging", "transit", "micromobility", "traffic", "signals"];

  const titleWords = c.hero.title.split(" ");
  const lastWord = titleWords.pop() ?? "";
  const leadWords = titleWords.join(" ");


  return (
    <>
      {/* HERO — bright sky, city rising from the bottom */}
      <section className="sky-wash relative overflow-hidden">
        <div className="container-site relative z-10 pt-16 pb-8 text-center sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-extrabold text-forest shadow-chrome">
            <MapPin className="h-3.5 w-3.5 text-grass" />
            {c.hero.badge}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-[2.8rem] font-extrabold leading-[0.98] text-forest-deep sm:text-7xl">
            {head} <span className="text-amber">{restTitle.join(" ")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-forest/75">
            {c.hero.sub}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/download" className="pill bg-grass text-white shadow-float hover:bg-grass-hover">
              {c.nav.cta}
            </Link>
            <Link
              to="/features"
              className="pill bg-white/80 text-forest hover:bg-white"
            >
              {c.turinBlock.cta}
            </Link>
          </div>
          <p className="mt-5 text-sm font-semibold text-forest/55">{c.common.honesty}</p>
        </div>

        {/* floating app chrome + city map */}
        <div className="relative mt-6">
          <div className="container-site relative z-10 flex flex-wrap items-end justify-center gap-3 pb-6 sm:justify-between">
            <div className="rounded-3xl bg-white p-4 shadow-float">
              <p className="text-xs font-extrabold uppercase tracking-wider text-grass">GTT</p>
              <p className="mt-1 text-2xl font-extrabold text-forest-deep">{c.hero.dock}</p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              {c.hero.modes.map((m, i) => (
                <span
                  key={m}
                  className={`rounded-full px-4 py-2.5 text-sm font-extrabold shadow-chrome ${
                    i === 0 ? "bg-forest text-white" : "bg-white text-forest"
                  }`}
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="rounded-3xl bg-amber p-4 shadow-float">
              <p className="text-xl font-extrabold text-forest-deep">{c.hero.banner}</p>
            </div>
          </div>
          <div className="relative h-[300px] w-full overflow-hidden sm:h-[380px]">
            <TurinMap variant="day" className="h-full w-full" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* MODES */}
      <section className="bg-white py-20">
        <div className="container-site">
          <h2 className="max-w-3xl text-4xl font-extrabold text-forest-deep sm:text-5xl">
            {c.modes.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-forest/70">{c.modes.sub}</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.modes.items.map((m, i) => {
              const Icon = MODE_ICONS[i] ?? Car;
              return (
                <div
                  key={m.name}
                  className="rounded-3xl bg-cream p-7 transition-transform hover:-translate-y-1"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-grass text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-lg font-extrabold text-forest-deep">{m.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-forest/70">{m.line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORIES — big green card */}
      <section className="bg-white pb-20">
        <div className="container-site">
          <div className="rounded-[2.5rem] bg-forest px-6 py-16 text-white sm:px-12">
            <h2 className="max-w-3xl text-4xl font-extrabold sm:text-5xl">{c.stories.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/75">{c.stories.sub}</p>

            <div className="mt-14 space-y-20">
              {[
                { s: c.stories.a, mock: <DriveMock />, flip: false },
                { s: c.stories.b, mock: <TransitMock />, flip: true },
                { s: c.stories.c, mock: <WalkMock />, flip: false },
              ].map(({ s, mock, flip }) => (
                <div key={s.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={flip ? "lg:order-2" : ""}>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-amber">
                      {s.kicker}
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold">{s.title}</h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
                      {s.body}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm font-bold">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>{mock}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section className="bg-cream py-20">
        <div className="container-site">
          <h2 className="text-4xl font-extrabold text-forest-deep sm:text-5xl">{c.layers.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-forest/70">{c.layers.sub}</p>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {c.layers.chips.map((chip, i) => {
              const key = layerKeys[i] ?? "traffic";
              const active = layers[key];
              return (
                <button
                  key={chip}
                  onClick={() => setLayers((l) => ({ ...l, [key]: !l[key] }))}
                  aria-pressed={active}
                  className={`chip ${active ? "!bg-forest !text-white !border-forest" : ""}`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-chrome">
            <TurinMap variant="day" layers={layers} className="h-[420px] w-full" />
          </div>
          <p className="mt-3 text-xs font-semibold text-forest/60">{c.layers.caption}</p>
        </div>
      </section>

      {/* ACCOUNT */}
      <section className="bg-white py-20">
        <div className="container-site">
          <h2 className="text-4xl font-extrabold text-forest-deep sm:text-5xl">
            {c.account.title}
          </h2>
          <p className="mt-4 text-lg text-forest/70">{c.account.sub}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[c.account.free, c.account.saved].map((col, i) => (
              <div
                key={col.title}
                className={`rounded-[2rem] p-8 ${
                  i === 0 ? "bg-grass text-white" : "bg-cream text-forest-deep"
                }`}
              >
                <h3 className="text-2xl font-extrabold">{col.title}</h3>
                <ul className="mt-6 space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-sm font-bold ${
                        i === 0 ? "text-white/90" : "text-forest/85"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${i === 0 ? "text-white" : "text-grass"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TURIN */}
      <section className="bg-white pb-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem]">
            <TurinMap variant="day" showRoutes={false} className="h-[320px] w-full" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-forest-deep sm:text-5xl">
              {c.turinBlock.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-forest/70">
              {c.turinBlock.body}
            </p>
            <Link to="/turin" className="pill mt-7 bg-cream text-forest hover:bg-divider">
              {c.turinBlock.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="bg-white pb-20">
        <div className="container-site">
          <div className="rounded-[2.5rem] bg-forest-deep px-6 py-16 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-4xl font-extrabold text-white sm:text-5xl">
              {c.waitlist.title}
            </h2>
            <p className="mt-4 text-lg text-white/70">{c.waitlist.sub}</p>
            <div className="mx-auto mt-9 max-w-2xl rounded-[2rem] bg-white p-5 text-left shadow-float">
              <WaitlistForm />
            </div>
            <p className="mt-6 text-xs font-semibold text-white/50">
              {c.common.comingSoon} · {c.common.placeholderIos} · {c.common.placeholderAndroid}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-20">
        <div className="container-site max-w-3xl">
          <h2 className="text-4xl font-extrabold text-forest-deep sm:text-5xl">{c.faq.title}</h2>
          <Accordion type="single" collapsible className="mt-8">
            {c.faq.items.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-divider">
                <AccordionTrigger className="text-left text-base font-extrabold text-forest-deep">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-forest/70">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
