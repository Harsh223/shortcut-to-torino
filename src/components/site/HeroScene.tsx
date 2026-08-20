import { CircleParking, Bus, Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import streetLeft from "@/assets/hero-street-left.png";
import streetRight from "@/assets/hero-street-right.png";
import streetCenter from "@/assets/hero-street-center.png";

/**
 * The hero "stage": a Turin street built along the bottom edge of the viewport,
 * with product UI floating in the world instead of a screenshot on a slab.
 */
export function HeroScene() {
  const { c } = useI18n();
  const s = c.scene;

  return (
    <div className="pointer-events-none relative mt-10 h-[280px] w-full sm:h-[340px] lg:h-[420px]">
      {/* left: Turin porticoes (desktop only) */}
      <img
        src={streetLeft}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="absolute -bottom-2 left-[-6%] hidden w-[38%] max-w-[520px] object-contain object-bottom lg:block"
      />

      {/* right: tram, shelter, bus */}
      <img
        src={streetRight}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="absolute bottom-0 right-[-10%] w-[86%] max-w-[560px] object-contain object-bottom sm:right-[-4%] sm:w-[62%] lg:w-[42%]"
      />

      {/* center: car at the curb + EV charger + traffic light */}
      <img
        src={streetCenter}
        alt=""
        aria-hidden="true"
        width={1024}
        height={768}
        className="absolute bottom-0 left-[-4%] w-[68%] max-w-[440px] object-contain object-bottom sm:left-[6%] sm:w-[44%] lg:left-[26%] lg:w-[30%]"
      />

      {/* the sidewalk line the whole scene stands on */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-forest/15" />

      {/* ------------------------- proof, hidden as props ------------------------ */}
      <SceneBadge className="left-[2%] top-[2%] hidden lg:flex" tone="gold">
        {s.billboard}
      </SceneBadge>
      <SceneBadge className="right-[4%] top-[6%] hidden sm:flex" tone="forest">
        {s.shelter}
      </SceneBadge>

      {/* ---------------------- product UI floating in the street ---------------- */}
      <div className="animate-float absolute left-[2%] top-[24%] sm:left-[8%] lg:left-[22%]">
        <div className="flex items-center gap-2 rounded-full bg-forest px-3.5 py-2 text-xs font-extrabold text-gold shadow-float">
          <Timer className="h-3.5 w-3.5" />
          {s.light}
        </div>
      </div>

      <div
        className="animate-float absolute right-[2%] top-[26%] w-[54%] max-w-[230px] sm:right-[8%] lg:right-[24%]"
        style={{ animationDelay: "1.2s" }}
      >
        <SceneCard icon={<CircleParking className="h-4 w-4" />} title={s.parkTitle} body={s.parkBody} />
      </div>

      <div
        className="animate-float absolute bottom-[30%] left-[30%] hidden w-[240px] lg:block"
        style={{ animationDelay: "2.1s" }}
      >
        <SceneCard icon={<Bus className="h-4 w-4" />} title={s.transitTitle} body={s.transitBody} />
      </div>
    </div>
  );
}

function SceneCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-divider bg-white/95 p-3 shadow-float backdrop-blur">
      <div className="flex items-center gap-2 text-xs font-extrabold text-ink">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-forest text-gold">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-1.5 text-[0.7rem] font-semibold leading-snug text-muted-foreground">{body}</p>
    </div>
  );
}

function SceneBadge({
  children,
  className = "",
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "forest";
}) {
  return (
    <span
      className={`absolute inline-flex items-center rounded-xl px-3 py-1.5 text-[0.7rem] font-extrabold shadow-chrome ${
        tone === "gold" ? "bg-gold text-forest-deep" : "bg-forest text-gold"
      } ${className}`}
    >
      {children}
    </span>
  );
}
