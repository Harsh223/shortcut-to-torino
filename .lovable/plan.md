# Mid-page city vectors: keep the story going down the page

Right now each city page opens with its own panorama and then turns into text and cards. The middle acts get their own city art so the story keeps flowing as the user scrolls.

## What gets added

Two new illustrations per city, 28 in total, in the exact same flat editorial style and palette as the existing panoramas (forest green, gold, terracotta, cream, no text in the art):

1. **Access / parking scene** — the city's real parking situation: Milano garage tower and Area C gate, Roma sanpietrini with a car half on the kerb, Napoli vicoli with double-parked scooters, Venezia a boat mooring instead of a parking bay, Bologna cars under porticoes, and so on.
2. **Drive / transit night scene** — the same street after dark: local tram, metro or bus in the correct local livery, restricted-zone signage, an EV charger, a traffic light with a countdown.

Every scene must be recognisable to a resident without a caption.

## How they appear on the page

- **Act 3 (access)** — the parking scene fills the visual half of the section, framed as a rounded card that bleeds toward the page edge, with two small floating markers pinned onto it (e.g. free kerb bays, garage level) so it reads as live product, not stock art.
- **Act 4 (transit)** — the existing panorama returns as a narrow, deeply cropped detail strip behind the section header, so the same street reappears at a different zoom.
- **Act 5 (drive/EV)** — the night scene sits inside the dark forest block, with a gold traffic-light countdown marker and a charging marker.
- Every scene fades and lifts in through the existing `Reveal` component, staggered against the text beside it, and holds still for reduced-motion users.
- The point lists stay, but move under or beside the art rather than owning the whole column, so text and image alternate as you scroll.

## Consistency and performance

- All mid-page art is lazy-loaded, has real per-city alt text in both languages, and fixed intrinsic dimensions so nothing shifts as it loads.
- Art scales by height and crops horizontally on phones, exactly like the hero panorama, so landmarks never shrink into mush.

## Technical notes

- New: `src/components/site/CityArt.tsx` — a scene frame component (rounded, masked edges, optional floating markers, light and dark tones) plus a detail-crop strip variant.
- Edit: `src/lib/cities/types.ts` — add `access` and `night` image fields plus bilingual alt text and per-scene marker labels to the `City` type.
- Edit: `src/lib/cities/data-a.ts` and `data-b.ts` — import the 28 new assets and add markers/alt for all 14 cities.
- Edit: `src/routes/cities.$slug.tsx` — replace the uniform three-act layout with the art-driven layout above.
- Assets: `src/assets/city-<slug>-access.png` and `src/assets/city-<slug>-night.png`.
- No backend, routing or copy-tone changes; existing headers, hero panoramas and waitlist behaviour stay as they are.

## Rollout

All 14 cities in one pass, generated in batches, then verified at mobile and desktop widths on several cities.
