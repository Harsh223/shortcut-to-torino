# Shortcut landing — Transit-style story opening

## What the reference actually does (top of transitapp.com)

The first screen is a stage, not a hero block:

1. **Sky backdrop.** A soft blue-to-white sky gradient with faint clouds fills the whole viewport. No box, no card — the page starts as outdoors.
2. **Centered promise in two lines.** A huge, tight, heavy headline with one word in a contrasting accent colour ("a *car-free* life"), a two-line plain subline, then a single fat pill button. Nothing else competes.
3. **A city street built along the bottom edge.** Row houses on the left, row houses on the right, a subway train, a bike rider, a bus and a shelter — all cropped by the viewport bottom so the reader feels standing on the sidewalk. The middle is left empty so the headline breathes.
4. **Proof hidden inside the scene.** "40M+ downloads" is a billboard. "1000+ cities" is a bus shelter ad. Stats are props, never a stat bar.
5. **Real app UI floating in the street.** Countdown chips, a route mini-map, an arrival card with a hand tapping GO — the product appears as objects in the world instead of a screenshot on a slab.
6. **Then the story continues in big rounded colour blocks**: a green block ("All the buses, no fusses" + phone screens), a community block, a feedback block, a cities block. Each is one idea, one oversized headline, one paragraph, one visual.

The narrative arc: *promise → the city is chaos → we read it live → here's the app doing it → here's your city.*

## The Shortcut version of that story

Same structure, our product:

- **Act 1 — Hero stage.** Sky over Turin. Headline: "La scorciatoia per **attraversare Torino**" with the accent word in gold. Sub: one line. One pill CTA (waitlist) + small App Store / Play Store buttons that open the waitlist modal. Along the bottom edge: Turin street scene — a porticoed Torino facade left, a GTT tram and a bus right, a car nosing into a curbside spot centre-right, an EV charger, a traffic light, the Mole silhouette in the far background. Cropped by the viewport bottom.
- **Proof as props:** "Live in Torino" on a café awning, "Beta — 2.000 posti" on a parking sign, launch date on a billboard. No stat row.
- **Floating product objects:** a green "12s" traffic-light countdown chip, a parking card "Via Roma — 2 posti liberi, la tua auto ci sta", a transit card "Coincidenza a rischio → nuovo percorso". These animate in gently (float + fade), staggered.
- **Act 2 — deep green rounded block:** "Un'app sola per attraversare la città" with the three phone mocks we already have, laid out overlapping.
- **Act 3 — parking block (cream):** "Il parcheggio, trovato prima di arrivare" — street + garage illustration with live availability pins.
- **Act 4 — transit block (gold-tinted):** "Quando il bus salta, il piano cambia da solo."
- **Act 5 — Turin block:** map + "Nata a Torino" + link to the city page.

Everything below Act 5 (voice, more features, how, FAQ, CTA) stays but gets the same rounded-block rhythm and less text.

## Visuals

Generated vector-style illustrations, transparent PNG, flat editorial vector look (thick clean shapes, limited palette, no photorealism), so they sit on the sky without seams:

- `hero-street-left.png` — Turin portico block with awning, tree
- `hero-street-right.png` — GTT tram + bus + shelter
- `hero-street-center.png` — car parking at curb, EV charger, traffic light
- `parking-scene.png` — street + underground garage cutaway
- `transit-scene.png` — bus stop with a missed connection re-route

Layered absolutely in the hero with the existing `TurinMap` reduced to a faint sky-level grid. Motion: slow float on floating chips, gentle rise on load, all disabled under `prefers-reduced-motion`.

## Palette

Keep the Rolex-green + gold identity, but flip the hero from dark to bright the way Transit does: a pale sky wash (existing `--mist`/white with a soft blue tint) with forest-green headline text and gold accent word. Dark forest is reserved for Act 2 and the final CTA blocks, so the page alternates light → deep green → cream → gold → deep green.

## Mobile

Hero scene collapses to a single cropped street band under the CTA; side buildings hide, tram + car stay. Floating chips reduce to two. Headline drops to ~2.2rem. All blocks stack with the same rounded corners and generous padding.

## Technical notes

- Illustrations generated into `src/assets/` and imported as ES modules; no new dependencies.
- New `src/components/site/HeroScene.tsx` composes the layers and floating cards; `src/routes/index.tsx` is restructured around the five acts.
- `src/lib/copy.ts` gets trimmed IT/EN strings for the new act headlines (shorter, one idea each); unused keys removed.
- `src/styles.css` gains a `sky-wash` utility, a `block-round` section utility, and stagger float keyframes.
- Waitlist, cookie banner, footer/Civimatica link, and route heads stay as they are.
