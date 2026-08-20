/**
 * Mid-page artwork for each city page: a daytime access/parking scene and a
 * night driving scene, plus the floating markers pinned onto them.
 */
import torinoAccess from "@/assets/city-torino-access.png";
import torinoNight from "@/assets/city-torino-night.png";
import milanoAccess from "@/assets/city-milano-access.png";
import milanoNight from "@/assets/city-milano-night.png";
import romaAccess from "@/assets/city-roma-access.png";
import romaNight from "@/assets/city-roma-night.png";
import napoliAccess from "@/assets/city-napoli-access.png";
import napoliNight from "@/assets/city-napoli-night.png";
import bolognaAccess from "@/assets/city-bologna-access.png";
import bolognaNight from "@/assets/city-bologna-night.png";
import firenzeAccess from "@/assets/city-firenze-access.png";
import firenzeNight from "@/assets/city-firenze-night.png";
import genovaAccess from "@/assets/city-genova-access.png";
import genovaNight from "@/assets/city-genova-night.png";
import palermoAccess from "@/assets/city-palermo-access.png";
import palermoNight from "@/assets/city-palermo-night.png";
import bariAccess from "@/assets/city-bari-access.png";
import bariNight from "@/assets/city-bari-night.png";
import cataniaAccess from "@/assets/city-catania-access.png";
import cataniaNight from "@/assets/city-catania-night.png";
import veneziaAccess from "@/assets/city-venezia-access.png";
import veneziaNight from "@/assets/city-venezia-night.png";
import veronaAccess from "@/assets/city-verona-access.png";
import veronaNight from "@/assets/city-verona-night.png";
import messinaAccess from "@/assets/city-messina-access.png";
import messinaNight from "@/assets/city-messina-night.png";
import padovaAccess from "@/assets/city-padova-access.png";
import padovaNight from "@/assets/city-padova-night.png";

type Bi = { it: string; en: string };

export type CityArt = {
  access: string;
  night: string;
  accessAlt: Bi;
  nightAlt: Bi;
  /** two labels pinned on the daytime scene */
  accessMarks: { it: [string, string]; en: [string, string] };
  /** two labels pinned on the night scene */
  nightMarks: { it: [string, string]; en: [string, string] };
};

const green = { it: "Verde tra 12 s", en: "Green in 12 s" };
const bays = { it: "8 stalli liberi", en: "8 free bays" };

function art(
  access: string,
  night: string,
  accessAlt: Bi,
  nightAlt: Bi,
  accessSecond: Bi,
  nightSecond: Bi,
): CityArt {
  return {
    access,
    night,
    accessAlt,
    nightAlt,
    accessMarks: { it: [bays.it, accessSecond.it], en: [bays.en, accessSecond.en] },
    nightMarks: { it: [green.it, nightSecond.it], en: [green.en, nightSecond.en] },
  };
}

export const CITY_ART: Record<string, CityArt> = {
  torino: art(
    torinoAccess,
    torinoNight,
    {
      it: "Via porticata di Torino con stalli blu e ingresso di un parcheggio in struttura",
      en: "Arcaded Turin street with blue-line bays and a car park entrance",
    },
    {
      it: "Torino di notte: tram GTT, varco ZTL e colonnina di ricarica",
      en: "Turin at night: GTT tram, restricted-zone gate and an EV charger",
    },
    { it: "Garage a 4 min a piedi", en: "Garage 4 min on foot" },
    { it: "ZTL attiva alle 7:30", en: "Restricted zone opens 7:30" },
  ),
  milano: art(
    milanoAccess,
    milanoNight,
    {
      it: "Milano: silos di parcheggio a spirale e varco di accesso con telecamere",
      en: "Milan: spiral parking tower and a camera-controlled access gate",
    },
    {
      it: "Milano di notte: tram ATM, ingresso metro e auto in ricarica",
      en: "Milan at night: ATM tram, metro entrance and a charging car",
    },
    { it: "Silos: 3° piano libero", en: "Tower: level 3 free" },
    { it: "Area C attiva domani", en: "Area C active tomorrow" },
  ),
  roma: art(
    romaAccess,
    romaNight,
    {
      it: "Roma: sanpietrini, auto a filo del marciapiede e scooter in fila",
      en: "Rome: cobblestones, a car on the kerb and a row of scooters",
    },
    {
      it: "Roma di notte: bus fra i pini, cupole e colonnina di ricarica",
      en: "Rome at night: a bus among the pines, domes and an EV charger",
    },
    { it: "Sosta a strisce blu", en: "Blue-line paid parking" },
    { it: "ZTL Centro Storico", en: "Historic-centre ZTL" },
  ),
  napoli: art(
    napoliAccess,
    napoliNight,
    {
      it: "Napoli: vicolo con panni stesi, scooter e auto in doppia fila",
      en: "Naples: an alley with laundry lines, scooters and a double-parked car",
    },
    {
      it: "Napoli di notte: bus in salita, funicolare e Vesuvio sullo sfondo",
      en: "Naples at night: an uphill bus, the funicular and Vesuvius behind",
    },
    { it: "Vicolo troppo stretto", en: "Alley too narrow" },
    { it: "Funicolare aperta", en: "Funicular running" },
  ),
  bologna: art(
    bolognaAccess,
    bolognaNight,
    {
      it: "Bologna: portici in terracotta con auto in sosta e una bicicletta",
      en: "Bologna: terracotta porticoes with parked cars and a bicycle",
    },
    {
      it: "Bologna di notte: filobus sotto i portici e le due torri",
      en: "Bologna at night: a trolleybus under the porticoes and the two towers",
    },
    { it: "Sotto i portici", en: "Under the porticoes" },
    { it: "ZTL T-days", en: "T-days car-free zone" },
  ),
  firenze: art(
    firenzeAccess,
    firenzeNight,
    {
      it: "Firenze: strada stretta con auto in fila e la cupola sullo sfondo",
      en: "Florence: a narrow street lined with cars and the Duomo behind",
    },
    {
      it: "Firenze di notte: tramvia bianca, cupola e auto in ricarica",
      en: "Florence at night: the white tram, the dome and a charging car",
    },
    { it: "Varco ZTL a 80 m", en: "ZTL gate 80 m ahead" },
    { it: "Tramvia ogni 5 min", en: "Tram every 5 min" },
  ),
  genova: art(
    genovaAccess,
    genovaNight,
    {
      it: "Genova: case alte sul pendio, tornanti con auto in sosta e il porto",
      en: "Genoa: tall houses on the slope, hairpin parking and the port",
    },
    {
      it: "Genova di notte: bus sulla sopraelevata, gru del porto e Lanterna",
      en: "Genoa at night: a bus on the coastal road, port cranes and the lighthouse",
    },
    { it: "Ascensore pubblico", en: "Public lift nearby" },
    { it: "Pendenza 14%", en: "14% gradient" },
  ),
  palermo: art(
    palermoAccess,
    palermoNight,
    {
      it: "Palermo: viale barocco con palme e auto in doppia fila",
      en: "Palermo: a baroque avenue with palms and double-parked cars",
    },
    {
      it: "Palermo di notte: bus sul viale, cupola rossa e auto in ricarica",
      en: "Palermo at night: a bus on the avenue, the red dome and a charging car",
    },
    { it: "Doppia fila reale", en: "Real double parking" },
    { it: "ZTL notturna", en: "Night-time ZTL" },
  ),
  bari: art(
    bariAccess,
    bariNight,
    {
      it: "Bari: lungomare con auto in sosta, palme e la città vecchia",
      en: "Bari: the seafront with parked cars, palms and the old town",
    },
    {
      it: "Bari di notte: bus sul lungomare, traghetti e colonnina di ricarica",
      en: "Bari at night: a seafront bus, ferries and an EV charger",
    },
    { it: "Lungomare a pagamento", en: "Paid seafront bays" },
    { it: "Traghetti in porto", en: "Ferries in port" },
  ),
  catania: art(
    cataniaAccess,
    cataniaNight,
    {
      it: "Catania: viale in pietra lavica con auto in sosta e l'Etna sullo sfondo",
      en: "Catania: a lava-stone avenue with parked cars and Etna behind",
    },
    {
      it: "Catania di notte: metro e bus fra i palazzi barocchi, con l'Etna",
      en: "Catania at night: metro and bus among baroque facades, with Etna",
    },
    { it: "Sosta lungo il viale", en: "Kerb bays on the avenue" },
    { it: "Metro fino a mezzanotte", en: "Metro until midnight" },
  ),
  venezia: art(
    veneziaAccess,
    veneziaNight,
    {
      it: "Venezia: canale con pali di ormeggio, pontile del vaporetto e barca di consegne",
      en: "Venice: a canal with mooring poles, a vaporetto pontoon and a delivery boat",
    },
    {
      it: "Venezia di notte: vaporetto illuminato, gondole e campanile",
      en: "Venice at night: a lit vaporetto, gondolas and the bell tower",
    },
    { it: "Auto solo a Tronchetto", en: "Cars stop at Tronchetto" },
    { it: "Vaporetto fra 6 min", en: "Vaporetto in 6 min" },
  ),
  verona: art(
    veronaAccess,
    veronaNight,
    {
      it: "Verona: parcheggio fuori le mura con l'Arena romana sullo sfondo",
      en: "Verona: parking outside the walls with the Roman Arena behind",
    },
    {
      it: "Verona di notte: bus davanti all'Arena illuminata e auto in ricarica",
      en: "Verona at night: a bus by the lit Arena and a charging car",
    },
    { it: "Park & ride fuori mura", en: "Park & ride outside the walls" },
    { it: "Sere di spettacolo", en: "Opera-night traffic" },
  ),
  messina: art(
    messinaAccess,
    messinaNight,
    {
      it: "Messina: viale costiero con auto in sosta, palme e il traghetto sullo Stretto",
      en: "Messina: a coastal avenue with parked cars, palms and a strait ferry",
    },
    {
      it: "Messina di notte: tram sul lungomare, traghetti e campanile",
      en: "Messina at night: a tram on the waterfront, ferries and the bell tower",
    },
    { it: "Vicino all'imbarco", en: "Close to the ferry ramp" },
    { it: "Tram ogni 12 min", en: "Tram every 12 min" },
  ),
  padova: art(
    padovaAccess,
    padovaNight,
    {
      it: "Padova: portici, rastrelliere piene di biciclette e auto negli stalli",
      en: "Padua: porticoes, racks full of bicycles and cars in marked bays",
    },
    {
      it: "Padova di notte: tram su rotaia guidata, cupole del Santo e ciclisti",
      en: "Padua at night: the guided tram, the basilica domes and cyclists",
    },
    { it: "Bici + sosta insieme", en: "Bike and parking together" },
    { it: "Tram fino alle 21", en: "Tram until 21:00" },
  ),
};
