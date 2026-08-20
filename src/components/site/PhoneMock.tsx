import { Search, Navigation, Bus, Zap, TriangleAlert, Check, Car, Timer } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { TurinMap } from "./TurinMap";

export function Device({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[262px] shrink-0 rounded-[2.6rem] border border-forest-deep/40 bg-forest-deep p-2 shadow-device sm:w-[286px] ${className}`}
    >
      <div className="relative h-[560px] overflow-hidden rounded-[2.1rem] bg-forest-deep">
        {children}
      </div>
      <div className="pointer-events-none absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-forest-deep" />
    </div>
  );
}

function MapBed() {
  return (
    <TurinMap variant="night" className="animate-pan absolute inset-0 h-full w-full scale-[1.5]" />
  );
}

function StatusBar({ label }: { label: string }) {
  return (
    <div className="relative z-10 flex items-center justify-between px-5 pt-7 text-[0.65rem] font-bold text-white/60">
      <span>9:41</span>
      <span className="uppercase tracking-wider">{label}</span>
    </div>
  );
}

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-[1.75rem] bg-white p-4 pb-5 shadow-float">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-divider" />
      {children}
    </div>
  );
}

/* --------------------------------- parking -------------------------------- */

export function ParkingMock({ className = "" }: { className?: string }) {
  const { lang } = useI18n();
  const it = lang === "it";
  return (
    <Device className={className}>
      <MapBed />
      <StatusBar label={it ? "Parcheggio" : "Parking"} />

      <div className="relative z-10 mx-4 mt-3 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-chrome">
        <Search className="h-4 w-4 text-grass" />
        <span className="text-[0.8rem] font-bold text-ink">Via Po 12, Torino</span>
      </div>

      <div className="absolute left-6 top-40 z-10 rounded-2xl bg-gold px-3 py-2 text-[0.7rem] font-extrabold text-forest-deep shadow-float">
        {it ? "3 stalli liberi" : "3 free spots"}
        <span className="block text-[0.62rem] font-bold opacity-70">2 min · Via Vanchiglia</span>
      </div>

      <Sheet>
        <p className="text-[0.68rem] font-extrabold uppercase tracking-wider text-grass">
          {it ? "Vicino all'arrivo" : "Near your destination"}
        </p>
        <div className="mt-2.5 space-y-2">
          <div className="rounded-2xl border border-divider p-3">
            <div className="flex items-center justify-between">
              <p className="text-[0.82rem] font-extrabold text-ink">
                {it ? "Stallo su strada" : "Curbside spot"}
              </p>
              <span className="rounded-full bg-grass/12 px-2 py-0.5 text-[0.62rem] font-extrabold text-grass">
                {it ? "Alta prob." : "Likely"}
              </span>
            </div>
            <p className="mt-0.5 text-[0.72rem] font-semibold text-muted-foreground">
              Via Vanchiglia · 190 m · 1,50 €/h
            </p>
          </div>
          <div className="rounded-2xl border border-grass/30 bg-grass/5 p-3">
            <div className="flex items-center justify-between">
              <p className="text-[0.82rem] font-extrabold text-ink">Parking Roma</p>
              <span className="text-[0.72rem] font-extrabold text-grass">42 {it ? "liberi" : "free"}</span>
            </div>
            <p className="mt-0.5 text-[0.72rem] font-semibold text-muted-foreground">
              320 m · 2,00 €/h · h 2,10 m
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[0.7rem] font-extrabold text-grass">
              <Check className="h-3.5 w-3.5" />
              {it ? "La tua auto ci sta" : "Your car fits"}
            </p>
          </div>
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-grass py-3 text-[0.8rem] font-extrabold text-white">
          <Navigation className="h-4 w-4" />
          {it ? "Portami allo stallo" : "Take me there"}
        </button>
      </Sheet>
    </Device>
  );
}

/* --------------------------------- transit -------------------------------- */

export function TransitMock({ className = "" }: { className?: string }) {
  const { lang } = useI18n();
  const it = lang === "it";
  return (
    <Device className={className}>
      <MapBed />
      <StatusBar label={it ? "Mezzi" : "Transit"} />

      <div className="relative z-10 mx-4 mt-3 rounded-2xl bg-white/95 p-3 shadow-chrome backdrop-blur">
        <p className="text-[0.68rem] font-extrabold uppercase tracking-wider text-muted-foreground">
          {it ? "Verso" : "To"}
        </p>
        <p className="text-[0.9rem] font-extrabold text-ink">Porta Nuova</p>
      </div>

      <div className="absolute inset-x-4 top-32 z-10 flex items-center gap-2 rounded-2xl bg-coral px-3 py-2.5 text-white shadow-float">
        <TriangleAlert className="h-4 w-4 shrink-0" />
        <p className="text-[0.72rem] font-bold leading-tight">
          {it ? "Coincidenza a rischio: il 61 è in ritardo" : "Connection at risk: the 61 is late"}
        </p>
      </div>

      <Sheet>
        <div className="flex items-center justify-between">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-wider text-grass">
            {it ? "Nuovo percorso" : "New route"}
          </p>
          <span className="text-[0.7rem] font-extrabold text-ink">24 min</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {[
            { icon: Bus, line: "55", txt: it ? "Sali fra 2 min · corretto" : "Board in 2 min · corrected", ok: true },
            { icon: Bus, line: "M1", txt: it ? "Cambio a XVIII Dicembre" : "Change at XVIII Dicembre", ok: true },
          ].map(({ icon: Icon, line, txt, ok }) => (
            <div key={line} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-forest text-[0.7rem] font-extrabold text-white">
                {line}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.78rem] font-bold text-ink">{txt}</p>
              </div>
              <Icon className={`h-4 w-4 ${ok ? "text-grass" : "text-muted-foreground"}`} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 overflow-hidden">
          {["4 min", "11 min", "19 min"].map((t) => (
            <span
              key={t}
              className="rounded-full bg-cream px-3 py-1.5 text-[0.7rem] font-extrabold text-ink"
            >
              {t}
            </span>
          ))}
        </div>
      </Sheet>
    </Device>
  );
}

/* ---------------------------------- drive --------------------------------- */

export function DriveMock({ className = "" }: { className?: string }) {
  const { lang } = useI18n();
  const it = lang === "it";
  return (
    <Device className={className}>
      <MapBed />
      <StatusBar label={it ? "Guida" : "Driving"} />

      <div className="relative z-10 mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-chrome">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-grass text-white">
          <Navigation className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[0.9rem] font-extrabold text-ink">240 m</p>
          <p className="text-[0.72rem] font-semibold text-muted-foreground">Corso Regina Margherita</p>
        </div>
      </div>

      <div className="absolute left-1/2 top-44 z-10 flex -translate-x-1/2 flex-col items-center gap-1">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold bg-forest-deep/90 text-lg font-extrabold text-gold">
          12
        </div>
        <span className="rounded-full bg-forest-deep/90 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider text-white/80">
          {it ? "al verde" : "to green"}
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-28 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-float">
        <Zap className="h-4 w-4 text-gold" />
        <p className="text-[0.72rem] font-bold text-ink">
          {it ? "Ricarica 150 kW a 600 m · 4 libere" : "150 kW charger in 600 m · 4 free"}
        </p>
      </div>

      <Sheet>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[1.05rem] font-extrabold text-ink">14 min</p>
            <p className="text-[0.72rem] font-semibold text-muted-foreground">4,2 km · 9:41</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1.5 text-[0.68rem] font-extrabold text-ink">
              <Timer className="h-3.5 w-3.5 text-grass" />
              {it ? "Meno semafori" : "Fewer lights"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1.5 text-[0.68rem] font-extrabold text-ink">
              <Car className="h-3.5 w-3.5 text-grass" />
              P
            </span>
          </div>
        </div>
      </Sheet>
    </Device>
  );
}
