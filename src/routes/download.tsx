import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { CityStage, CityStrip } from "@/components/site/CityStage";
import { CityScene } from "@/components/site/CityArt";
import { WaitlistForm, StoreButtons } from "@/components/site/WaitlistForm";
import { waitlistArt, productArt } from "@/lib/product-art";

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
  const { c, lang } = useI18n();
  const d = c.downloadPage;

  return (
    <>
      {/* Act 1 — the stage */}
      <section className="forest-wash relative flex min-h-[86svh] flex-col overflow-hidden pt-14 text-white sm:pt-16">
        <div className="container-site relative z-10 text-center">
          <Reveal>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {d.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{d.sub}</p>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-7 max-w-lg">
            <WaitlistForm source="waitlist-page" tone="dark" />
          </Reveal>
        </div>

        <CityStage
          src={waitlistArt.hero.src}
          alt={waitlistArt.hero.alt[lang]}
          chips={[...d.chips]}
        />
      </section>

      {/* Act 2 — what joining means */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">{d.dayOne.title}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {d.dayOne.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 110} className="card-soft h-full">
                <h3 className="text-base font-extrabold text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Act 3 — the road to launch */}
      <section className="bg-forest-deep py-20 text-white sm:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <CityScene
              src={productArt.hero.src}
              alt={productArt.hero.alt[lang]}
              marks={[c.hero.badge, c.common.comingSoon]}
              tone="dark"
            />
          </Reveal>
          <Reveal delay={120} className="lg:order-1">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{d.steps.title}</h2>
            <ol className="mt-8 space-y-6">
              {d.steps.items.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="text-sm font-extrabold text-gold">{s.n}</span>
                  <div>
                    <p className="font-extrabold">{s.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Act 4 — requirements + stores */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">{d.reqTitle}</h2>
            <ul className="mt-6 space-y-3">
              {d.req.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink/80">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-forest">{d.storesTitle}</p>
            <div className="mt-4">
              <StoreButtons />
            </div>
            <div className="mt-8">
              <CityScene
                src={productArt.voice.src}
                alt={productArt.voice.alt[lang]}
                marks={[c.voice.kicker, c.scene.light]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Act 5 — closing, blue hour */}
      <section className="relative overflow-hidden bg-forest-deep pt-20 text-white sm:pt-24">
        <div className="container-site text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">{d.closing.title}</h2>
            <p className="mt-3 text-lg text-white/70">{d.closing.body}</p>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-8 max-w-lg">
            <WaitlistForm source="waitlist-closing" tone="dark" />
          </Reveal>
        </div>
        <CityStrip src={waitlistArt.launch.src} className="mt-14 [&>div]:hidden" />
      </section>
    </>
  );
}
