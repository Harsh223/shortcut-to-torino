import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ParkingMock, TransitMock, DriveMock } from "@/components/site/PhoneMock";
import featureTransit from "@/assets/feature-transit.png";
import featureParking from "@/assets/feature-parking.png";
import featureVoice from "@/assets/feature-voice.png";

/**
 * The deep-green tabbed showcase: chip tabs, one story at a time, a phone
 * mock on the right with vehicle props peeking out from behind its edges.
 */
export function ModeShowcase() {
  const { c } = useI18n();
  const [active, setActive] = useState(0);

  const modes = [
    { title: c.parking.title, body: c.parking.body, Mock: ParkingMock },
    { title: c.transit.title, body: c.transit.body, Mock: TransitMock },
    { title: c.drive.title, body: c.drive.body, Mock: DriveMock },
    { title: c.voice.title, body: c.voice.sub, Mock: DriveMock },
  ];
  const mode = modes[active]!;
  const Mock = mode.Mock;

  return (
    <div>
      {/* tabs */}
      <div
        role="tablist"
        aria-label={c.pillars.title}
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {c.pillars.tabs.map((tab, i) => (
          <button
            key={tab}
            role="tab"
            type="button"
            id={`mode-tab-${i}`}
            aria-selected={i === active}
            aria-controls="mode-panel"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-extrabold transition-all sm:px-5 ${
              i === active
                ? "bg-white text-forest-deep shadow-float"
                : "bg-white/10 text-white/85 hover:bg-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[0.95fr_1.05fr]">
        {/* story */}
        <div
          key={active}
          id="mode-panel"
          role="tabpanel"
          aria-labelledby={`mode-tab-${active}`}
          className="animate-fade-in motion-reduce:animate-none"
        >
          <h2 className="max-w-md text-3xl font-extrabold leading-[1.06] sm:text-4xl lg:text-[3rem]">
            {mode.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            {mode.body}
          </p>

          <button
            type="button"
            onClick={() => setActive((a) => (a + 1) % modes.length)}
            className="group mt-8 inline-flex items-center gap-3 text-sm font-extrabold text-white"
          >
            <span className="flex size-11 items-center justify-center rounded-full border-2 border-white/60 transition-all group-hover:border-white group-hover:bg-white group-hover:text-forest-deep">
              <ArrowRight className="size-5" />
            </span>
            {c.pillars.next}
          </button>
        </div>

        {/* phone + props */}
        <div className="relative flex justify-center">
          <Prop
            src={featureTransit}
            className="left-0 top-6 -rotate-6 sm:left-4 lg:left-0"
            delay="0s"
          />
          <Prop
            src={featureParking}
            className="bottom-4 right-0 rotate-6 sm:right-4 lg:right-2"
            delay="1.2s"
          />
          <Prop
            src={featureVoice}
            className="-bottom-2 left-2 hidden -rotate-3 lg:block"
            delay="0.6s"
          />

          <div
            key={active}
            className="animate-scale-in relative z-10 origin-bottom scale-[0.82] motion-reduce:animate-none sm:scale-90 lg:scale-100"
          >
            <Mock />
          </div>
        </div>
      </div>
    </div>
  );
}

function Prop({ src, className, delay }: { src: string; className: string; delay: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ animationDelay: delay }}
      className={`animate-float pointer-events-none absolute z-0 h-20 w-28 overflow-hidden rounded-2xl border border-white/15 shadow-float sm:h-24 sm:w-36 ${className}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        width={320}
        height={200}
        className="h-full w-full scale-[1.8] object-cover object-bottom"
      />
    </div>
  );
}
