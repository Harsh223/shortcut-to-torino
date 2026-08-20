import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CITIES, cityCopy, cityUi } from "@/lib/cities";
import { Reveal } from "@/components/site/Reveal";
import { WaitlistForm } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/cities/")({
  head: () => ({
    meta: [
      { title: "Cities — Shortcut in Italy's 14 largest cities" },
      {
        name: "description",
        content:
          "How Shortcut works city by city: parking, transit, driving and charging in Rome, Milan, Naples, Turin, Palermo, Genoa, Bologna, Florence and more.",
      },
      { property: "og:title", content: "Fourteen cities, one at a time" },
      {
        property: "og:description",
        content:
          "Local rules, local transit, local data. A dedicated Shortcut page for each of Italy's biggest cities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shortcut-to-torino.lovable.app/cities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://shortcut-to-torino.lovable.app/cities" }],
  }),
  component: CitiesIndex,
});

function CitiesIndex() {
  const { lang } = useI18n();
  const ui = cityUi[lang];

  return (
    <>
      <section className="sky-wash relative overflow-hidden py-14 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow inline-flex rounded-full border border-forest/15 bg-white/70 px-3 py-1 text-grass">
            <MapPin className="h-3.5 w-3.5" />
            {ui.menuTitle}
          </p>
          <h1 className="mt-3 text-[2.1rem] font-extrabold leading-[1.05] text-forest-deep sm:text-5xl">
            {ui.directoryTitle}
          </h1>
          <p className="mt-4 text-base text-forest/70 sm:text-lg">{ui.directorySub}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest/60">
            {ui.directoryBody}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city, i) => {
            const cc = cityCopy(city, lang);
            return (
              <Reveal key={city.slug} delay={(i % 3) * 70}>
                <Link
                  to="/cities/$slug"
                  params={{ slug: city.slug }}
                  className="group block overflow-hidden rounded-3xl border border-divider bg-white transition-shadow hover:shadow-float"
                >
                  <div className="relative h-32 overflow-hidden bg-cream sm:h-36">
                    <img
                      src={city.band}
                      alt={city.alt[lang]}
                      loading="lazy"
                      width={1920}
                      height={720}
                      className="absolute bottom-0 left-1/2 h-[150%] w-auto min-w-full max-w-none -translate-x-1/2 object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider text-gold">
                      {cc.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-extrabold text-ink">{city.name}</h2>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-grass">
                      {city.region} · {city.operator}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cc.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink">
                      {ui.open}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="container-site max-w-3xl rounded-3xl border border-divider bg-white p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold text-ink">{ui.waitlistTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{ui.waitlistBody}</p>
          <div className="mt-6">
            <WaitlistForm source="cities-index" stacked />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{ui.honest}</p>
        </div>
      </section>
    </>
  );
}
