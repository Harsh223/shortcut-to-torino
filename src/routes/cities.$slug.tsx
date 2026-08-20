import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Navigation, Bus, CircleParking } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CITIES, cityCopy, getCity } from "@/lib/cities";
import { CityStage, CityStrip } from "@/components/site/CityStage";
import { Reveal } from "@/components/site/Reveal";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { cityUi } from "@/lib/cities";

export const Route = createFileRoute("/cities/$slug")({
  loader: ({ params }) => {
    const city = getCity(params.slug);
    if (!city) throw notFound();
    return { name: city.name, region: city.region, title: city.en.headlineAccent };
  },
  head: ({ params, loaderData }) => {
    const url = `https://shortcut-to-torino.lovable.app/cities/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [{ title: "City not found — Shortcut" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} — Shortcut parking, transit and driving`;
    const description = `How Shortcut works in ${loaderData.name} (${loaderData.region}): live parking, corrected transit times, restricted-zone alerts, traffic-light countdowns and EV charging.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `Shortcut in ${loaderData.name}` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: CityNotFound,
  component: CityPage,
});

function CityNotFound() {
  const { lang } = useI18n();
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-extrabold text-ink">
        {lang === "it" ? "Città non trovata" : "City not found"}
      </h1>
      <Link to="/cities" className="pill mt-6 bg-grass text-white">
        {cityUi[lang].allCities}
      </Link>
    </div>
  );
}

function CityPage() {
  const { slug } = Route.useParams();
  const { lang } = useI18n();
  const ui = cityUi[lang];
  const city = getCity(slug);

  if (!city) return <CityNotFound />;
  const cc = cityCopy(city, lang);

  const index = CITIES.findIndex((c) => c.slug === city.slug);
  const next = CITIES[(index + 1) % CITIES.length];

  const acts = [
    { act: cc.access, Icon: CircleParking },
    { act: cc.transit, Icon: Bus },
    { act: cc.drive, Icon: Navigation },
  ];

  return (
    <>
      {/* ------------------------------ act 1 · arrival ----------------------------- */}
      <section className="sky-wash relative flex min-h-[calc(100svh-68px)] flex-col overflow-hidden">
        <div className="container-site relative z-30 pt-5 sm:pt-8">
          <div className="animate-rise mx-auto max-w-3xl text-center">
            <Link
              to="/cities"
              className="eyebrow inline-flex rounded-full border border-forest/15 bg-white/70 px-3 py-1 text-grass hover:bg-white"
            >
              <MapPin className="h-3.5 w-3.5" />
              {ui.allCities}
            </Link>
            <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.04] text-forest-deep sm:text-5xl lg:text-[4rem]">
              {cc.headline} <span className="text-gold">{cc.headlineAccent}</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[0.95rem] text-forest/70 sm:text-lg">
              {cc.sub}
            </p>
            <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-forest/55">
              <span className="rounded-full bg-white/70 px-3 py-1">{cc.status}</span>
              <span className="rounded-full bg-white/70 px-3 py-1">
                {ui.operator}: {city.operator}
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1">{city.region}</span>
            </p>
          </div>
        </div>

        <CityStage src={city.band} alt={city.alt[lang]} chips={cc.chips} />
      </section>

      {/* ------------------------------ act 2 · reality ----------------------------- */}
      <section className="bg-paper py-14 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-grass">{cc.reality.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.06]">
              {cc.reality.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {cc.reality.body}
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {cc.facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={80 + i * 80}
                className="rounded-3xl border border-divider bg-white p-5"
              >
                <p className="text-2xl font-extrabold text-forest-deep">{f.value}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-muted-foreground">
                  {f.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- acts 3-5 · the story --------------------------- */}
      {acts.map(({ act, Icon }, i) => {
        const dark = i === 2;
        const tone = dark ? "forest-wash text-white" : i === 1 ? "bg-gold-soft/50" : "bg-cream";
        return (
          <section key={act.kicker} className={`${tone} py-14 sm:py-20`}>
            <div className="container-site grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <Reveal className={i === 1 ? "lg:order-2" : ""}>
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                    dark ? "bg-gold text-forest-deep" : "bg-forest text-gold"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className={`eyebrow mt-4 ${dark ? "text-gold" : "text-grass"}`}>{act.kicker}</p>
                <h2
                  className={`mt-2 text-3xl font-extrabold sm:text-4xl ${dark ? "" : "text-ink"}`}
                >
                  {act.title}
                </h2>
                <p
                  className={`mt-4 max-w-xl text-base leading-relaxed ${
                    dark ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {act.body}
                </p>
              </Reveal>

              <ul className={`grid gap-3 sm:grid-cols-2 ${i === 1 ? "lg:order-1" : ""}`}>
                {act.points.map((p, j) => (
                  <Reveal
                    key={p}
                    delay={60 + j * 70}
                    as="li"
                    className={`flex items-start gap-2.5 rounded-2xl border p-4 text-sm font-semibold ${
                      dark
                        ? "border-white/15 bg-white/5 text-white/85"
                        : "border-divider bg-white text-ink"
                    }`}
                  >
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-gold" : "text-grass"}`} />
                    {p}
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ------------------------------- act 6 · cta -------------------------------- */}
      <section className="bg-white pt-14 sm:pt-20">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">{cc.closing.title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{cc.closing.body}</p>
          <div className="mx-auto mt-7 max-w-xl text-left">
            <WaitlistForm source={`city-${city.slug}`} initialCity={city.name} />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground">
            {ui.honest}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/cities" className="pill border border-divider text-ink hover:bg-cream">
              {ui.back}
            </Link>
            <Link
              to="/cities/$slug"
              params={{ slug: next.slug }}
              className="pill bg-grass text-white hover:bg-grass-hover"
            >
              {ui.nextCity}: {next.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <CityStrip src={next.band} className="mt-12" />
      </section>
    </>
  );
}
