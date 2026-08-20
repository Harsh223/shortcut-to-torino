# Fourteen city storytelling pages

## What will be built

- Add a dedicated, shareable page for each major Italian city: **Roma, Milano, Napoli, Torino, Palermo, Genova, Bologna, Firenze, Bari, Catania, Venezia, Verona, Messina, and Padova**.
- Add a `/cities` overview that presents all fourteen destinations as an illustrated city directory rather than a generic status table.
- Replace the single “Città” navigation link with a polished desktop city menu listing all fourteen cities; the mobile menu will show the complete list in a compact, scroll-safe layout.
- Preserve `/turin` as a working public URL and direct it to the new Torino experience.

## Storytelling system

Every city page will use the same recognizable Shortcut rhythm while telling a different local story:

1. **City arrival** — city-specific headline, local mobility tension, and the unique panoramic vector visible immediately on load.
2. **The local reality** — a concise, honest snapshot of how movement in that city actually works.
3. **Parking or access** — locally relevant constraints such as ZTLs, historic centres, curbside scarcity, park-and-ride, or Venice’s water/land interchange.
4. **Public transport** — the actual local network vocabulary and connection problems, without claiming unavailable live integrations.
5. **Driving, charging, and walking** — city-specific road, EV, shade, hill, ferry, cycling, or pedestrian considerations.
6. **Future-city CTA** — a city-prefilled waitlist inviting residents to influence launch priority.

Italian remains primary and English remains fully available. Copy will be specific enough that a resident recognizes the city, while clearly describing future coverage rather than implying Shortcut is already live there.

## Visual direction and animation

- Reuse the existing Torino panorama and the thirteen newly created city panoramas; the image artwork itself will not be altered.
- Build a reusable city-stage component that scales art by height and crops horizontally on narrow screens, keeping landmarks legible and visible in the first viewport.
- Use full-width editorial acts, alternating light, cream, gold, and forest bands; avoid repeated nested-card layouts.
- Add restrained scroll reveals and staggered local fact markers with reduced-motion support.
- Add lightweight city-specific route lines, stop chips, parking indicators, and contextual labels around the panoramas so the pages feel like a living mobility map.
- Keep phone UI secondary and use only the clearest existing product views where they support the story.

## Technical details

- Create a typed central city registry containing slugs, bilingual narrative copy, local specialties, transport labels, launch status, and asset imports.
- Add `src/routes/cities.tsx` as the `/cities` layout, `src/routes/cities.index.tsx` for the directory, and `src/routes/cities.$slug.tsx` for the fourteen city pages.
- Use route-safe city validation and a proper not-found state for unknown slugs.
- Give the city index and every city detail page unique title, description, Open Graph, Twitter, and canonical metadata.
- Extend `WaitlistForm` with an optional initial city value so every local CTA is prefilled while preserving current forms.
- Update the header and relevant home-page links to use the city directory and typed TanStack navigation.
- Keep all existing product/backend behavior unchanged.

## Validation

- Verify all fourteen routes, the city menu, language switching, city-prefilled waitlist fields, legacy `/turin`, and unknown-city handling.
- Check first-viewport art, text wrapping, menu overflow, and reveal behavior at mobile and desktop sizes.
- Confirm each page has one H1, city-specific metadata, meaningful image alt text, and no visual overlap or clipped artwork.
