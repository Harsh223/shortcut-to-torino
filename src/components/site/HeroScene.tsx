import { CircleParking, Bus, Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import streetLeft from "@/assets/hero-street-left.png";
import streetRight from "@/assets/hero-street-right.png";
import streetCenter from "@/assets/hero-street-center.png";

/**
 * The hero "stage": a Turin street welded to the bottom edge of the hero
 * section. The art is scaled by HEIGHT and cropped horizontally (like
 * transitapp.com) so buildings never shrink to nothing on small screens.
 */
export function HeroScene() {
  const { c } = useI18n();
  const s = c.scene;

  return (
    <div className="relative mt-8 w-full sm:mt-10">
      {/* floating product UI, above the street */}
      <div className="container-site pointer-events-none relative z-20">
        <div className="relative h-[92px] sm:h-[110px]">
          <div className="animate-float absolute left-0 top-0 sm:left-[4%]">
            <div className="flex items-center gap-2 rounded-full bg-forest px-3.5 py-2 text-xs font-extrabold text-gold shadow-float">
              <Timer className="h-3.5 w-3.5" />
              {s.light}
            </div>
          </div>

          <div
            className="animate-float absolute right-0 top-2 w-[58%] max-w-[240px] sm:right-[4%]"
            style={{ animationDelay: "1.2s" }}
          >
            <SceneCard icon={<CircleParking className="h-4 w-4" />} title={s.parkTitle} body={s.parkBody} />
          </div>

          <div
            className="animate-float absolute bottom-[-30px] left-1/2 hidden w-[250px] -translate-x-1/2 lg:block"
            style={{ animationDelay: "2.1s" }}
          >
            <SceneCard icon={<Bus className="h-4 w-4" />} title={s.transitTitle} body={s.transitBody} />
          </div>
        </div>
      </div>

      {/* the street band: full-bleed, height-scaled, cropped at the sides */}
      <div className="relative h-[190px] w-full overflow-hidden sm:h-[260px] lg:h-[360px]">
        {/* proof, hidden as props */}
        <div className="container-site pointer-events-none relative z-10 flex justify-between">
          <SceneBadge tone="gold" className="hidden lg:inline-flex">
            {s.billboard}
          </SceneBadge>
          <SceneBadge tone="forest" className="ml-auto hidden sm:inline-flex">
            {s.shelter}
          </SceneBadge>
        </div>

        {/* left: Turin porticoes */}
        <img
          src={streetLeft}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="absolute bottom-0 left-[-14%] hidden h-[86%] w-auto max-w-none object-contain object-bottom md:left-[-6%] md:block lg:left-0"
        />

        {/* right: tram, shelter, bus */}
        <img
          src={streetRight}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="absolute bottom-0 right-[-22%] h-[92%] w-auto max-w-none object-contain object-bottom sm:right-[-10%] lg:right-0"
        />

        {/* center: car at the curb + EV charger + traffic light */}
        <img
          src={streetCenter}
          alt=""
          aria-hidden="true"
          width={1024}
          height={768}
          className="absolute bottom-0 left-[-16%] h-[70%] w-auto max-w-none object-contain object-bottom sm:left-[2%] lg:left-[26%]"
        />

        {/* the sidewalk line the whole scene stands on */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-forest/15" />
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
      className={`inline-flex items-center rounded-xl px-3 py-1.5 text-[0.7rem] font-extrabold shadow-chrome ${
        tone === "gold" ? "bg-gold text-forest-deep" : "bg-forest text-gold"
      } ${className}`}
    >
      {children}
    </span>
  );
}
