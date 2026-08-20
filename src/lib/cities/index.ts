import { citiesA } from "./data-a";
import { citiesB } from "./data-b";
import type { City, CityCopy } from "./types";

export type { City, CityCopy, CityAct } from "./types";

const all = [...citiesA, ...citiesB];

/** Ordered the way Italians rank them: population first. */
const ORDER = [
  "roma",
  "milano",
  "napoli",
  "torino",
  "palermo",
  "genova",
  "bologna",
  "firenze",
  "bari",
  "catania",
  "venezia",
  "verona",
  "messina",
  "padova",
];

export const CITIES: City[] = ORDER.map((slug) => all.find((c) => c.slug === slug)!).filter(Boolean);

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function cityCopy(city: City, lang: "it" | "en"): CityCopy {
  return lang === "en" ? city.en : city.it;
}

/** Shared chrome strings for the city directory and city pages. */
export const cityUi = {
  it: {
    menuTitle: "Le città",
    menuSub: "Una pagina per ognuna delle 14 città più grandi d'Italia.",
    allCities: "Tutte le città",
    directoryTitle: "Quattordici città, una alla volta",
    directorySub:
      "Ogni città ha regole, mezzi e problemi diversi. Costruiamo Shortcut città per città, con i dati di ognuna.",
    directoryBody:
      "Partiamo da Torino. Le altre pagine raccontano come funzionerà Shortcut in quella città quando arriveremo: cosa cambia nella sosta, nei mezzi, nella guida.",
    open: "Apri la pagina",
    back: "Tutte le città",
    localData: "Dati locali",
    operator: "Operatore",
    region: "Regione",
    nextCity: "Città successiva",
    waitlistTitle: "Vuoi Shortcut qui?",
    waitlistBody:
      "Lascia la tua email: le richieste per città decidono l'ordine con cui apriamo.",
    honest:
      "Nota onesta: fuori Torino non siamo ancora live. Queste pagine descrivono come lavoreremo in ogni città, non un servizio già attivo.",
  },
  en: {
    menuTitle: "Cities",
    menuSub: "One page for each of Italy's 14 largest cities.",
    allCities: "All cities",
    directoryTitle: "Fourteen cities, one at a time",
    directorySub:
      "Every city has different rules, transit and problems. We build Shortcut city by city, with each city's own data.",
    directoryBody:
      "We start in Turin. The other pages describe how Shortcut will work in that city when we get there: what changes for parking, transit and driving.",
    open: "Open the page",
    back: "All cities",
    localData: "Local data",
    operator: "Operator",
    region: "Region",
    nextCity: "Next city",
    waitlistTitle: "Want Shortcut here?",
    waitlistBody: "Leave your email: requests per city decide the order we open in.",
    honest:
      "Honest note: outside Turin we are not live yet. These pages describe how we will work in each city, not a service already running.",
  },
} as const;
