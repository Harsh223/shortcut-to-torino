# Scroll reveals, mobile-proof hero scene, vector art for every act, new logo

## 1. Fix the hero scene (main issue)

Right now the street art sits in a fixed-height box under the text, so on mobile it floats mid-page and the pieces shrink to nothing. The reference builds the street as a **full-bleed band welded to the bottom of the hero section**, cropped by the section edge, at a fixed art height that never shrinks below a legible size.

Changes:
- Make the hero a single stage: the section gets bottom padding equal to the street band height; the scene becomes `absolute inset-x-0 bottom-0` inside the hero, so buildings, tram and car are always cut off by the section edge (feet on the ground, no gap).
- Art scales by height, not width: the band is ~190px tall on mobile, ~280px on tablet, ~380px on desktop, and each illustration uses `h-full w-auto object-bottom` anchored left/right so it crops horizontally instead of shrinking.
- Mobile composition per the reference: keep tram (right) + car/traffic light (left), hide the portico block, keep two floating chips only, move them above the roofline so they never overlap the art.
- Add a continuous ground line and a soft sidewalk strip so the whole scene reads as one street rather than three separate PNGs.

## 2. Scroll-triggered reveals

New `useReveal` hook (IntersectionObserver, once, ~15% threshold) plus a small `Reveal` wrapper component with a `delay` prop.

- Each act (green block, parking, transit, drive, voice, more, how, cities, FAQ, CTA) fades and rises in as it enters view.
- Inside blocks, children stagger: headline → paragraph → bullet list → visual, ~80ms apart.
- Cards in the pillar grid, "more" grid and "how" steps stagger by index.
- Hero content keeps its immediate load animation (no observer).
- Everything disabled under `prefers-reduced-motion`, and content is visible by default if JS/observer never fires (no blank sections).

## 3. Vector art overlays for the remaining sections

Generate new transparent-PNG illustrations in the same flat editorial vector style, and place each as an overlay/anchor in its act:

- `transit-scene.png` — bus shelter, GTT bus pulling away, a re-route arrow to a tram (act 4, gold block).
- `drive-scene.png` — night street, traffic light with countdown, EV charger, car (drive block, bottom-anchored inside the green section).
- `voice-scene.png` — dashboard/phone with a speech waveform (voice block).
- `city-scene.png` — Turin skyline strip with the Mole and porticoes (cities block, sits along the block's bottom edge).
- `cta-scene.png` — small street strip along the bottom of the final CTA block.

Each block also gets a small floating "prop" chip (like the hero) carrying real product copy from `copy.ts`, and the drive / cities / CTA scenes are bottom-cropped bands so the page keeps the same street-level rhythm.

## 4. Proper vector logo

Replace the current inline mark with a real designed SVG mark, drawn as code (crisp at all sizes, no PNG):

- Concept: a rounded-square tile in forest green containing a gold "shortcut" — a route that cuts the corner diagonally past a longer curved path, ending in a location pin/arrowhead.
- Deliverables: `ShortcutMark` (scalable, currentColor-aware), `Wordmark` with ink and light tones, a monochrome variant for the footer, plus a matching `public/favicon.svg` and an apple-touch icon size.

## Technical notes

- New files: `src/hooks/use-reveal.ts`, `src/components/site/Reveal.tsx`, new assets in `src/assets/`.
- Edits: `src/components/site/HeroScene.tsx` (bottom-welded band, height-based scaling), `src/routes/index.tsx` (wrap acts in `Reveal`, add scene overlays), `src/components/site/Logo.tsx`, `src/styles.css` (reveal keyframes + `street-band` utility), `src/lib/copy.ts` (a few new prop-chip strings, IT + EN), `public/favicon.svg`.
- No new dependencies; no backend or copy-structure changes beyond the added chip strings.
