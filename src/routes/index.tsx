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
import { WaitlistForm, StoreButtons, StorePlaceholders } from "@/components/site/WaitlistForm";

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

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden bg-navy-deep">
        <div className="absolute inset-0">
          <TurinMap className="h-full w-full animate-pan opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/55 to-navy-deep/95" />
        </div>

        <div className="container-site relative grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/80">
              <MapPin className="h-3.5 w-3.5 text-teal" />
              {c.hero.badge}
            </span>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.03] text-white sm:text-6xl">
              {c.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{c.hero.sub}</p>
            <div className="mt-8">
              <StoreButtons tone="dark" />
            </div>
            <p className="mt-4 text-sm font-medium text-white/55">{c.common.honesty}</p>
          </div>

          {/* in-app chrome floating over the map */}
          <div className="relative min-h-[420px]">
            <div className="mx-auto max-w-sm space-y-3">
              <div className="rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-muted-foreground shadow-float">
                {c.hero.search}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {c.hero.modes.map((m, i) => (
                  <span
                    key={m}
                    className={`rounded-full px-4 py-2 text-sm font-bold shadow-chrome ${
                      i === 0 ? "bg-azure text-white" : "border border-divider bg-white text-ink"
                    }`}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-navy-deep/95 p-4 shadow-float ring-1 ring-white/10">
                <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" aria-hidden="true">
                  <path
                    d="M6 20V11a3 3 0 013-3h7"
                    stroke="#2F7BFF"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 4.5L17.5 8L13 11.5"
                    stroke="#2F7BFF"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-xl font-extrabold text-white">{c.hero.banner}</p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-float">
                <p className="text-lg font-extrabold text-ink">{c.hero.dock}</p>
                <span className="rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink">
                  {c.hero.exit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODES */}
      <section className="bg-white py-20">
        <div className="container-site">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{c.modes.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.modes.sub}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.modes.items.map((m, i) => {
              const Icon = MODE_ICONS[i] ?? Car;
              return (
                <div
                  key={m.name}
                  className="rounded-2xl border border-divider bg-paper p-5 transition-shadow hover:shadow-chrome"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-azure shadow-chrome">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-base font-extrabold text-ink">{m.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-paper py-20">
        <div className="container-site">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{c.stories.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.stories.sub}</p>

          <div className="mt-14 space-y-20">
            {[
              { s: c.stories.a, mock: <DriveMock />, flip: false },
              { s: c.stories.b, mock: <TransitMock />, flip: true },
              { s: c.stories.c, mock: <WalkMock />, flip: false },
            ].map(({ s, mock, flip }) => (
              <div
                key={s.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <p className="text-xs font-bold uppercase tracking-widest text-azure">
                    {s.kicker}
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{s.title}</h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
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
      </section>

      {/* LAYERS */}
      <section className="bg-white py-20">
        <div className="container-site">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{c.layers.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">{c.layers.sub}</p>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {c.layers.chips.map((chip, i) => {
              const key = layerKeys[i] ?? "traffic";
              const active = layers[key];
              return (
                <button
                  key={chip}
                  onClick={() => setLayers((l) => ({ ...l, [key]: !l[key] }))}
                  aria-pressed={active}
                  className={`chip ${active ? "!bg-azure !text-white !border-azure" : ""}`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-divider bg-paper shadow-chrome">
            <TurinMap variant="day" layers={layers} className="h-[420px] w-full" />
          </div>
          <p className="mt-3 text-xs font-medium text-muted-foreground">{c.layers.caption}</p>
        </div>
      </section>

      {/* ACCOUNT */}
      <section className="bg-paper py-20">
        <div className="container-site">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{c.account.title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{c.account.sub}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[c.account.free, c.account.saved].map((col, i) => (
              <div
                key={col.title}
                className={`rounded-3xl p-7 ${
                  i === 0 ? "bg-navy text-white" : "border border-divider bg-white"
                }`}
              >
                <h3 className={`text-xl font-extrabold ${i === 0 ? "text-white" : "text-ink"}`}>
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-sm font-semibold ${
                        i === 0 ? "text-white/85" : "text-ink"
                      }`}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
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
      <section className="bg-white py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-divider">
            <TurinMap variant="day" showRoutes={false} className="h-[320px] w-full" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{c.turinBlock.title}</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              {c.turinBlock.body}
            </p>
            <Link
              to="/turin"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-divider bg-white px-6 text-sm font-bold text-ink transition-colors hover:bg-paper"
            >
              {c.turinBlock.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="bg-navy py-20">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{c.waitlist.title}</h2>
          <p className="mt-3 text-base text-white/70">{c.waitlist.sub}</p>
          <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-white p-5 text-left shadow-float">
            <WaitlistForm />
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <StoreButtons tone="dark" />
            <p className="text-xs font-medium text-white/50">
              {c.common.comingSoon} · {c.common.placeholderIos} · {c.common.placeholderAndroid}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="container-site max-w-3xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{c.faq.title}</h2>
          <Accordion type="single" collapsible className="mt-8">
            {c.faq.items.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-divider">
                <AccordionTrigger className="text-left text-base font-extrabold text-ink">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
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
