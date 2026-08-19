import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ExploreMock } from "@/components/site/PhoneMock";
import { WaitlistForm, StoreButtons } from "@/components/site/WaitlistForm";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download Shortcut — iPhone and Android" },
      {
        name: "description",
        content:
          "Get Shortcut for iPhone and Android. One map for driving, GTT, walking, parking and charging in Torino. Sign-in optional.",
      },
      { property: "og:title", content: "Download Shortcut — iPhone and Android" },
      {
        property: "og:description",
        content: "Join the list and we'll send the link when Shortcut is on your store.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/download" },
    ],
    links: [{ rel: "canonical", href: "/download" }],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const { c } = useI18n();
  return (
    <>
      <section className="bg-navy-deep py-20">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              {c.downloadPage.title}
            </h1>
            <p className="mt-4 text-lg text-white/70">{c.downloadPage.sub}</p>
            <div className="mt-8">
              <StoreButtons tone="dark" />
            </div>
            <p className="mt-4 text-xs font-medium text-white/50">
              {c.common.comingSoon} · {c.common.placeholderIos} · {c.common.placeholderAndroid}
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/15 p-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/25 text-center text-[0.6rem] font-bold text-white/50">
                {c.downloadPage.qr}
              </div>
              <p className="text-sm text-white/60">{c.downloadPage.qrNote}</p>
            </div>
          </div>
          <ExploreMock />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{c.waitlist.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{c.waitlist.sub}</p>
            <div className="mt-6">
              <WaitlistForm />
            </div>
          </div>
          <div className="rounded-3xl border border-divider bg-paper p-7">
            <h2 className="text-lg font-extrabold text-ink">{c.downloadPage.reqTitle}</h2>
            <ul className="mt-4 space-y-3">
              {c.downloadPage.req.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
