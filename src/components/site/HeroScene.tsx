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
    <div className="relative mt-2 w-full shrink-0 sm:mt-3">
      {/* the street band: full-bleed, height-scaled, cropped at the sides */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[min(35svh,250px)] lg:h-[min(38svh,300px)]">
        {/* floating product UI, over the street */}
        <div className="container-site pointer-events-none absolute inset-x-0 top-0 z-20">
          <div className="relative h-[74px] sm:h-[96px]">
            <div className="animate-float absolute left-0 top-0 sm:left-[2%]">
              <div className="flex items-center gap-2 rounded-full bg-forest px-3 py-1.5 text-[0.7rem] font-extrabold text-gold shadow-float sm:px-3.5 sm:py-2 sm:text-xs">
                <Timer className="h-3.5 w-3.5" />
                {s.light}
              </div>
            </div>

            <div
              className="animate-float absolute right-0 top-0 w-[54%] max-w-[230px] sm:right-[2%]"
              style={{ animationDelay: "1.2s" }}
            >
              <SceneCard icon={<CircleParking className="h-4 w-4" />} title={s.parkTitle} body={s.parkBody} />
            </div>

            <div
              className="animate-float absolute bottom-[-24px] left-1/2 hidden w-[250px] -translate-x-1/2 lg:block"
              style={{ animationDelay: "2.1s" }}
            >
              <SceneCard icon={<Bus className="h-4 w-4" />} title={s.transitTitle} body={s.transitBody} />
            </div>
          </div>
        </div>

        <div className="container-site pointer-events-none absolute inset-x-0 top-[86px] z-10 hidden justify-between sm:flex">
          <SceneBadge tone="gold" className="hidden lg:inline-flex">
            {s.billboard}
          </SceneBadge>
          <SceneBadge tone="forest" className="ml-auto">
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
           className="absolute bottom-0 left-[-32%] h-[88%] w-auto max-w-none object-contain object-bottom sm:left-[-16%] sm:h-[90%] md:left-[-6%] lg:left-0"
        />

        {/* right: tram, shelter, bus */}
        <img
          src={streetRight}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
           className="absolute bottom-0 right-[-30%] h-[88%] w-auto max-w-none object-contain object-bottom sm:right-[-12%] sm:h-[96%] lg:right-0"
        />

        {/* center: car at the curb + EV charger + traffic light */}
        <img
          src={streetCenter}
          alt=""
          aria-hidden="true"
          width={1024}
          height={768}
           className="absolute bottom-0 left-1/2 h-[64%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom sm:left-[6%] sm:h-[76%] sm:translate-x-0 lg:left-[26%]"
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
