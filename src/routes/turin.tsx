import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { TurinMap } from "@/components/site/TurinMap";
import { WaitlistForm } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/turin")({
  head: () => ({
    meta: [
      { title: "Cities — Shortcut launches in Turin first" },
      {
        name: "description",
        content:
          "Shortcut starts in Turin and its metro area with local parking, transit and traffic data, then expands city by city. Request your city.",
      },
      { property: "og:title", content: "Turin first, then the rest" },
      {
        property: "og:description",
        content: "We build city by city, with each city's parking, transit and traffic data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/turin" }],
  }),
  component: CitiesPage,
});

function CitiesPage() {
  const { c } = useI18n();
  return (
    <>
      <section className="forest-wash relative overflow-hidden py-16 text-white sm:py-24">
        <TurinMap variant="night" className="absolute inset-0 h-full w-full opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-transparent" />
        <div className="container-site relative max-w-2xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{c.citiesPage.title}</h1>
          <p className="mt-4 text-lg text-white/70">{c.citiesPage.sub}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {c.citiesPage.body}
            </p>
            <h2 className="mt-10 text-xl font-extrabold text-ink">{c.citiesPage.statusTitle}</h2>
            <div className="mt-4 overflow-hidden rounded-3xl border border-divider">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream text-xs font-extrabold uppercase tracking-wider text-ink/60">
                  <tr>
                    {c.citiesPage.statusCols.map((h) => (
                      <th key={h} className="px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  {c.citiesPage.rows.map((row) => (
                    <tr key={row[0]}>
                      <td className="px-5 py-3.5 font-extrabold text-ink">{row[0]}</td>
                      <td className="px-5 py-3.5 font-semibold text-muted-foreground">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-divider bg-paper p-7">
            <h2 className="text-lg font-extrabold text-ink">{c.citiesPage.askTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.citiesPage.askBody}</p>
            <div className="mt-5">
              <WaitlistForm source="cities" stacked />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
