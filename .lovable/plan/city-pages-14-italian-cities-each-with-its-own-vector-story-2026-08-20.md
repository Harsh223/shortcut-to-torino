# City pages: 14 Italian cities, each with its own vector story

A dedicated, illustrated page for each of Italy's 14 biggest cities, built one at a time, all sharing the same visual language as the home page (flat editorial vectors, forest/gold palette, scroll reveals, floating product chips).

## Navigation

The header "Cities" link becomes a full cities menu instead of a single link to Turin:
- Desktop: a dropdown panel listing all 14 cities in a grid, each with its status chip (Live / Next / Planned).
- Mobile: the same list inside the existing burger menu, grouped and scrollable.
- `/cities` becomes an index page: a map-flavoured grid of all 14 city cards, ordered by launch status.
- `/turin` keeps working (redirect-friendly alias to `/citta/torino` route id) so no existing link breaks.

Cities (population/size order): Roma, Milano, Napoli, Torino, Palermo, Genova, Bologna, Firenze, Bari, Catania, Venezia, Verona, Messina, Padova.

## Page structure (same skeleton for every city, different content and art)

Each city page tells the same five-act story the home page tells, but through that city's own streets:

1. **Hero stage** — city-specific panoramic street band welded to the bottom of the first screen, exactly like the home hero: skyline layer with parallax, foreground band, 2-3 floating chips carrying that city's real pain point (e.g. Roma: ZTL Centro Storico; Milano: Area C; Napoli: parcheggio in doppia fila).
2. **Why this city** — the local traffic truth, told in one short opinionated paragraph plus three stat pucks (residents, cars per 1000, average parking hunt minutes).
3. **Parking here** — city-specific illustration (Milano garage tower, Napoli vicoli, Roma sanpietrini) plus how on-street vs garage availability works locally.
4. **Transit here** — named local operator and network (ATM, ATAC, ANM, GTT, AMAT…) with the connection re-route story and an honest note on data quality.
5. **Drive / EV / lights** — night street scene with the city's ZTL or congestion scheme, chargers, light countdowns where signals support it.
6. **Local closing** — landmark silhouette strip along the bottom, launch status, waitlist form pre-filled with that city.

All acts wrapped in the existing `Reveal` component with staggered delays; hero art visible immediately on load, no scroll needed.

## Art per city

Three new transparent PNG illustrations per city, in the exact style of `hero-band.png`:
- `{city}-band.png` — panoramic street with that city's unmistakable architecture and transport (Milano tram 1928 + Duomo spires, Roma sanpietrini + umbrella pines + a 60s facade, Napoli vicoli with laundry lines + Vesuvio, Bologna porticoes in terracotta, Venezia vaporetto instead of a car, and so on).
- `{city}-skyline.png` — muted landmark silhouette layer for the parallax.
- `{city}-scene.png` — one mid-page scene reused across the parking/drive acts.

Someone from the city should recognise it in a second; nobody should need a caption.

## Copy

Italian first, English second, both in `src/lib/copy.ts` under a `cities` map keyed by slug. Each city gets its own written story — local operator names, local schemes, local complaints — not a template with the name swapped. Tone stays helpful, local, slightly opinionated.

## Rollout

One city per turn, in this order: Torino (rebuild of the current page as the template), Roma, Milano, Napoli, Bologna, then the rest. Each turn delivers finished art + copy + page, reviewed before moving on.

## Technical notes

- New: `src/routes/cities.index.tsx`, `src/routes/cities.$slug.tsx` (single dynamic route, content driven by a `CITIES` registry), `src/components/site/CityScene.tsx` (generalised `HeroScene` taking band/skyline props), `src/components/site/CityMenu.tsx`.
- `src/lib/cities.ts` holds slug, display name, status, asset imports and chip config; unknown slug throws `notFound()`.
- Edits: `Header.tsx` (cities menu), `Footer.tsx` (city links), `copy.ts` (per-city dictionaries), `turin.tsx` (redirect to the new route).
- Every city page defines its own `head()` with unique title, description, og:title/description, og:type, twitter:card, and canonical.
- No new dependencies, no backend changes beyond reusing the existing waitlist table with the city field.
