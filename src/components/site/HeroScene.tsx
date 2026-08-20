import { useEffect, useRef, useState } from "react";
import { CircleParking, Bus, Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import heroBand from "@/assets/hero-band.png";
import heroSkyline from "@/assets/hero-skyline.png";

/**
 * The hero "stage": one continuous Turin street welded to the bottom edge of
 * the hero. Two layers (distant skyline + foreground street band) are scaled
 * by HEIGHT and cropped horizontally so nothing ever shrinks to nothing on
 * small screens. Chips are anchored in percentages of the band so they keep
 * pointing at the right piece of art at every breakpoint.
 */
export function HeroScene() {
  const { c } = useI18n();
  const s = c.scene;
  const offset = useParallax();

  return (
    <div className="relative -mt-6 w-full shrink-0 sm:-mt-10">
      <div className="relative flex w-full justify-center overflow-hidden">
        {/* distant skyline + hills */}
        <img
          src={heroSkyline}
          alt=""
          aria-hidden="true"
          width={1920}
          height={512}
          className="pointer-events-none absolute bottom-[38%] left-1/2 h-[40%] w-auto min-w-full max-w-none -translate-x-1/2 object-cover object-bottom opacity-50"
          style={{ transform: `translate3d(-50%, ${offset}px, 0)` }}
        />

        {/* soft haze so the skyline dissolves into the sky */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-background via-background/40 to-transparent" />

        {/* the street itself: one continuous facade line.
            Mobile scales by height and crops the sides; from sm up the whole
            band fits the width so no rooftop is ever sliced off. */}
        <img
          src={heroBand}
          alt="Una via di Torino: portici, tram, parcheggio e ricarica elettrica"
          width={1920}
          height={720}
          className="relative block h-[240px] w-auto min-w-full max-w-none shrink-0 object-contain object-bottom sm:h-auto sm:w-full sm:min-w-0"
        />

        {/* chips pinned to the art */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* traffic light — over the signal, left of centre */}
          <div className="animate-float absolute left-[4%] top-[42%] sm:left-[8%] sm:top-[46%] lg:left-[15%]">
            <div className="flex items-center gap-2 rounded-full bg-forest px-3 py-1.5 text-[0.7rem] font-extrabold text-gold shadow-float sm:px-3.5 sm:py-2 sm:text-xs">
              <Timer className="h-3.5 w-3.5" />
              {s.light}
            </div>
          </div>

          {/* parking — over the parked car / charger */}
          <div
            className="animate-float absolute bottom-[8%] left-[4%] w-[58%] max-w-[210px] sm:bottom-[14%] sm:left-[6%] lg:left-[8%]"
            style={{ animationDelay: "1.2s" }}
          >
            <SceneCard icon={<CircleParking className="h-4 w-4" />} title={s.parkTitle} body={s.parkBody} />
          </div>

          {/* connection — over the tram */}
          <div
            className="animate-float absolute right-[4%] top-[34%] w-[58%] max-w-[230px] sm:right-[6%] sm:top-[40%] lg:right-[10%]"
            style={{ animationDelay: "2.1s" }}
          >
            <SceneCard icon={<Bus className="h-4 w-4" />} title={s.transitTitle} body={s.transitBody} />
          </div>
        </div>

        {/* the sidewalk line the whole scene stands on */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-forest/15" />
      </div>
    </div>
  );
}



/** cheap transform-only parallax for the distant layer */
function useParallax() {
  const [offset, setOffset] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY * 0.08, 40));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return offset;
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
