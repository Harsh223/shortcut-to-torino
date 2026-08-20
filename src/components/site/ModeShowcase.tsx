import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ParkingMock, TransitMock, DriveMock } from "@/components/site/PhoneMock";

/**
 * The deep-green tabbed showcase: chip tabs, one story at a time and a single
 * phone mock on the right, styled after the Transit-app second section.
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
        className="-mx-6 flex gap-2.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            className={`shrink-0 rounded-full px-5 py-2.5 text-[0.95rem] font-bold tracking-tight transition-colors sm:px-6 sm:py-3 ${
              i === active
                ? "bg-white text-forest-deep"
                : "bg-white/12 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-8 sm:gap-12 lg:mt-14 lg:grid-cols-[1fr_0.85fr] lg:gap-8">
        {/* story */}
        <div
          key={active}
          id="mode-panel"
          role="tabpanel"
          aria-labelledby={`mode-tab-${active}`}
          className="animate-fade-in motion-reduce:animate-none"
        >
          <h2 className="max-w-[13ch] text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]">
            {mode.title}
          </h2>
          <p className="mt-6 max-w-[46ch] text-base leading-[1.65] text-white/75 sm:text-lg">
            {mode.body}
          </p>

          <button
            type="button"
            onClick={() => setActive((a) => (a + 1) % modes.length)}
            className="group mt-10 inline-flex items-center gap-3.5 text-[0.95rem] font-bold text-white"
          >
            <span className="flex size-12 items-center justify-center rounded-full border-[1.5px] border-white/50 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-forest-deep">
              <ArrowRight className="size-5" />
            </span>
            {c.pillars.next}
          </button>
        </div>

        {/* phone */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-72 -translate-y-1/2 rounded-full bg-white/8 blur-3xl"
          />
          <div
            key={active}
            className="animate-scale-in relative z-10 origin-center scale-[0.82] motion-reduce:animate-none sm:scale-90 lg:scale-100"
          >
            <Mock />
          </div>
        </div>
      </div>
    </div>
  );
}
