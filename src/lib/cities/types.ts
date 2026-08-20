export type CityAct = {
  kicker: string;
  title: string;
  body: string;
  points: string[];
};

export type CityCopy = {
  /** short line under the city name in menus and cards */
  blurb: string;
  status: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  /** floating labels pinned onto the panorama */
  chips: string[];
  reality: { kicker: string; title: string; body: string };
  facts: { value: string; label: string }[];
  access: CityAct;
  transit: CityAct;
  drive: CityAct;
  closing: { title: string; body: string };
};

export type City = {
  slug: string;
  name: string;
  region: string;
  /** the local transport operator, shown as a data-source chip */
  operator: string;
  band: string;
  alt: { it: string; en: string };
  it: CityCopy;
  en: CityCopy;
};
