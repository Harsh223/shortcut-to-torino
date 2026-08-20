# Product and waitlist pages: full illustrated story

Rebuild `/features` (Prodotto) and `/download` (Lista d'attesa) with the same act-based storytelling as the city pages, but with a new, higher-quality batch of illustrations made specifically for these two pages.

## Art quality fix

The recent city scenes were generated on the fast image tier, which is where the detail dropped. Every new illustration here uses the premium tier with tighter prompts:

- Rich flat-vector editorial style with real depth: layered lighting, soft shadows, believable perspective, readable street furniture — not thin generic clipart.
- Every object must be identifiable at a glance: the parking sensor, the free bay, the garage level, the bus arriving, the countdown signal, the charging cable, the phone in a hand.
- Strict palette lock: forest green, gold, cream, terracotta, muted sky.
- No text, no fake logos, no garbled signage inside the art.
- Each image reviewed after generation and regenerated if the subject is unclear, deformed, or off-palette. Existing city art stays untouched.

New illustrations (8):

Product page — `feature-parking.png` (street bays plus garage cutaway, live availability), `feature-transit.png` (stop with an arriving bus and a protected connection), `feature-lights.png` (junction at dusk with signal countdown), `feature-ev.png` (charging bay with cable and car), `feature-voice.png` (driver's-eye view, hands on wheel, spoken guidance), `feature-hero.png` (wide panoramic product stage welded to the hero bottom).

Waitlist page — `waitlist-hero.png` (city at golden hour, people about to move), `waitlist-launch.png` (closing panoramic strip with the app arriving in the city).

## Product page story

1. **Hero stage** — headline, one-line promise, wide panorama welded to the bottom edge of the first screen with 2-3 floating product chips, visible on load without scrolling.
2. **The map that knows the street** — parking act: illustration plus the curbside/garage points.
3. **Transit that tells the truth** — arrivals and protected connections, alternating side, gold band.
4. **Green in 12 seconds** — traffic-light countdowns, dark forest band, night illustration.
5. **Charge without guessing** — EV act on cream.
6. **Hands on the wheel** — voice act, with the existing phone mock kept as a small secondary detail rather than the main visual.
7. **Closing CTA** — waitlist form plus a link into the city directory.

The current flat feature-card grid is folded into these acts as point lists, so nothing in the copy is lost.

## Waitlist page story

1. **Hero stage** — golden-hour panorama, headline, waitlist form directly in the first screen.
2. **What you get on day one** — three illustrated pucks (email at launch, city priority, no spam).
3. **How the launch works** — timeline act, city-by-city, honest about not being live outside Turin.
4. **Requirements and FAQ** — kept, restyled as calm editorial blocks instead of two bordered boxes.
5. **Closing strip** — panoramic art with store buttons.

## Motion and responsiveness

- Existing `Reveal` component for staggered scroll reveals on every act; floating chips reuse the current float animation; reduced-motion respected.
- Art scales by height and crops horizontally on phones, like the hero and city stages, so subjects stay large and legible instead of shrinking.
- Verified with screenshots at desktop and mobile widths: first-screen art visible without scrolling, no clipped subjects, no text overlap.

## Technical notes

- New assets in `src/assets/`, referenced through a small `src/lib/product-art.ts` registry with bilingual alt text.
- Reuse `CityStage` / `CityScene` / `CityDetail` for the frames (renamed usage only, no behavioural change), keeping one visual language across the site.
- Rewrite `src/routes/features.tsx` and `src/routes/download.tsx` around the acts; copy additions go in `src/lib/copy.ts` (Italian and English).
- No backend changes; the waitlist form keeps its current source tags.
