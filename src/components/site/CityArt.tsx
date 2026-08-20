/**
 * Mid-page city artwork: a framed scene with floating product markers, plus a
 * cropped detail strip that brings the hero panorama back at a closer zoom.
 * Art scales by height and crops horizontally, like the hero stage.
 */
export function CityScene({
  src,
  alt,
  marks,
  tone = "light",
}: {
  src: string;
  alt: string;
  marks: readonly [string, string];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border ${
        dark ? "border-white/10 bg-white/5" : "border-divider bg-white"
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={720}
        className="block h-[220px] w-full object-cover object-bottom sm:h-[280px] lg:h-[340px]"
      />

      <span
        className={`animate-float absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.68rem] font-extrabold shadow-float sm:text-xs ${
          dark ? "bg-gold text-forest-deep" : "bg-forest text-gold"
        }`}
      >
        {marks[0]}
      </span>
      <span
        className={`animate-float absolute bottom-4 right-4 rounded-full px-3 py-1.5 text-[0.68rem] font-extrabold shadow-float sm:text-xs ${
          dark ? "bg-white text-forest-deep" : "bg-gold text-forest-deep"
        }`}
        style={{ animationDelay: "1.1s" }}
      >
        {marks[1]}
      </span>
    </div>
  );
}

/** A deep crop of the city panorama, used as a band behind a section header. */
export function CityDetail({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative h-[150px] w-full overflow-hidden sm:h-[210px] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1920}
        height={720}
        className="absolute bottom-0 left-1/2 h-[240%] w-auto min-w-full max-w-none -translate-x-1/2 object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gold-soft/70 via-transparent to-gold-soft/70" />
    </div>
  );
}
