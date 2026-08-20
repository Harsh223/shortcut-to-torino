import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ParkingMock } from "@/components/site/PhoneMock";
import { WaitlistForm, StoreButtons } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Waitlist — Get Shortcut at launch" },
      {
        name: "description",
        content:
          "Shortcut launches next month on iPhone and Android. Join the waitlist and get the download link on day one.",
      },
      { property: "og:title", content: "Join the Shortcut waitlist" },
      {
        property: "og:description",
        content: "We'll email you the moment Shortcut is on the App Store and Google Play.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/download" }],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const { c } = useI18n();
  return (
    <>
      <section className="forest-wash py-16 text-white sm:py-20">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow inline-flex rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-gold">
              {c.common.comingSoon}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">{c.downloadPage.title}</h1>
            <p className="mt-4 text-lg text-white/70">{c.downloadPage.sub}</p>

            <div className="mt-8 max-w-lg">
              <WaitlistForm source="waitlist-page" tone="dark" stacked />
            </div>

            <p className="mt-8 text-xs font-extrabold uppercase tracking-wider text-white/45">
              {c.downloadPage.storesTitle}
            </p>
            <div className="mt-3">
              <StoreButtons tone="dark" />
            </div>
          </div>
          <div className="animate-float mx-auto">
            <ParkingMock />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-divider bg-paper p-7">
            <h2 className="text-lg font-extrabold text-ink">{c.downloadPage.reqTitle}</h2>
            <ul className="mt-4 space-y-3">
              {c.downloadPage.req.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-grass" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-divider p-7">
            <h2 className="text-lg font-extrabold text-ink">{c.faq.title}</h2>
            <div className="mt-4 divide-y divide-divider">
              {c.faq.items.slice(0, 4).map((f) => (
                <details key={f.q} className="group py-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-ink">
                    {f.q}
                    <span className="text-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
