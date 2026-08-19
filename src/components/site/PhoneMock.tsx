import { ArrowUpRight, CornerUpRight, Footprints, Bus, Clock, TriangleAlert } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { TurinMap } from "./TurinMap";

function Device({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[268px] shrink-0 rounded-[2.4rem] border border-white/10 bg-navy-deep p-2 shadow-device sm:w-[292px] ${className}`}
    >
      <div className="relative h-[580px] overflow-hidden rounded-[2rem] bg-navy">{children}</div>
      <div className="pointer-events-none absolute left-1/2 top-3.5 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-deep" />
    </div>
  );
}

function MapBed({ variant = "night" }: { variant?: "night" | "day" }) {
  return (
    <TurinMap variant={variant} className="absolute inset-0 h-full w-full scale-[1.6]" />
  );
}

export function DriveMock() {
  const { lang } = useI18n();
  return (
    <Device>
      <MapBed />
      <div className="absolute inset-x-3 top-3 rounded-2xl bg-navy-deep/95 p-3.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <CornerUpRight className="h-8 w-8 text-azure" strokeWidth={2.5} />
          <div>
            <p className="text-xl font-extrabold text-white">241 m</p>
            <p className="text-sm font-medium text-white/70">Via Po</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-coral/15 px-2.5 py-1.5">
          <TriangleAlert className="h-4 w-4 text-coral" />
          <span className="text-xs font-semibold text-coral">
            {lang === "it" ? "ZTL Centrale attiva" : "ZTL Centrale active"}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-3 top-[9.6rem] flex gap-2 overflow-hidden">
        <span className="rounded-full bg-azure px-3 py-1.5 text-xs font-bold text-white">
          {lang === "it" ? "Più veloce · 12 min" : "Fastest · 12 min"}
        </span>
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink">
          {lang === "it" ? "Meno semafori · 14" : "Fewer lights · 14"}
        </span>
      </div>

      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3.5 shadow-chrome">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-extrabold leading-none text-coral">12 min</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              1,7 km · {lang === "it" ? "arrivo 18:42" : "arrive 18:42"}
            </p>
          </div>
          <span className="rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink">
            {lang === "it" ? "Esci" : "Exit"}
          </span>
        </div>
      </div>
    </Device>
  );
}

export function TransitMock() {
  const { lang } = useI18n();
  return (
    <Device>
      <MapBed variant="day" />
      <div className="absolute inset-x-3 top-3 rounded-2xl bg-white p-3 shadow-chrome">
        <p className="text-xs font-semibold text-muted-foreground">
          Porta Nuova → Piazza Castello
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-ink">
          <Footprints className="h-4 w-4 text-teal" /> 4 min
          <span className="text-divider">›</span>
          <span className="rounded-md bg-ink px-1.5 py-0.5 text-white">61</span> 11 min
          <span className="text-divider">›</span>
          <Footprints className="h-4 w-4 text-teal" /> 3 min
        </div>
      </div>

      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-4 shadow-chrome">
        <div className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-azure" />
          <p className="text-sm font-extrabold text-ink">
            {lang === "it" ? "Linea 61 · verso Castello" : "Line 61 · to Castello"}
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          {["4", "12", "21"].map((m, i) => (
            <div
              key={m}
              className={`flex-1 rounded-xl border px-2 py-2.5 text-center ${
                i === 0 ? "border-azure bg-azure/10" : "border-divider bg-paper"
              }`}
            >
              <p className="text-lg font-extrabold leading-none text-ink">{m}</p>
              <p className="text-[0.65rem] font-semibold text-muted-foreground">min</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[0.7rem] font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {lang === "it"
            ? "Orari programmati · feed aggiornato 10s fa"
            : "Times are scheduled · feed updated 10s ago"}
        </p>
      </div>
    </Device>
  );
}

export function WalkMock() {
  const { lang } = useI18n();
  return (
    <Device>
      <MapBed variant="day" />
      <div className="absolute inset-x-3 top-3 rounded-2xl bg-white p-3.5 shadow-chrome">
        <div className="flex items-center gap-3">
          <ArrowUpRight className="h-7 w-7 text-teal" strokeWidth={2.6} />
          <div>
            <p className="text-lg font-extrabold text-ink">18 m</p>
            <p className="text-xs font-medium text-muted-foreground">
              {lang === "it" ? "Percorso pedonale" : "Footpath"}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-3 top-28">
        <span className="chip text-xs">
          <span className="h-2 w-2 rounded-full bg-teal" />
          {lang === "it" ? "Percorso più ombreggiato" : "Most shade"}
        </span>
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3.5 shadow-chrome">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-extrabold leading-none text-ink">9 min</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              700 m · {lang === "it" ? "a piedi" : "walking"}
            </p>
          </div>
          <span className="rounded-full bg-teal px-4 py-2 text-xs font-bold text-white">
            {lang === "it" ? "Esci" : "Exit"}
          </span>
        </div>
      </div>
    </Device>
  );
}

export function ExploreMock() {
  const { lang } = useI18n();
  return (
    <Device>
      <MapBed variant="day" />
      <div className="absolute inset-x-3 top-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-muted-foreground shadow-chrome">
        {lang === "it" ? "Cerca qui" : "Search here"}
      </div>
      <div className="absolute inset-x-0 top-[4.4rem] flex gap-2 overflow-x-auto px-3 no-scrollbar">
        {(lang === "it"
          ? ["Auto", "Mezzi", "A piedi", "Bici"]
          : ["Drive", "Transit", "Walk", "Bike"]
        ).map((m, i) => (
          <span
            key={m}
            className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-chrome ${
              i === 0 ? "bg-azure text-white" : "bg-white text-ink"
            }`}
          >
            {m}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3.5 shadow-chrome">
        <p className="text-sm font-extrabold text-ink">Piazza Vittorio Veneto</p>
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          {lang === "it" ? "12 stalli liberi · 240 m" : "12 free bays · 240 m"}
        </p>
      </div>
    </Device>
  );
}
