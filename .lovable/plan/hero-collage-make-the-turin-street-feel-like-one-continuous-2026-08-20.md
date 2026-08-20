# Hero collage: make the Turin street feel like one continuous scene

Right now the hero uses three separately generated illustrations (left porticoes, center car, right tram) pushed together. They have different scales, ground lines and lighting, so it reads as three cut-outs instead of one street — which is exactly what makes transitapp.com's hero work: a single continuous city band with one horizon, one shadow line, consistent character sizes and layered depth.

## What I'll build

1. **One panoramic street band.** Generate a single wide (1920x~700) vector illustration of a Turin street: porticoes and Mole-style skyline on the left, tram + shelter mid-right, parked car, EV charger and traffic light at the curb, people walking, all standing on one continuous sidewalk. Same flat-vector style, same palette (forest green, gold, cream, muted brick) as today.
2. **Depth layers.** A separate far-background layer (soft skyline silhouette + hills of Turin) that sits behind, plus the foreground band. Slight parallax on scroll so the collage feels alive rather than pasted.
3. **Welded to the bottom.** The band spans full-bleed edge to edge with no seams, anchored to the hero bottom, height-scaled and center-cropped on mobile (keeps the tram and car in frame) — same approach transitapp uses.
4. **Chips integrated into the scene.** Reposition the traffic-light countdown, parking card and connection card so each visually points at the thing it describes (light chip near the traffic light, parking card over the parked car, transit card near the tram shelter), with soft drop shadows so they float above the art.
5. **Consistent horizon and sky.** A single sky-to-cream gradient behind the whole hero so the art dissolves into the background instead of ending on a hard edge.

## Technical notes

- New assets in `src/assets/`: `hero-band.png` (wide foreground street) and `hero-skyline.png` (background layer), replacing the three `hero-street-*.png` files.
- `src/components/site/HeroScene.tsx` rewritten: two stacked absolute layers with `object-bottom`, `w-auto h-full min-w-full` for height-scaled cropping, plus chip anchors positioned in percentages of the band so they track the art at every breakpoint.
- Small scroll-parallax hook (translateY on the skyline layer only) — cheap, `transform`-based, disabled under `prefers-reduced-motion`.
- Verified with desktop and mobile screenshots that the collage is fully visible on first load, no seams and no floating cut-outs.
