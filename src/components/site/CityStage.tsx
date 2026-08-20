/**
 * The city "stage": the panoramic vector welded to the bottom edge of a city
 * hero. Art scales by HEIGHT and crops horizontally, so landmarks stay legible
 * on phones instead of shrinking away. Chips float above the roofline.
 */
export function CityStage({
  src,
  alt,
  chips,
}: {
  src: string;
  alt: string;
  chips: string[];
}) {
  return (
    <div className="relative mt-auto w-full shrink-0">
      <div className="relative flex h-[240px] w-full justify-center overflow-hidden sm:h-[min(42svh,320px)] lg:h-[min(48svh,380px)]">
        <img
          src={src}
          alt={alt}
          width={1920}
          height={720}
          className="relative block h-full w-auto min-w-full max-w-none shrink-0 self-end object-cover object-bottom"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 9%, #000 22%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 9%, #000 22%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-20">
          {chips.slice(0, 3).map((chip, i) => (
            <span
              key={chip}
              className={`animate-float absolute rounded-full px-3 py-1.5 text-[0.68rem] font-extrabold shadow-float sm:px-3.5 sm:py-2 sm:text-xs ${
                i === 1 ? "bg-gold text-forest-deep" : "bg-forest text-gold"
              } ${
                i === 0
                  ? "left-[4%] top-[8%] sm:left-[7%] sm:top-[16%]"
                  : i === 1
                    ? "right-[4%] top-[22%] sm:right-[9%] sm:top-[30%]"
                    : "left-[8%] top-[40%] hidden sm:inline-flex lg:left-[16%]"
              }`}
              style={{ animationDelay: `${i * 1.1}s` }}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-forest/15" />
      </div>
    </div>
  );
}

/** A thin panoramic strip used to close a section, cropped at the bottom. */
export function CityStrip({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative h-[110px] w-full overflow-hidden sm:h-[160px] ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={720}
        className="absolute bottom-0 left-1/2 h-[190%] w-auto min-w-full max-w-none -translate-x-1/2 object-cover object-bottom opacity-95"
      />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}
