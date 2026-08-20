import featureHero from "@/assets/feature-hero.png";
import featureParking from "@/assets/feature-parking.png";
import featureTransit from "@/assets/feature-transit.png";
import featureLights from "@/assets/feature-lights.png";
import featureEv from "@/assets/feature-ev.png";
import featureVoice from "@/assets/feature-voice.png";
import waitlistHero from "@/assets/waitlist-hero.png";
import waitlistLaunch from "@/assets/waitlist-launch.png";

type Alt = { it: string; en: string };

export const productArt = {
  hero: {
    src: featureHero,
    alt: {
      it: "Illustrazione panoramica di un viale italiano con parcheggi, tram e colonnine di ricarica",
      en: "Panoramic illustration of an Italian avenue with parking, trams and EV chargers",
    } satisfies Alt,
  },
  parking: {
    src: featureParking,
    alt: {
      it: "Illustrazione di stalli su strada e di un parcheggio in struttura visto in sezione",
      en: "Illustration of curbside parking spaces and a garage seen in cutaway",
    } satisfies Alt,
  },
  transit: {
    src: featureTransit,
    alt: {
      it: "Illustrazione di un nodo di interscambio con tram e autobus alla fermata",
      en: "Illustration of a transit interchange with a tram and a bus at the stop",
    } satisfies Alt,
  },
  lights: {
    src: featureLights,
    alt: {
      it: "Illustrazione di un incrocio al tramonto con semaforo e conto alla rovescia",
      en: "Illustration of a junction at dusk with a traffic light countdown",
    } satisfies Alt,
  },
  ev: {
    src: featureEv,
    alt: {
      it: "Illustrazione di una piazzola di ricarica elettrica nella luce dorata",
      en: "Illustration of an EV charging bay in golden light",
    } satisfies Alt,
  },
  voice: {
    src: featureVoice,
    alt: {
      it: "Illustrazione dal posto di guida con il telefono che guida a voce",
      en: "Illustration from the driver's seat with the phone giving voice guidance",
    } satisfies Alt,
  },
} as const;

export const waitlistArt = {
  hero: {
    src: waitlistHero,
    alt: {
      it: "Illustrazione panoramica di una piazza italiana all'ora dorata con persone che partono",
      en: "Panoramic illustration of an Italian square at golden hour with people setting off",
    } satisfies Alt,
  },
  launch: {
    src: waitlistLaunch,
    alt: {
      it: "Illustrazione panoramica della città all'ora blu con un tram lungo il viale",
      en: "Panoramic illustration of the city at blue hour with a tram along the avenue",
    } satisfies Alt,
  },
} as const;
