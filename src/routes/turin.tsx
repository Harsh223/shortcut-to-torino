import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { TurinMap } from "@/components/site/TurinMap";

export const Route = createFileRoute("/turin")({
  head: () => ({
    meta: [
      { title: "Turin — Why Shortcut starts here" },
      {
        name: "description",
        content:
          "GTT, ZTL, the Po, the hills and summer shade. How Shortcut stays honest with Torino's city data: live, scheduled, or nothing at all.",
      },
      { property: "og:title", content: "Turin — Why Shortcut starts here" },
      {
        property: "og:description",
        content:
          "Built for Torino: GTT trips, ZTL warnings, curb occupancy and shaded walks — with an honest table of what we actually show.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/turin" },
    ],
    links: [{ rel: "canonical", href: "/turin" }],
  }),
  component: TurinPage,
});

function TurinPage() {
  const { c } = useI18n();
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep py-24">
        <TurinMap className="absolute inset-0 h-full w-full opacity-50" showRoutes={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 to-navy-deep/95" />
        <div className="container-site relative max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{c.turinPage.title}</h1>
          <p className="mt-4 text-lg text-white/75">{c.turinPage.sub}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid max-w-4xl gap-6 text-base leading-relaxed text-muted-foreground">
          <p>{c.turinPage.body1}</p>
          <p>{c.turinPage.body2}</p>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{c.turinPage.honestyTitle}</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-divider bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-divider bg-paper">
                  {c.turinPage.honestyCols.map((h) => (
                    <th key={h} className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.turinPage.honestyRows.map((row) => (
                  <tr key={row[0]} className="border-b border-divider last:border-0">
                    <td className="px-5 py-4 font-bold text-ink">{row[0]}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm font-semibold text-ink">{c.turinPage.expand}</p>
        </div>
      </section>
    </>
  );
}
