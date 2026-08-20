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
    <div className="relative -mt-8 w-full shrink-0 sm:-mt-12">
      <div className="relative h-[320px] w-full overflow-hidden sm:h-[min(46svh,360px)] lg:h-[min(52svh,420px)]">
        {/* distant skyline + hills */}
        <img
          src={heroSkyline}
          alt=""
          aria-hidden="true"
          width={1920}
          height={512}
          className="pointer-events-none absolute bottom-[52%] left-1/2 h-[46%] w-auto min-w-full max-w-none -translate-x-1/2 object-cover object-bottom opacity-60"
          style={{ transform: `translate3d(-50%, ${offset}px, 0)` }}
        />

        {/* soft haze so the skyline dissolves into the sky */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[56%] bg-gradient-to-b from-background via-background/40 to-transparent" />

        {/* the street itself: one continuous facade line */}
        <img
          src={heroBand}
          alt="Una via di Torino: portici, tram, parcheggio e ricarica elettrica"
          width={1920}
          height={720}
          className="absolute bottom-0 left-1/2 h-full w-auto min-w-full max-w-none -translate-x-1/2 object-cover object-bottom"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 8%, #000 26%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 8%, #000 26%)",
          }}
        />

        {/* chips pinned to the art */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* traffic light — sits over the signal, left-of-centre */}
          <div className="animate-float absolute left-[3%] top-[14%] sm:left-[8%] lg:left-[16%]">
            <div className="flex items-center gap-2 rounded-full bg-forest px-3 py-1.5 text-[0.7rem] font-extrabold text-gold shadow-float sm:px-3.5 sm:py-2 sm:text-xs">
              <Timer className="h-3.5 w-3.5" />
              {s.light}
            </div>
          </div>

          {/* parking — over the parked car / charger */}
          <div
            className="animate-float absolute bottom-[16%] left-[3%] w-[52%] max-w-[220px] sm:bottom-[20%] sm:left-[5%] lg:left-[9%]"
            style={{ animationDelay: "1.2s" }}
          >
            <SceneCard icon={<CircleParking className="h-4 w-4" />} title={s.parkTitle} body={s.parkBody} />
          </div>

          {/* connection — over the tram */}
          <div
            className="animate-float absolute right-[3%] top-[10%] w-[52%] max-w-[240px] sm:right-[6%] lg:right-[12%]"
            style={{ animationDelay: "2.1s" }}
          >
            <SceneCard icon={<Bus className="h-4 w-4" />} title={s.transitTitle} body={s.transitBody} />
          </div>

          <div className="absolute right-[8%] top-[46%] hidden lg:block">
            <SceneBadge tone="gold">{s.billboard}</SceneBadge>
          </div>
          <div className="absolute left-[36%] top-[40%] hidden lg:block">
            <SceneBadge tone="forest">{s.shelter}</SceneBadge>
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
